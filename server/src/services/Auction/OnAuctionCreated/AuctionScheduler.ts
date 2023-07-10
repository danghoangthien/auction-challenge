import schedule from 'node-schedule';
import IObserver from '../../../interfaces/IObserver';
import Auction from '../../../sequelizer/models/Auction';
import AuctionCloseService from '../AuctionCloseService';
import auctionRepository from '../../../sequelizer/repositories/AuctionRepository';
import bidRepository from '../../../sequelizer/repositories/BidRepository';

export default class AuctionScheduler implements IObserver<Auction> {
  async update(auction: Auction) {
    console.log(`Will Scheduler run on ${auction.end_time}`);
    schedule.scheduleJob(auction.end_time, async () => {
      
      const auctionCloseService = new AuctionCloseService(auctionRepository, bidRepository);
      await auctionCloseService.perform(auction.auction_id);
    });
  }
}