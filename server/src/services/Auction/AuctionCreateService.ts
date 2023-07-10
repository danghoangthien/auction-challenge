import Auction from '../../sequelizer/models/Auction';
import Item, { ItemStatus } from '../../sequelizer/models/Item';
import { Repository } from 'sequelize-typescript';
import AObservable from './../../abstracts/AObservable';
import { Transaction, Op } from 'sequelize';
import AuctionScheduler from './OnAuctionCreated/AuctionScheduler';

export interface AuctionData {
  start_time: Date;
  end_time: Date;
  reserve_price: number;
}

export default class AuctionCreateService extends AObservable<Auction>{

  private auctionRepository: Repository<Auction>;
  private transaction: Transaction

  constructor(auctionRepository: Repository<Auction>, transaction: Transaction) {
    super();
    this.auctionRepository = auctionRepository;
    this.transaction = transaction;
    this.registerObserver(new AuctionScheduler());
  }

  async perform(auctionData: AuctionData, item: Item): Promise<Auction> {
    try {

      if (item.status !== ItemStatus.Available) {
        throw new Error('Item not found or not available.');
      }

      // Check if the item is already being bid on
      const existingAuction = await this.auctionRepository.findOne({
        where: { item_id: item.item_id, end_time: { [Op.gt]: new Date() }},
      });

      if (existingAuction) {
        throw new Error('Item is already being bid on.');
      }
      // Start a transaction
      try {
        // Create a new auction and associate it with the item
        const auction = await this.auctionRepository.create({
          ...auctionData,
          item_id: item.item_id,
        } as any);
        // Update the item status to 'InAuction'
        await item.update({ status: ItemStatus.InAuction });
        await this.notifyObservers(auction);
        await this.transaction.commit();
        return auction;
      } catch (error) {
        // Rollback transaction in case of any error
        await this.transaction.rollback();
        throw error;
      }
      
    } catch (error: any) {
      console.log('error', error);
      throw new Error(error.message);
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
