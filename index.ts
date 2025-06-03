import { tryExitMaze } from "./src/exitMaze";
import { MazeServices } from "./src/services/mazeServices";

// starting the game will create a player
// the player will be spawned in the maze (may be in a random position)
console.log("Starting the game...");
const player = await MazeServices.startGame('Joe Doe');
console.log("Player created:", player.player);

// then we can try to exit the player form the maze
const path = await tryExitMaze(player.player, player.url_discover, player.url_move);

console.log("Player's path to exit the maze:", path);