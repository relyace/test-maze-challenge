import { Case } from "./data/models/Case";
import { Player } from "./data/models/Player";
import { Coordinate } from "./data/models/Reference";
import { VisitedCases } from "./data/VisitedCases";
import { MazeServices } from "./services/mazeServices";

// discoverUrl: URL to discover the surroundings of the player
// moveUrl: URL to move the player to a new case
// discoverUrl and moveUrl does not change between calls
export async function tryExitMaze(
  player: Player,
  discoverUrl: string,
  moveUrl: string,
  magicJump = false
) {
  // we need to keep track of the visited cases
  // to avoid infinite loops
  const visitedCases: VisitedCases = new VisitedCases();
  const discovered: Coordinate[] = [];

  async function findPath(player: Player): Promise<boolean> {
    if (player.wins) {
      console.log("Player already won the game, exiting...");
      return true; // player already won
    }

    if (player.dead) throw new Error("Game over: Player is dead :(");

    if (visitedCases.hasVisited(player.coordinate)) return false;

    visitedCases.add(Case.fromPlayer(player));

    const discovery = await MazeServices.surroundsDiscover(discoverUrl);

    // this will promote exit if it exists
    const visitables = discovery.getVisitableCases();
    console.log("Discovered cases:", visitables);

    if (visitables.length === 0) {
      console.log("No visitable cases found from:", player.coordinate);
      // no more cases to visit, we are stuck
      return false;
    }

    for (var caseToVisit of visitables) {
      discovered.push(caseToVisit.coordinate);

      // sometimes discovered cases are too far away, suppose we can do a magic jump
      if (!caseToVisit.isNeighbors(player.coordinate) && !magicJump) continue; // skip cases that are too far away

      console.log(
        "Moving player to from",
        player.coordinate,
        "to",
        caseToVisit.coordinate
      );
      try {
        // we need to save new player coordinates
        const newParams = await MazeServices.movePlayer(
          moveUrl,
          caseToVisit.coordinate
        );
        player.move(caseToVisit.coordinate);
        // moving player will update the player state
        player.updateState(newParams);
      } catch {
        // sometimes the move fails 
      }

      if (caseToVisit.isExit()) {
        console.log("Exit found at:", player.coordinate);
        console.log("Player state:", player);
        return true;
      }

      const pathFound = await findPath(player);

      if (pathFound) {
        console.log("Path found to exit:", player.coordinate);
        return true; // found a path to exit
      }
    }

    console.log("No path found from:", player.coordinate);

    player.moveBack(); // move back to the previous case if no path was found

    return false; // no path found
  }

  await findPath(player);

  return player.getWalkHistory();
}
