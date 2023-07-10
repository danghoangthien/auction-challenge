export class Duration {
  private value: number;

  constructor(value: number) {
    if (value <= 0 || !Number.isInteger(value)) {
      throw new Error('Duration must be a positive integer');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export default Duration;

export const timeRange = (duration: Duration): [Date, Date] => {

  // Calculate the current time
  const currentTime = new Date();

  // Calculate the end time by adding the time window to the current time
  const endTime = new Date(currentTime.getTime() + duration.getValue() * 60 * 60 * 1000);

  // Calculate the start time by subtracting the time window from the end time
  const startTime = new Date(endTime.getTime() - duration.getValue() * 60 * 60 * 1000);
  return [startTime, endTime];
}