import { Case } from "./data/models/Case";
import { Player } from "./data/models/Player";
import { VisitedCases } from "./data/VisitedCases";
import { MazeServices } from "./services/mazeServices";


export async function tryExitMaze(player: Player, initDiscoverUrl: string, initMoveUrl: string) {

    // we need to keep track of the visited cases
    // to avoid infinite loops
    const visitedCases: VisitedCases = new VisitedCases();
    let discoverUrl = initDiscoverUrl;
    let moveUrl = initMoveUrl;

    async function findPath(player: Player)
    {
        if(player.wins) return true;
        
        if(player.dead) throw new Error("Game over: Player is dead :(");
        
        if( visitedCases.hasVisited(player.coordinate)) return false;

        visitedCases.add( Case.fromPlayer(player) );

        const discovery = await MazeServices.surroundsDiscover(discoverUrl)
        // this will promote exit if it exists
        const visitables = discovery.getVisitableCases();

        if( visitables.length === 0 ) {

            // no more cases to visit, we are stuck
            return false;
        }

        for(const caseToVisit of visitables) {
            const newDirection = caseToVisit.toDirection(player.coordinate);
            // move the player to the new case
            player.move(newDirection!);
            // we need to save new player coordinates
            const newParams = await MazeServices.movePlayer(moveUrl, player.coordinate)
            // moving player will update the player state
            player.updateState(newParams.player);

            if(caseToVisit.isExit()) return true;
            
            discoverUrl = newParams.url_discover;
            moveUrl = newParams.url_move;

            if( await findPath(player) ) {
                return true; // found a path to exit
            }
        }

        // backtrack if no path was found..
        player.moveBack(); // move back to the previous case
        const newParams = await MazeServices.movePlayer(moveUrl, player.coordinate)
        discoverUrl = newParams.url_discover;
        moveUrl = newParams.url_move;
        player.updateState(newParams.player);

        return false; // no path found
    }

    await findPath(player);

    return player.getWalkHistory();
}