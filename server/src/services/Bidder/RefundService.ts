import Bidder from '../../sequelizer/models/Bidder';
import AObservable from '../../abstracts/AObservable';


export default class RefundService extends AObservable<Bidder>{

  constructor() {
    super();
  }

  async perform(bidder: Bidder, amount: number, transaction: any): Promise<void> {
    try {
      // Increase the bidder's deposit amount
      await bidder.incrementDeposit(amount, { transaction });
      // notify on neccessary
      await this.notifyObservers(bidder);
      console.log(`Refunding of $${amount} successfully transact for bidder with ID ${bidder.bidder_id}.`);
    } catch (error) {
      console.error('Failed to refunding amount:', error);
      throw new Error('Failed to refunding amount.');
    }
  }
}