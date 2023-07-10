import { Request, Response } from 'express';
import RegisterService, { BidderRegistrationData } from './../services/Bidder/RegisterService';
import bidderRepository from "../sequelizer/repositories/BidderRepository";
import { generateBidderSchema } from './../validators/registerBidder';

const registerBidder = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    // Extract the registration data from the request body
    const registrationData: BidderRegistrationData = req.body;

    // Get the validation schema using the generator function
    const schema = generateBidderSchema();

    // Validate the registration data against the schema
    const { error } = schema.validate(registrationData);
    if (error) {
      return res.status(400).json({ message: 'Invalid registration data', error: error.details });
    }

    // Create an instance of the BidderRegistrationService
    const bidderRegistrationService = new RegisterService(bidderRepository);

    // Call the perform method of the service to register the bidder
    const registeredBidder = await bidderRegistrationService.perform(registrationData);

    // Return a success response
    res.status(200).json({ message: 'Bidder registered successfully', bidder: registeredBidder });
  } catch (error: any) {
    // Return an error response
    res.status(500).json({ message: 'Failed to register bidder', error: error.message });
  }
};

export default registerBidder;
