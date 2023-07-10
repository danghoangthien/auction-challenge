import Bidder from '../../sequelizer/models/Bidder';
import { Repository } from 'sequelize-typescript';
import AObservable from '../../abstracts/AObservable';

export default class DepositService extends AObservable<Bidder>{
  private bidderRepository: Repository<Bidder>;

  constructor(bidderRepository: Repository<Bidder>) {
    super();
    this.bidderRepository = bidderRepository;
  }

  async perform(bidderId: number, amount: number): Promise<void> {
    try {
      const bidder = await this.bidderRepository.findOne({
        where: { bidder_id: bidderId },
      });

      if (!bidder) {
        throw new Error('Bidder not found.');
      }

      // Increase the bidder's deposit amount
      console.log('DepositService incrementDeposit amount', amount, typeof amount);
      await bidder.incrementDeposit(Number(amount));
      // notify on neccessary
      this.notifyObservers(bidder);
      console.log(`Deposit of $${amount} successfully added for bidder with ID ${bidderId}.`);
    } catch (error) {
      console.error('Failed to deposit amount:', error);
      throw new Error('Failed to deposit amount.');
    }
  }
}