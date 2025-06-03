import { Case } from "./Case";

export class Discover {
  public readonly cases: Array<Case>;

  public constructor(cases: Array<Case>) {
    this.cases = cases;
  }

  public getVisitableCases(promoteExit: boolean = true): Array<Case> {
    const cases = this.cases.filter((c) => c.isVisitable());

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
