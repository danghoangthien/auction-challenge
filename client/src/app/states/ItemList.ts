class ItemListState {
  items: [];
  setItems: (items: any[]) => void;
  constructor() {
    this.items = [];
    this.setItems = (_: any[]) => {};
  }

  register = setItems => {
    this.setItems = setItems;
  };
}

export default new ItemListState();
