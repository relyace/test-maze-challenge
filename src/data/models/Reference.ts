export enum Axis {
  X = "x",
  Y = "y",
}

export enum Directions {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export class Coordinate {
  [Axis.X]: number;
  [Axis.Y]: number;

  constructor(x: number, y: number) {
    this[Axis.X] = x;
    this[Axis.Y] = y;
  }

  public equals(other: Coordinate): boolean {
    return (
      this[Axis.X] === other[Axis.X] &&
      this[Axis.Y] === other[Axis.Y]
    );
  }
}
