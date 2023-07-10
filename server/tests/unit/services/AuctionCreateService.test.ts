import { Repository } from 'sequelize-typescript';
import AuctionCreateService, { AuctionData } from '../../../src/services/Auction/AuctionCreateService';
import Auction from '../../../src/sequelizer/models/Auction';
import Item from '../../../src/sequelizer/models/Item';



describe('AuctionCreateService', () => {
  let auctionRepository: Repository<Auction>;
  let itemRepository: Repository<Item>;
  let auctionCreateService: AuctionCreateService;

  beforeEach(() => {
    auctionRepository = {} as Repository<Auction>;
    itemRepository = {} as Repository<Item>;
    auctionCreateService = new AuctionCreateService(auctionRepository, itemRepository);
  });

  describe('perform', () => {
    const auctionData: AuctionData = {
      item_id: 1,
      start_time: new Date(),
      end_time: new Date(),
      reserve_price: 100,
    };

    const auction = {
      item_id: 1,
      start_time: new Date(),
      end_time: new Date(),
      reserve_price: 100,
      save: jest.fn(),
    } as Auction;
  const { item_id, ...auctionDataWithoutItemId } = auctionData;

    it('should create a new auction when item is valid and not being bid on', async () => {
      const item = {} as Item;
      itemRepository.findByPk = jest.fn().mockResolvedValue(item);
      auctionRepository.findOne = jest.fn().mockResolvedValue(null);
      auctionRepository.create = jest.fn().mockReturnValue(auction);

      const result = await auctionCreateService.perform(auctionData);
      expect(itemRepository.findByPk).toHaveBeenCalledTimes(1);
      expect(itemRepository.findByPk).toHaveBeenCalledWith(item_id);
      expect(auctionRepository.findOne).toHaveBeenCalledTimes(1);
      expect(auctionRepository.findOne).toHaveBeenCalledWith({where: { item_id, status: 'active' }});
      expect(auctionRepository.create).toHaveBeenCalledTimes(1);
      expect(auctionRepository.create).toHaveBeenCalledWith(auctionDataWithoutItemId);
      expect(auction.save).toHaveBeenCalledTimes(1);
      //expect(result).toEqual(auctionData);
    });

    it('should throw an error when the item is not found', async () => {
      itemRepository.findByPk = jest.fn().mockResolvedValue(null);

      await expect(auctionCreateService.perform(auctionData)).rejects.toThrow('Item not found.');
    });

    it('should throw an error when the item is already being bid on', async () => {
      const existingAuction = {} as Auction;
      const item = {} as Item;
      itemRepository.findByPk = jest.fn().mockResolvedValue(item);
      auctionRepository.findOne = jest.fn().mockResolvedValue(existingAuction);

      await expect(auctionCreateService.perform(auctionData)).rejects.toThrow('Item is already being bid on.');
    });
  });
});