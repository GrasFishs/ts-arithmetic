export class Timer {
  private startTime: number = 0;

  public start() {
    this.startTime = Date.now();
  }

  public end() {
    console.log(Date.now() - this.startTime);
  }
}
