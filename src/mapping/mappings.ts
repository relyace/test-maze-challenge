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
        const nature = resource.value === 'stop' ? 'arrival' : resource.value;
        return new Case(
            new Coordinate(resource.x, resource.y),
            CaseNature[nature],
            resource.move
        );
    } )

    return new Discover(cases);
}