import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import Auction from './Auction';

export enum ItemStatus {
  Available = 'Available',
  InAuction = 'InAuction',
  Completed = 'Completed',
}

@Table({ tableName: 'item' })
class Item extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  item_id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  initial_price: number;

  @Column
  time_window: number;

  @Column({
    type: DataType.ENUM(...Object.values(ItemStatus)),
    allowNull: false,
    defaultValue: ItemStatus.Available,
  })
  status: ItemStatus;

  async setStatus(status: ItemStatus): Promise<void> {
    this.status =  status;
    await this.save();
  }

  @HasMany(() => Auction, { foreignKey: 'item_id' })
  auctions: Auction[];
}

export default Item;