import { Model, Column, ForeignKey, Table, BelongsTo } from 'sequelize-typescript';
import Auction from './Auction';
import Bidder from './Bidder';

@Table({ tableName: 'bid' })
class Bid extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  bid_id: number;

  @ForeignKey(() => Auction)
  @Column
  auction_id: number;

  @ForeignKey(() => Bidder)
  @Column
  bidder_id: number;

  @Column
  bid_amount: number;

  @Column
  bid_time: Date;

  @Column
  memo: string;

  @BelongsTo(() => Auction)
  auction: Auction;

  @BelongsTo(() => Bidder)
  bidder: Bidder;
}

export default Bid;
