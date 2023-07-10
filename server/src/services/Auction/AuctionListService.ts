import { Repository } from 'sequelize-typescript';
import Auction from '../../sequelizer/models/Auction';

export default class AuctionListService {
  private auctionRepository: Repository<Auction>;

  constructor(auctionRepository: Repository<Auction>) {
    this.auctionRepository = auctionRepository;
  }

  async perform(): Promise<Auction[]> {
    try {
      // Retrieve the list of auctions from the auction repository
      const auctions = await this.auctionRepository.findAll();

      return auctions;
    } catch (error) {
      console.error('Failed to retrieve auctions:', error);
      throw new Error('Failed to retrieve auctions.');
    }
  }
}
