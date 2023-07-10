import { Request, Response } from 'express';
import ItemCreateService from './../services/Item/CreateService';
import ListService from './../services/Item/ListService';
import itemRepository from '../sequelizer/repositories/ItemRepository';
import auctionRepository from '../sequelizer/repositories/AuctionRepository';
import bidRepository from '../sequelizer/repositories/BidRepository';
import { ItemStatus } from '../sequelizer/models/Item';
import sequelize from '../sequelizer/mySequelize';
import { ItemData } from '../types/ItemData';

export interface RequestBody {
  item_data: ItemData,
  ready_for_auction: boolean
}

export const createItem = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { item_data, ready_for_auction }: RequestBody = req.body;

    // Create a new item using the ItemCreateService
    const transaction = await sequelize.transaction();
    const itemCreateService = new ItemCreateService(itemRepository, transaction);
    const newItem = await itemCreateService.perform(item_data, ready_for_auction);

    // Return a success response with the created item
    return res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error: any) {
    // Return an error response
    return res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
};

export const listItems = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { statuses } = req.query;

    // Set a default value for the status filter if it's not provided
    const filterStatus: ItemStatus[] = statuses
      ? (statuses as string).split(',').map((status: string) => ItemStatus[status as keyof typeof ItemStatus])
      : [ItemStatus.Available, ItemStatus.InAuction, ItemStatus.Completed];

    // Create a new instance of the ListItemService
    const listItemService = new ListService(itemRepository, auctionRepository, bidRepository);

    // Retrieve the list of items using the ListItemService
    const items = await listItemService.perform(filterStatus);

    // Return a success response with the list of items
    return res.status(200).json({ message: 'Items retrieved successfully', items });
  } catch (error: any) {
    // Return an error response
    return res.status(500).json({ message: 'Failed to retrieve items', error: error.message });
  }
};
