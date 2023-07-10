import { Model, Column, ForeignKey, Table, BelongsTo, DataType } from 'sequelize-typescript';

import Bidder from './Bidder';
import Item from './Item';

@Table({ tableName: 'auction' })
class Auction extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  auction_id: number;

  @ForeignKey(() => Item)
  @Column
  item_id: number;

  @Column
  start_time: Date;

  @Column
  end_time: Date;

  @Column
  reserve_price: number;

  @ForeignKey(() => Bidder)
  @Column(DataType.INTEGER)
  winner_id: number;
  async setWinnerId(winner_id: number): Promise<void> {
    this.winner_id =  winner_id;
    await this.save();
  }
  
  @BelongsTo(() => Item, 'item_id')
  item: Item;

  @BelongsTo(() => Bidder, 'winner_id')
  winner: Bidder;
}

export default Auction;
