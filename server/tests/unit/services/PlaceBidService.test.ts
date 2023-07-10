import { Repository } from 'sequelize-typescript';
import Auction from '../../../src/sequelizer/models/Auction';
import Bidder from '../../../src/sequelizer/models/Bidder';
import Bid from '../../../src/sequelizer/models/Bid';
import PlaceBidService from '../../../src/services/Bid/PlaceBidService';

describe('PlaceBidService', () => {
    let placeBidService: PlaceBidService;
    let auctionRepository: Repository<Auction>;
    let bidderRepository: Repository<Bidder>;
    let bidRepository: Repository<Bid>;
    let refundService;
    let reverseService;

    beforeEach(() => {
        // Create mock repositories
        auctionRepository = {} as Repository<Auction>;
        bidderRepository = {} as Repository<Bidder>;
        bidRepository = {} as Repository<Bid>;
        refundService = {}
        reverseService = {}

        // Create instance of PlaceBidService
        placeBidService = new PlaceBidService(auctionRepository, bidRepository, bidderRepository, refundService, reverseService);
    });

    describe('perform', () => {
        it('should place a bid successfully', async () => {
            // Create mock data
            const auctionId = 1;
            const bidderId = 1;
            const bidAmount = 100;

            // Create mock auction and bidder
            const auction = {} as Auction;
            const bidder = {
                deposit: 200,
                decrementDeposit: jest.fn(),
                incrementDeposit: jest.fn(),
            } as Bidder;

            // Create mock highest bid
            const highestBid = {
                bidder_id: 2,
                bid_amount: 90,
            } as Bid;

            // Mock repository methods
            auctionRepository.findByPk = jest.fn().mockResolvedValue(auction);
            bidderRepository.findByPk = jest.fn().mockResolvedValue(bidder);
            bidRepository.findOne = jest.fn().mockResolvedValue(highestBid);
            bidRepository.create = jest.fn().mockResolvedValue({} as Bid);
            refundService.perform = jest.fn();
            reverseService.perform = jest.fn();

            // Call the perform method
            const result = await placeBidService.perform(auctionId, bidderId, bidAmount);

            // Assert the result
            expect(result).toBeDefined();

            // Verify repository method calls
            expect(auctionRepository.findByPk).toHaveBeenCalledWith(auctionId);
            expect(bidderRepository.findByPk).toHaveBeenCalledWith(bidderId);
            expect(bidRepository.findOne).toHaveBeenCalledWith({
                where: { auctionId },
                order: [['bidAmount', 'DESC']],
            });
            expect(bidRepository.create).toHaveBeenCalledWith(
                { auctionId, bidderId, bidAmount },
                { transaction: expect.any(Object) },
            );

            // Verify decrementDeposit method call
            expect(bidder.decrementDeposit).toHaveBeenCalledWith(bidAmount, {
                transaction: expect.any(Object),
            });
        });
        it('should fail to place a bid due to expired auction', async () => {
            // Mock the data for an expired auction
            const auctionId = 1;
            const bidderId = 2;
            const bidAmount = 100;

            const auction = {} as Auction;
            auction.end_time = new Date(Date.now() - 1000); // Set the auction end time to a past time

            const bidder = {
                deposit: 200,
                decrementDeposit: jest.fn(),
                incrementDeposit: jest.fn(),
            } as Bidder;

            // Create mock highest bid
            const highestBid = {
                bidder_id: 2,
                bid_amount: 90,
            } as Bid;

            // Mock the repository methods
            auctionRepository.findByPk = jest.fn().mockResolvedValue(auction);
            bidderRepository.findByPk = jest.fn().mockResolvedValue(bidder);
            bidRepository.findOne = jest.fn().mockResolvedValue(highestBid);
            bidRepository.create = jest.fn().mockResolvedValue({} as Bid);
            refundService.perform = jest.fn();
            reverseService.perform = jest.fn();
            // Perform the bid and expect it to throw an error
            await expect(placeBidService.perform(auctionId, bidderId, bidAmount)).rejects.toThrow(
                'Auction has expired. Bidding is not allowed.',
            );

            // Assertions
            expect(auctionRepository.findByPk).toHaveBeenCalledWith(auctionId);
        });

        // Add more test cases for different scenarios (e.g., insufficient deposit, bid amount not higher, etc.)
    });
});
