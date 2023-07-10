import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import auctionRepository from "../sequelizer/repositories/AuctionRepository";
import bidRepository from "../sequelizer/repositories/BidRepository";
import bidderRepository from "../sequelizer/repositories/BidderRepository";
import PlaceBidService from '../services/Bid/PlaceBidService';
import { depositBidderSchema } from '../validators/depositBidder';
import RefundService from '../services/Bidder/RefundService';
import ReserveService from '../services/Bidder/ReserveService';


export const placeBid = async (req: AuthenticatedRequest, res: Response): Promise<void | Response> => {
  try {
    const { auction_id, amount, memo } = req.body;
    const { userId } = req.user;
    const schema = depositBidderSchema();
    const { error } = schema.validate({ amount });
    if (error) {
      return res.status(400).json({ message: 'Invalid bidding data', error: error.details });
    }
    // Create an instance of the DepositService
    const placeBidService = new PlaceBidService(
      auctionRepository,
      bidRepository,
      bidderRepository,
      new RefundService(),
      new ReserveService(),
    );
    // Call the perform method of the DepositService to deposit the amount
    await placeBidService.perform(auction_id, userId, amount, memo);

    // Return a success response
    res.status(200).json({ message: 'Place bid successful' });
  } catch (error: any) {
    console.error('Failed to place bid:', error);
    // Return an error response
    return res.status(500).json({ message: 'Failed to place bid', error: error.message });
  }
};
