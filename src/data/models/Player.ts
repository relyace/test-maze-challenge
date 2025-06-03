import { Coordinate, Directions } from "./Reference";

export class Player {
  public readonly name: string;
  public coordinate: Coordinate;
  public dead: boolean;
  public wins: boolean;

  public constructor(
    name: string,
    coordinate: Coordinate,
    dead: boolean = false,
    wins: boolean = false
  ) {
    this.name = name;
    this.coordinate = coordinate;
    this.dead = dead;
    this.wins = wins;
    this.history.push(coordinate); // Add initial coordinate to history
  }

  private history: Array<Coordinate> = [];

  public move(newCoordinate: Coordinate): Player {
    this.coordinate = newCoordinate;
    this.history.push(newCoordinate); // Add new coordinate to history

    return this;
  }

  public moveBack(): Player {
    if (this.history.length < 2) {
      throw new Error("No previous position to move back to.");
    }

    // Remove the last coordinate (current position)
    this.history.pop();
    // Get the previous coordinate
    const previousCoordinate = this.history.pop();
    if (!previousCoordinate) {
      throw new Error("No previous position to move back to.");
    }

    // Set the player's coordinate to the previous position
    this.coordinate = previousCoordinate;
    // Add the previous coordinate back to history
    this.history.push(previousCoordinate);

    return this;
  }

  public getWalkHistory(): Array<Coordinate> {
    return [...this.history]; // Return a copy of the history
  }

  public updateState(player: Player): Player {
  
    this.dead = player.dead;
    this.wins = player.wins;

    return this;
  }
}
