import Bidder from '../../sequelizer/models/Bidder';
import { Repository } from 'sequelize-typescript';

export default class CheckCredentialService {
  private bidderRepository: Repository<Bidder>;

  constructor(bidderRepository: Repository<Bidder>) {
    this.bidderRepository = bidderRepository;
  }

  async perform(email: string, password: string): Promise<Bidder> {
    // Find the bidder by email
    const bidder = await this.bidderRepository.findOne({ where: { email }, });

    if (!bidder || bidder.password !== password) {
      throw new Error('Invalid credential.');
    }

    return bidder;
  }
}