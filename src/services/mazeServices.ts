import { Discover } from "../data/models/Discover";
import { Player } from "../data/models/Player";
import { Coordinate } from "../data/models/Reference";
import {
  mapDiscoverResourceToDiscover,
  mapPlayerResourceToPlayer,
} from "../mapping/mappings";

export class MazeServices {
  private static readonly baseUrl: string =
    "https://hire-game-maze.pertimm.dev";
  public static async startGame(playerName: string): Promise<{
    player: Player;
    url_discover: string;
    url_move: string;
  }> {
    const formData = new FormData();
    formData.append("player", playerName);
    const res = await fetch(`${MazeServices.baseUrl}/start-game/`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Failed to start game: ${res.statusText}`);
    }

    const playerResource = await res.json();

    const player = mapPlayerResourceToPlayer(playerResource);

    return {
      player,
      url_discover: playerResource.url_discover,
      url_move: playerResource.url_move,
    };
  }

  public static async surroundsDiscover(
    discoverUrl: string
  ): Promise<Discover> {
    // ensure discoverUrl is a relative URL
    const pat = /^https?:\/\//i;
    const isAbsoluteUrl = pat.test(discoverUrl);

    const res = await fetch(
      isAbsoluteUrl ? discoverUrl : `${MazeServices.baseUrl}${discoverUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch discover: ${res.statusText}`);
    }

    const resources = await res.json();

    return mapDiscoverResourceToDiscover(resources);
  }

  public static async movePlayer(
    moveUrl: string,
    location: Coordinate
  ): Promise<Player> {
    // ensure moveUrl is a relative URL
    const pat = /^https?:\/\//i;
    const isAbsoluteUrl = pat.test(moveUrl);

    const formData = new FormData();
    formData.append("position_x", location.x.toString());
    formData.append("position_y", location.y.toString());
    const res = await fetch(
      isAbsoluteUrl ? moveUrl : `${MazeServices.baseUrl}${moveUrl}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Failed to move player: ${JSON.stringify(error)}`);
    }

    const resource = await res.json();

    if (
      resource.position_x !== location.x &&
      resource.position_y !== location.y
    ) {
      console.error(`Move error: ${res.statusText} - ${resource.message} - ${resource.dead}`);
      throw new Error(
        `Player moved to unexpected position: expected (${location.x}, ${location.y}), got (${resource.position_x}, ${resource.position_y})`
      );
    }

    return mapPlayerResourceToPlayer(resource);
  }
}
