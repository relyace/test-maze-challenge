import { Discover } from "../data/models/Discover";
import { Player } from "../data/models/Player";
import { Coordinate } from "../data/models/Reference";
import { CommonResource } from "../data/resources/Resources";
import {
  mapDiscoverResourceToDiscover,
  mapPlayerResourceToPlayer,
} from "../mapping/mappings";

export class MazeServices {
  private static readonly baseUrl: string = "https://example.com/api"; // Replace with your actual base URL

  public static async startGame(playerName: string): Promise<{
    player: Player;
    url_discover: string;
    url_move: string;
  }> {
    const res = await fetch(`${MazeServices.baseUrl}/start-game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player: playerName }),
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
  ): Promise<{
    player: Player;
    url_discover: string;
    url_move: string;
  }> {
    // ensure moveUrl is a relative URL
    const pat = /^https?:\/\//i;
    const isAbsoluteUrl = pat.test(moveUrl);

    const body = {
      position_x: location.x,
      position_y: location.y,
    };
    const res = await fetch(
      isAbsoluteUrl ? moveUrl : `${MazeServices.baseUrl}${moveUrl}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to move player: ${res.statusText}`);
    }

    const resource = await res.json();

    return {
      player: mapPlayerResourceToPlayer(resource.player),
      url_discover: resource.url_discover,
      url_move: resource.url_move,
    }
  }
}
