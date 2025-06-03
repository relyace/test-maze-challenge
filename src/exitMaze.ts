import { Case } from "./data/models/Case";
import { Player } from "./data/models/Player";
import { Coordinate } from "./data/models/Reference";
import { VisitedCases } from "./data/VisitedCases";
import { MazeServices } from "./services/mazeServices";


export async function tryExitMaze(player: Player, initDiscoverUrl: string, initMoveUrl: string) {

    // we need to keep track of the visited cases
    // to avoid infinite loops
    const visitedCases: VisitedCases = new VisitedCases();
    const discovered: Coordinate[] = [];
    let discoverUrl = initDiscoverUrl;
    let moveUrl = initMoveUrl;

    async function findPath(player: Player): Promise<boolean>
    {
        if(player.wins){
            console.log("Player already won the game, exiting...");
            return true; // player already won
        }
        
        if(player.dead) throw new Error("Game over: Player is dead :(");
        
        if( visitedCases.hasVisited(player.coordinate)) return false;

        visitedCases.add( Case.fromPlayer(player) );

        const discovery = await MazeServices.surroundsDiscover(discoverUrl)
        
        // this will promote exit if it exists
        const visitables = discovery.getVisitableCases();
        console.log("Discovered cases:", visitables);

        if( visitables.length === 0 ) {
            console.log("No visitable cases found from:", player.coordinate);
            // no more cases to visit, we are stuck
            return false;
        }

        for(var caseToVisit of visitables) {

            if(!caseToVisit.isNeighbors(player.coordinate)) continue; // skip cases that are too far away

            discovered.push(caseToVisit.coordinate);
            // move the player to the new case
            player.move(caseToVisit.coordinate);
            console.log("Moving player to:", player.coordinate);
            // we need to save new player coordinates
            const newParams = await MazeServices.movePlayer(moveUrl, player.coordinate)
            console.log("New player state after move:", newParams);
            // moving player will update the player state
            player.updateState(newParams.player);

            if(caseToVisit.isExit()){
                console.log("Exit found at:", player.coordinate);
                console.log("Player state:", player);
                return true
            };
            
            discoverUrl = newParams.url_discover;
            moveUrl = newParams.url_move;

            if( await findPath(player) ) {
                console.log("Path found to exit:", player.coordinate);
                return true; // found a path to exit
            }
        }

        console.log("No path found from:", player.coordinate);
        
        // backtrack if no path was found..
        player.moveBack(); // move back to the previous case
        console.log("Move back player to", player.coordinate);
        const newParams = await MazeServices.movePlayer(moveUrl, player.coordinate)
        console.log("New player state after move back:", newParams);
        discoverUrl = newParams.url_discover;
        moveUrl = newParams.url_move;
        player.updateState(newParams.player);

        return false; // no path found
    }

    await findPath(player);

    for(const coordinate of discovered) {
        if(!visitedCases.hasVisited(coordinate)){
            throw new Error(`Coordinate ${coordinate} was not visited, something went wrong!`);
        }
    }

    return player.getWalkHistory();
}