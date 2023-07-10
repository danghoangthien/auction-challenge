import Bidder from '../../sequelizer/models/Bidder';
import { Repository } from 'sequelize-typescript';
import AObservable from '../../abstracts/AObservable';

export interface BidderRegistrationData {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}


export default class BidderRegistrationService extends AObservable<Bidder>{
  private bidderRepository: Repository<Bidder>;

  constructor(bidderRepository: Repository<Bidder>) {
    super();
    this.bidderRepository = bidderRepository;
  }

  async perform(bidderRegistrationData: BidderRegistrationData): Promise<Bidder> {
    try {
      // Check if a bidder with the same email already exists
      const existingBidder = await this.bidderRepository.findOne({ where: { email: bidderRegistrationData.email }, });
      if (existingBidder) {
        throw new Error('Bidder with the provided email already exists.');
      }

      // Create a new bidder
      const newBidder = await this.bidderRepository.create(bidderRegistrationData as any);


      console.log(`Bidder ${bidderRegistrationData.name} (${bidderRegistrationData.email}) registered successfully.`);
      return newBidder;
    } catch (error) {
      console.error('Failed to register bidder:', error);
      throw new Error('Failed to register bidder.');
    }
  }
}