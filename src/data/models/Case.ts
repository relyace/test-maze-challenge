import { Player } from "./Player";
import { Coordinate, Directions } from "./Reference";

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

    public toDirection(current: Coordinate): Directions|null {

        if (this.coordinate.x === current.x && this.coordinate.y === current.y - 1) {
            return Directions.Up;
        }
        if (this.coordinate.x === current.x && this.coordinate.y === current.y + 1) {
            return Directions.Down;
        }
        if (this.coordinate.x === current.x - 1 && this.coordinate.y === current.y) {
            return Directions.Left;
        }
        if (this.coordinate.x === current.x + 1 && this.coordinate.y === current.y) {
            return Directions.Right;
        }

        // if we are not in a direction, we cannot move into it, since we can move by one step only
        return null;
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
}