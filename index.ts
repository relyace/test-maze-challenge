import { tryExitMaze } from "./src/exitMaze";
import { drawMazePath } from "./src/services/draw";
import { MazeServices } from "./src/services/mazeServices";

// starting the game will create a player
// the player will be spawned in the maze (may be in a random position)
console.log("Starting the game...");
const player = await MazeServices.startGame("Jason Bourne");
console.log("Player created:", player.player);

// then we can try to exit the player form the maze
const path = await tryExitMaze(
  player.player,
  player.url_discover,
  player.url_move
);

path && drawMazePath(path);
