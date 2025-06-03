import { Case } from "./Case";


export class Discover {

    public readonly cases: Array<Case>;

    public constructor(cases: Array<Case>) {
        this.cases = cases;
    }

    public getVisitableCases(promoteExit: boolean = true): Array<Case> {

        const cases = this.cases.filter(c => c.isVisitable());

        if( cases.some( c => c.isExit() ) && promoteExit )
        {
            return cases.filter(c => c.isExit());
        }

        return cases;
    }
}