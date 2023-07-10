import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authenticateToken';
import bidderRepository from "../sequelizer/repositories/BidderRepository";
import DepositService from '../services/Bidder/DepositService';
import { depositBidderSchema } from '../validators/depositBidder';

export const getBidder = async (req: AuthenticatedRequest, res: Response): Promise<void | Response> => {
  try {
    const { userId } = req.user;
    // Find the bidder based on the ID
    const bidder = await bidderRepository.findByPk(userId);

    if (!bidder) {
      return res.status(404).json({ message: 'Bidder not found' });
    }

    // Return the bidder data
    return res.status(200).json({ bidder });
  } catch (error: any) {
    console.error('Failed to get bidder:', error);
    return res.status(500).json({ message: 'Failed to get bidder', error: error.message });
  }
};

export const deposit = async (req: AuthenticatedRequest, res: Response): Promise<void | Response> => {
  try {
    const { amount } = req.body;
    const { userId } = req.user;
    const schema = depositBidderSchema();
    const { error } = schema.validate({ amount });
    if (error) {
      return res.status(400).json({ message: 'Invalid registration data', error: error.details });
    }
    // Create an instance of the DepositService
    const depositService = new DepositService(bidderRepository);
    // Call the perform method of the DepositService to deposit the amount
    await depositService.perform(userId, amount);

    // Return a success response
    res.status(200).json({ message: 'Deposit successful' });
  } catch (error: any) {
    console.error('Failed to deposit amount:', error);
    // Return an error response
    res.status(500).json({ message: 'Failed to deposit amount', error: error.message });
  }
};
