export interface CommonResource {
  message?: string;
  url_move: string; // URL to move the player
  url_discover: string; // URL to discover a new case
}

export interface PlayerResource extends CommonResource {
  player: string; // this will be the player's name
  position_x: number; // x coordinate
  position_y: number; // y coordinate
  dead: boolean; // is the player dead?
  win: boolean; // has the player won?
}

export interface CaseResource {
  x: number; // x coordinate of the case
  y: number; // y coordinate of the case
  move: boolean;
  value: "wall" | "path" | "trap" | "home" | "stop";
}