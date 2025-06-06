export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
