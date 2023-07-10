import { Request, Response } from 'express';
import AuctionCreateService, { AuctionData } from './../services/Auction/AuctionCreateService';
import AuctionListService from './../services/Auction/AuctionListService';
import itemRepository from '../sequelizer/repositories/ItemRepository';
import auctionRepository from '../sequelizer/repositories/AuctionRepository';
import sequelize from '../sequelizer/mySequelize';

interface AuctionDataRequest extends AuctionData {
  item_id: string;
}

export const createAuction = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const auctionData: AuctionDataRequest = req.body;

    const item = await itemRepository.findByPk(auctionData.item_id);

    const transaction = await sequelize.transaction();
    // Create a new instance of the AuctionCreateService
    const auctionCreateService = new AuctionCreateService(auctionRepository, transaction);

    // Create a new auction using the AuctionCreateService
    const newAuction = await auctionCreateService.perform(auctionData, item);

    // Return a success response with the created auction
    res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
  } catch (error: any) {
    // Return an error response
    res.status(500).json({ message: 'Failed to create auction', error: error.message });
  }
};

export const listAuctions = async (req: Request, res: Response): Promise<void> => {
  try {
    // Create a new instance of the AuctionListService
    const auctionListService = new AuctionListService(auctionRepository);

    // Retrieve the list of auctions using the AuctionListService
    const auctions = await auctionListService.perform();

    // Return a success response with the list of auctions
    res.status(200).json({ message: 'Auctions retrieved successfully', auctions });
  } catch (error: any) {
    // Return an error response
    res.status(500).json({ message: 'Failed to retrieve auctions', error: error.message });
  }
};
