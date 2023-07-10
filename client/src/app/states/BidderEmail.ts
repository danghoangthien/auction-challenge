class BidderAmountState {
  email: string | null;
  setEmail: (email: string) => void;
  constructor() {
    this.email = null;
    this.setEmail = () => {};
  }

  register = setEmail => {
    this.setEmail = setEmail;
  };
}

export default new BidderAmountState();
