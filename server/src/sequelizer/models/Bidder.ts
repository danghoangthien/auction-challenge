import { Model, Column, Table, HasMany } from 'sequelize-typescript';
import Auction from './Auction';
import Bid from './Bid';

@Table({ tableName: 'bidder' })
class Bidder extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  bidder_id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: 0 })
  deposit: number;

  @HasMany(() => Auction, 'winner_id')
  winningAuctions: Auction[];

  @HasMany(() => Bid, 'bidder_id')
  bids: Bid[];

  async incrementDeposit(amount: number, options?: any): Promise<void> {
    this.deposit =  Number(this.deposit) + amount;
    await this.save(options);
  }

  async decrementDeposit(amount: number, options?: any): Promise<void> {
    if (Number(this.deposit) >= amount) {
      this.deposit = Number(this.deposit) - amount;
      await this.save(options);
    } else {
      throw new Error('Insufficient deposit.');
    }
  }
}

export default Bidder;