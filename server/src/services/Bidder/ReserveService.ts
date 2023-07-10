import Bidder from '../../sequelizer/models/Bidder';
import { Repository } from 'sequelize-typescript';
import AObservable from '../../abstracts/AObservable';

export default class ReserveService extends AObservable<Bidder>{

  constructor() {
    super();
  }

  async perform(bidder: Bidder, amount: number, transaction: any): Promise<void> {
    try {
      // Decrease the bidder's deposit amount
      await bidder.decrementDeposit(amount, { transaction });
      // notify on neccessary
      await this.notifyObservers(bidder);
      console.log(`Reserve of $${amount} successfully added for bidder with ID ${bidder.bidder_id}.`);
    } catch (error) {
      console.error('Failed to deposit amount:', error);
      throw new Error('Failed to deposit amount.');
    }
  }
}