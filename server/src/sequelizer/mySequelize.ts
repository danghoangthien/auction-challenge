import {Sequelize} from 'sequelize-typescript';

import Auction from './models/Auction';
import Bidder from './models/Bidder';
import Item from './models/Item';
import Bid from './models/Bid';

import {
  MYSQLDB_USER,
  MYSQLDB_ROOT_PASSWORD,
  MYSQLDB_DATABASE,
} from '../util/constant'

// Define the database configuration
const sequelize = new Sequelize(
  MYSQLDB_DATABASE, MYSQLDB_USER, MYSQLDB_ROOT_PASSWORD,
  {
    dialect: 'mysql',
    host: 'auction_db',
    repositoryMode: true,
  }
);

// Add your models to Sequelize
sequelize.addModels([Bidder, Item, Bid, Auction]);

// Export the initialized Sequelize instance
export default sequelize;