import { Case } from "./models/Case";
import { Coordinate } from "./models/Reference";

export class VisitedCases {
  private readonly visitedCases: Array<Case>;

  constructor(cases: Array<Case> = []) {
    this.visitedCases = cases;
  }

  public add(caseToAdd: Case): void {
    if (
      !this.visitedCases.some((c) => c.coordinate.equals(caseToAdd.coordinate))
    ) {
      this.visitedCases.push(caseToAdd);
    }
  }

  public hasVisited(coordinate: Coordinate): boolean {
    return this.visitedCases.some((c) => c.coordinate.equals(coordinate));
  }

  public removeLastVisited(): void {
    if (this.visitedCases.length > 0) {
      this.visitedCases.pop();
    }
  }
}
