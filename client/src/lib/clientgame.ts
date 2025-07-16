import { Player } from "./player.js";
import { KeyManager } from "./keyman.js";
import { Camera } from "./camera.js";
import type { Stars, Asteroids } from "../../../core/src/types.js";

export class ClientGame {
  public keys = new KeyManager();
  public player = new Player(this) as Player;
  public camera = new Camera(this);
  public stars: Stars;
  public asteroids: Asteroids;
  constructor() {
    // spawn stars
    const stars: Stars = [];
    for (let i = 0; i < 50; i++) {
      stars[i] = {
        x: -30 + Math.random() * 1330,
        y: -30 + Math.random() * 770,
        z: 5 + Math.random() * 4,
      };
    }
    this.stars = stars;

    // spawn asteroids near the player
    const asteroids: Asteroids = [];
    const playerX = 500; // Player's starting X position
    const playerY = 500; // Player's starting Y position
    const spawnRadius = 400; // Spawn asteroids within this radius of player

    for (let i = 0; i < 15; i++) {
      // Increased to 15 asteroids for more encounters
      // Generate random angle and distance from player
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spawnRadius + 100; // Minimum 100px away from player

      asteroids[i] = {
        x: playerX + Math.cos(angle) * distance,
        y: playerY + Math.sin(angle) * distance,
        velX: (Math.random() - 0.5) * 0.8, // Slightly faster velocity for more dynamic movement
        velY: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        size: 0.8 + Math.random() * 0.4, // Random size between 0.8 and 1.2
      };
    }
    this.asteroids = asteroids;
  }

  public updateAsteroids() {
    // Update asteroid positions and rotation
    for (let i = 0; i < this.asteroids.length; i++) {
      const asteroid = this.asteroids[i];
      asteroid.x += asteroid.velX;
      asteroid.y += asteroid.velY;
      asteroid.rotation += 0.5; // Slow rotation

      // Check if asteroid is too far from player (respawn near player)
      const distanceFromPlayer = Math.sqrt(
        Math.pow(asteroid.x - this.player.x, 2) +
          Math.pow(asteroid.y - this.player.y, 2),
      );

      if (distanceFromPlayer > 800) {
        // If asteroid is more than 800px from player
        // Respawn near player
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 400 + 200; // Spawn 200-600px from player

        asteroid.x = this.player.x + Math.cos(angle) * distance;
        asteroid.y = this.player.y + Math.sin(angle) * distance;
        asteroid.velX = (Math.random() - 0.5) * 0.8;
        asteroid.velY = (Math.random() - 0.5) * 0.8;
        asteroid.rotation = Math.random() * 360;
        asteroid.size = 0.8 + Math.random() * 0.4;
      }
    }
  }
}
