import Auction from '../../sequelizer/models/Auction';
import Bidder from '../../sequelizer/models/Bidder';
import Bid from '../../sequelizer/models/Bid';
import { Repository } from 'sequelize-typescript';
import AObservable from '../../abstracts/AObservable';
import sequelize from '../../sequelizer/mySequelize';
import RefundService from './../Bidder/RefundService';
import ReserveService from './../Bidder/ReserveService';


export default class PlaceBidService extends AObservable<Bid>{

  private auctionRepository: Repository<Auction>;
  private bidderRepository: Repository<Bidder>;
  private bidRepository: Repository<Bid>;
  private refundService: RefundService;
  private reserveService: ReserveService;

  constructor(
    auctionRepository: Repository<Auction>,
    bidRepository: Repository<Bid>,
    bidderRepository: Repository<Bidder>,
    refundService: RefundService,
    reserveService: ReserveService,
  ) {
    super();
    this.auctionRepository = auctionRepository;
    this.bidRepository = bidRepository;
    this.bidderRepository = bidderRepository;
    this.refundService = refundService;
    this.reserveService = reserveService;
  }

  async perform(auctionId: number, bidderId: number, bidAmount: number, memo: string): Promise<Bid> {
    try {
      // Retrieve the auction, bidder, and highest bid
      const auction = await this.auctionRepository.findByPk(auctionId);
      if (!auction) {
        throw new Error('Auction not found.');
      }
      const bidder = await this.bidderRepository.findByPk(bidderId);
      if (!bidder) {
        throw new Error('Bidder not found.');
      }

      const highestBid = await this.getHighestBid(auctionId);

      // Check if bid amount is higher than the current highest bid
      if (!highestBid && bidAmount <= auction.reserve_price) {
        throw new Error('Bid amount is not higher than the auction initial price.');
      }

      // Check if bid amount is higher than the current highest bid
      if (highestBid && bidAmount <= highestBid.bid_amount) {
        throw new Error('Bid amount is not higher than the current highest bid.');
      }

      // Not allow current highest bidder to perform new bidding
      // if (highestBid && highestBid.bidder_id === bidderId) {
      //   throw new Error('Current highest bidder cannot bid.');
      // }

      // Check if the auction is expired
      if (auction.end_time <= new Date()) {
        throw new Error('Auction has expired. Bidding is not allowed.');
      }

      // Check if bidder has enough deposit
      if (bidAmount > bidder.deposit) {
        throw new Error('Bidder does not have enough deposit.');
      }

      // Check waiting time
      await this.checkWaitingTime(bidderId, auctionId);

      // Begin transaction
      const transaction = await sequelize.transaction();
      try {
        // Refund previous failed bid
        if (highestBid) {
          const failedBidder = await this.bidderRepository.findByPk(highestBid.bidder_id);
          if (failedBidder) {
            await this.refundService.perform(failedBidder, highestBid.bid_amount, transaction);
          }
        }

        // Create a new bid
        const bid = await this.bidRepository.create({
           auction_id: auctionId,
           bidder_id: bidderId,
           bid_amount: bidAmount,
           memo
          }, { transaction });
        await this.notifyObservers(bid);

        // Deduct bid amount from bidder's deposit
        await this.reserveService.perform(bidder, bidAmount, transaction);

        // Commit transaction
        await transaction.commit();
        // notify on neccessary
        return bid;
      } catch (error) {
        // Rollback transaction in case of any error
        await transaction.rollback();
        throw error;
      }
    } catch (error: any) {
      console.log('error', error);
      throw new Error(error.message);
    }
  }

  private async getHighestBid(auctionId: number): Promise<Bid | null> {
    return this.bidRepository.findOne({
      where: { auction_id: auctionId },
      order: [['bid_amount', 'DESC']],
    });
  }

  private async checkWaitingTime(bidderId: number, auctionId: number): Promise<void> {
    const waitingDurationSeconds = 5; // The waiting duration in seconds
    const waitingDurationMilliseconds = waitingDurationSeconds * 1000;
    const currentTime = new Date();
    const lastBid = await this.bidRepository.findOne({
      where: { bidder_id: bidderId, auction_id: auctionId },
      order: [['createdAt', 'DESC']],
    });

    if (lastBid && lastBid.createdAt && currentTime.getTime() - lastBid.createdAt.getTime() < waitingDurationMilliseconds) {
      throw new Error(`Bidder needs to wait ${waitingDurationSeconds} seconds before bidding again.`);
    }
  }
}
