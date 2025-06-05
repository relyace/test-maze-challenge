import { Coordinate } from "../data/models/Reference";

function getMazeDimensions(path: Coordinate[]): {
  width: number;
  height: number;
} {
  let width = 0;
  let height = 0;
  path.forEach((coord) => {
    if (coord.x > width) width = coord.x;
    if (coord.y > height) height = coord.y;
  });
  return { width, height };
}

export function drawMazePath(path: Coordinate[]): void {
  console.log("Drawing maze path...");
  console.log("# is the path, . is empty space or walls");

  const { width, height } = getMazeDimensions(path);
  // Create empty maze
  const maze: string[][] = Array.from({ length: height }, () =>
    Array(width).fill(".")
  );

  // Mark the path
  path.forEach((coord) => {
    // Adjust for 0-based array indices
    maze[coord.y - 1][coord.x - 1] = "#";
  });

  // Print column headers
  let header = "   ";
  for (let x = 1; x <= width; x++) {
    header += (x < 10 ? " " : "") + x + " ";
  }
  console.log(header);

  // Print each row
  for (let y = 0; y < height; y++) {
    let row = (y + 1 < 10 ? " " : "") + (y + 1) + " ";
    row += maze[y].map((cell) => ` ${cell} `).join("");
    console.log(row);
  }
}
