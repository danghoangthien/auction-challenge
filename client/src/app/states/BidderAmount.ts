class BidderAmountState {
  amount: number;
  setAmount: (amount: number) => void;
  constructor() {
    this.amount = 0;
    this.setAmount = () => {};
  }

  register = setAmount => {
    this.setAmount = setAmount;
  };
  doSetAmount = (amount: number) => {
    this.amount = amount;
    this.setAmount(amount);
  };
}

export default new BidderAmountState();
