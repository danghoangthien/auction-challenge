export abstract class ModalState {
  open: () => void;
  close: () => void;

  constructor() {
    this.open = () => {};
    this.close = () => {};
  }

  register = (open, close) => {
    const subclassConstructor = Object.getPrototypeOf(this).constructor;
    console.log(subclassConstructor.name, '::ModalState register', true);
    this.open = open;
    this.close = close;
  };
}
