import { Case } from "./Case";
import { Coordinate } from "./Reference";

export class Discover {
  public readonly cases: Array<Case>;

  public constructor(cases: Array<Case>) {
    this.cases = cases;
  }

  public getVisitableCases(
    currentCoordinate: Coordinate,
    promoteExit: boolean = true
  ): Array<Case> {
    const cases = this.cases.filter((c) => {
      const dx = Math.abs(c.coordinate.x - currentCoordinate.x);
      const dy = Math.abs(c.coordinate.y - currentCoordinate.y);
      // filter out cases that are not adjacent to the current coordinate
      return dx <= 1 && dy <= 1 && dx + dy > 0 && c.isVisitable();
    });

    if (cases.some((c) => c.isExit()) && promoteExit) {
      return cases.filter((c) => c.isExit());
    }

    return cases;
  }

  static shuffle<T = Case>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
}
