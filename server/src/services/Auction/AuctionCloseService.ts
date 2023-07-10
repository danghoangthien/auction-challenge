import Auction from '../../sequelizer/models/Auction';
import Bid from '../../sequelizer/models/Bid';
import { Repository } from 'sequelize-typescript';
import AObservable from '../../abstracts/AObservable';


export default class AuctionCloseService extends AObservable<Auction>{

  private auctionRepository: Repository<Auction>;
  private bidRepository: Repository<Bid>;

  constructor(auctionRepository: Repository<Auction>, bidRepository: Repository<Bid>) {
    super();
    this.auctionRepository = auctionRepository;
    this.bidRepository = bidRepository;
  }

  async perform(auctionId: number): Promise<Auction> {
    try {
      // Retrieve the auction
      console.log('[AuctionCloseService]', 'perform');
      const auction = await this.auctionRepository.findByPk(auctionId);
      if (!auction) {
        throw new Error('Auction not found.');
      }

      // Retrieve the highest bid
      const highestBid = await this.bidRepository.findOne({
        where: { auctionId },
        order: [['bidAmount', 'DESC']],
      });

      // Update the auction with the winner
      if (highestBid) {
        await auction.update({ winnerId: highestBid.bidder_id });
      }

      return auction;
    } catch (error) {
      throw new Error('Failed to close auction.');
    }
  }
}

// Usage example
// const auctionService = new AuctionService();
// auctionService
// .createAuction({
//   item_id: 1,
//   start_time: new Date(),
//   end_time: new Date(),
//   reserve_price: 1000,
// })
//   .then((auction) => {
//     console.log('Auction created:', auction);
//     return auctionService.placeBid(auction.auction_id, 1, 1200);
//   })
//   .then((bid) => {
//     console.log('Bid placed:', bid);
//     return auctionService.closeAuction(bid.auction_id);
//   })
//   .then((auction) => {
//     console.log('Auction closed:', auction);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
