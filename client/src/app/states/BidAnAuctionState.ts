class BidAnAuctionState {
  itemOnBidding: any | null;
  auctionOnBidding: any | null;
  constructor() {
    this.auctionOnBidding = null;
    this.itemOnBidding = null;
  }
}

export default new BidAnAuctionState();
