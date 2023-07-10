import Item, { ItemStatus } from '../../sequelizer/models/Item';
import { Repository } from 'sequelize-typescript';
import CreateAuctionOnItemCreated, { ItemWithTransaction } from './OnItemCreated/CreateAuction';
import AObservable from './../../abstracts/AObservable';
import { Transaction } from 'sequelize';
import { ItemData } from '../../types/ItemData';

export default class CreateService extends AObservable<ItemWithTransaction> {
  private itemRepository: Repository<Item>;
  private transaction: Transaction;

  constructor(itemRepository: Repository<Item>, transaction: Transaction) {
    super();
    this.itemRepository = itemRepository;
    this.registerObserver(new CreateAuctionOnItemCreated());
    this.transaction = transaction;
  }

  async perform(itemData: ItemData, shouldCreateAuction: boolean): Promise<Item> {
    try {
      // Create a new item with the provided data
      const item = await this.itemRepository.create({
        ...itemData,
        status: ItemStatus.Available, // Set the initial status to 'Available'
      });
      await this.notifyObservers({
        item,
        transaction: this.transaction,
        shouldCreateAuction
      });
      return item;
    } catch (error) {
      console.error('Failed to create item:', error);
      throw new Error('Failed to create item.');
    }
  }
}