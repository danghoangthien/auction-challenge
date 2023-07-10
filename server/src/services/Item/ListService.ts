import { Repository } from 'sequelize-typescript';
import Item, { ItemStatus } from '../../sequelizer/models/Item';
import Auction from '../../sequelizer/models/Auction';
import Bid from '../../sequelizer/models/Bid';
import sequelize, { Op } from 'sequelize';

export default class ListItemService {
  private itemRepository: Repository<Item>;
  private auctionRepository: Repository<Auction>;
  private bidRepository: Repository<Bid>;

  constructor(itemRepository: Repository<Item>, auctionRepository: Repository<Auction>, bidRepository: Repository<Bid>) {
    this.itemRepository = itemRepository;
    this.auctionRepository = auctionRepository
    this.bidRepository = bidRepository
  }

  async perform(statusFilter?: ItemStatus[]): Promise<any[]> {
    try {
      // Prepare the where clause based on the status filter
      const whereClause: any = {};
      if (statusFilter && statusFilter.length > 0) {
        whereClause.status = statusFilter;
      }

      // Retrieve the list of items from the item repository with the applied filter
      const items = await this.itemRepository.findAll({
        where: whereClause,
      });
      const currentDate = new Date();
      const itemsWithAuction = await Promise.all(items.map(async (item) : Promise<any>=> {
        const currentAuction = await this.auctionRepository.findOne({
          where: {
            item_id: item.item_id,
            end_time: {
              [Op.gt]: currentDate, // Check if end_time is greater than current date/time
            },
          },
        });
        
        const lastAuction = await this.auctionRepository.findOne({
          where: {
            item_id: item.item_id,
            end_time: {
              [Op.lt]: currentDate, // Check if end_time is less than current date/time
            },
          }
        });

        if (!currentAuction && lastAuction && item.status !== ItemStatus.Completed) {
          await item.setStatus(ItemStatus.Completed);
        }
        let highestBid;
        if (lastAuction) {
          highestBid = await this.bidRepository.findOne({
            where: { auction_id: lastAuction.auction_id },
            order: [['bid_amount', 'DESC']],
          })
        }
        if (currentAuction) {
          highestBid =  await this.bidRepository.findOne({
            where: { auction_id: currentAuction.auction_id },
            order: [['bid_amount', 'DESC']],
          })
        }

        return {
          ...item.dataValues,
          current_auction: currentAuction,
          //last_auction: lastAuction,
          highest_bid: highestBid
        };
      }));
      return itemsWithAuction;
    } catch (error) {
      console.error('Failed to retrieve items:', error);
      throw new Error('Failed to retrieve items.');
    }
  }
}
