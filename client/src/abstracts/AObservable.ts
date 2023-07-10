import IObserver from './../interfaces/IObserver';

export default abstract class Observable<T> {
  private observers: IObserver<T>[] = [];

  registerObserver(observer: IObserver<T>): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: IObserver<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}
