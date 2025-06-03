import { Player } from "./Player";
import { Coordinate } from "./Reference";

export enum CaseNature {
    Wall = 'wall',
    Path = 'path',
    Trap = 'trap',
    Home = 'home',
    Arrival = 'arrival',
}

// Case is immutable, we can not move or change it's nature
export class Case {

    public readonly coordinate: Coordinate
    public readonly nature: CaseNature;

    // this may be a trap even if true
    public readonly moveInto: boolean;

    constructor(coordinate: Coordinate, nature: CaseNature, moveInto: boolean = true) {
        this.coordinate = coordinate;
        this.nature = nature;
        this.moveInto = moveInto;
    }

    // whenever we can really move into a case
    public isVisitable(): boolean {
        return this.moveInto && (this.nature === CaseNature.Path || this.nature === CaseNature.Arrival);
    }

    public static fromPlayer(player: Player) : Case {
        return new Case(
            player.coordinate,
            player.wins ? CaseNature.Arrival : (player.dead ? CaseNature.Trap : CaseNature.Path),
            !player.dead && !player.wins
        );
    }

    public isExit() {
        return this.nature === CaseNature.Arrival;
    }

    public isNeighbors(coordinate: Coordinate): boolean {
        const dx = Math.abs(coordinate.x - this.coordinate.x);
        const dy = Math.abs(coordinate.y - this.coordinate.y);

        return dx <= 1 && dy <= 1 && !coordinate.equals(this.coordinate); // must be adjacent, but not the same coordinate
    }
}