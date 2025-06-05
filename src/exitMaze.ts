import { Case } from "./data/models/Case";
import { Player } from "./data/models/Player";
import { VisitedCases } from "./data/VisitedCases";
import { MazeServices } from "./services/mazeServices";

// discoverUrl: URL to discover the surroundings of the player
// moveUrl: URL to move the player to a new case
export async function tryExitMaze(
  player: Player,
  initialDiscoverUrl: string,
  initialMoveUrl: string
) {
  // we need to keep track of the visited cases
  // to avoid infinite loops
  const visitedCases: VisitedCases = new VisitedCases();

  let discoverUrl = initialDiscoverUrl;
  let moveUrl = initialMoveUrl;

  async function findPath(player: Player): Promise<boolean> {
    console.log("Finding path from ", player.coordinate);
    if (player.wins) {
      console.log("Player already won the game, exiting...");
      return true; // player already won
    }

    if (player.dead) throw new Error("Game over: Player is dead :(");

    if (visitedCases.hasVisited(player.coordinate)) {
      console.log("Already visited case:", player.coordinate);
      return false;
    }

    visitedCases.add(Case.fromPlayer(player));

    const discovery = await MazeServices.surroundsDiscover(discoverUrl);

    // this will promote exit if it exists
    // depends on the actual player position
    const visitables = discovery.getVisitableCases(player.coordinate);
    console.log(
      "Found available cases to visit:",
      ...visitables.map((c) => c.coordinate)
    );

    if (visitables.length === 0) {
      console.log("No visitable cases found from:", player.coordinate);
      return false; // no visitable cases found
    }

    for (var caseToVisit of visitables) {
      console.log("Moving player to", caseToVisit.coordinate);
      // we need to save new player coordinates
      const newParams = await MazeServices.movePlayer(
        moveUrl,
        caseToVisit.coordinate
      );
      player.move(newParams.coordinate);
      player.updateState(newParams);
      discoverUrl = newParams.discoverUrl;
      moveUrl = newParams.moveUrl;
      console.log("Moved player to", player.coordinate);

      if (caseToVisit.isExit()) {
        console.log("Exit found at:", player.coordinate);
        return true;
      }

      const pathFound = await findPath(player);

      if (pathFound) {
        return true; // found a path to exit
      } else {
        console.log("No path found from:", player.coordinate);
        player.moveBack(); // move back to the previous case if no path was found
        const newParams = await MazeServices.movePlayer(
          moveUrl,
          player.coordinate
        );
        player.updateState(newParams);
        discoverUrl = newParams.discoverUrl;
        moveUrl = newParams.moveUrl;
        console.log("Moved backward ", player.coordinate);
      }
    }

    visitedCases.removeLastVisited(); // allow re-visit last case in case it will lead to possible exit
    
    return false; // no path found
  }

  const resolved = await findPath(player);

  if (resolved) {
    console.log("Maze exited successfully!");

    return player.getWalkHistory();
  }

  console.error("No path to exit the maze :(");
}
