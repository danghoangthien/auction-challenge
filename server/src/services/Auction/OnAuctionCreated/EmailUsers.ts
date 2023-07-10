import IObserver from '../../../interfaces/IObserver';
import Auction from '../../../sequelizer/models/Auction';

export default class EmailUsers implements IObserver<Auction> {
  async update(auction: Auction) {
    console.log('Email to anounce about new auction release to all potential bidders');
  }
}