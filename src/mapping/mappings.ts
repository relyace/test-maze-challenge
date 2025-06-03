import { Coordinate } from "../data/models/Reference";
import { Player } from "../data/models/Player";
import { CaseResource, PlayerResource } from "../data/resources/Resources";
import { Case, CaseNature } from "../data/models/Case";
import { Discover } from "../data/models/Discover";



export function mapPlayerResourceToPlayer(playerResource: PlayerResource): Player {

    const coordinate = new Coordinate(
        playerResource.position_x,
        playerResource.position_y
    );

    return new Player(
        playerResource.player,
        coordinate,
        playerResource.dead,
        playerResource.win
    );
}

export function mapDiscoverResourceToDiscover(resources: Array<CaseResource>): Discover {

    const cases = resources.map( (resource: CaseResource) => {
        let nature: CaseNature
        switch(resource.value)
        {
            case 'path':
                nature = CaseNature.Path;
                break;
            case 'wall':
                nature = CaseNature.Wall;
                break;
            case 'trap':
                nature = CaseNature.Trap;
                break;
            case 'home':
                nature = CaseNature.Home;
                break;
            case 'stop':
                nature = CaseNature.Arrival;
                break;
            default:
                throw new Error(`Unknown case nature: ${resource.value}`);
        }

        return new Case(
            new Coordinate(resource.x, resource.y),
            nature,
            resource.move
        );
    } )

    return new Discover(cases);
}