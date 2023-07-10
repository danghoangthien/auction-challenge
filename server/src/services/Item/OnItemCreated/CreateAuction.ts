import IObserver from '../../../interfaces/IObserver';
import Item from '../../../sequelizer/models/Item';
import { Transaction } from 'sequelize';
import AuctionCreateService from '../../Auction/AuctionCreateService';
import auctionRepository from '../../../sequelizer/repositories/AuctionRepository';
import { Duration, timeRange } from '../../../util/timeRangeByDutation';

export interface ItemWithTransaction {
  item: Item,
  transaction: Transaction,
  shouldCreateAuction: boolean,
}
export default class CreateAuctionOnItemCreated implements IObserver<ItemWithTransaction> {
  async update(
    { item, transaction, shouldCreateAuction }: ItemWithTransaction) {
    if (shouldCreateAuction) {
      const auctionCreateService= new AuctionCreateService(auctionRepository, transaction);
      // Calculate the current time
      const duration = new Duration(parseInt(`${item.time_window}`));
      const [startTime, endTime] = timeRange(duration);
      await auctionCreateService.perform({
        start_time: startTime,
        end_time: endTime,
        reserve_price: item.initial_price
      }, item);
    }
  }
}