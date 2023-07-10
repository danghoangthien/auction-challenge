export default interface IObservable {
  registerObserver(observer: any): void;
  unregisterObserver(observer: any): void;
}