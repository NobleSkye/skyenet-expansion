import type { ClientGame } from "./clientgame";
import { AtlasManager } from "./atlasmanager";

export class GameRenderer {
  private ctx;
  private display;
  private stars;
  private atlasManager: AtlasManager;

  constructor(
    ctx: CanvasRenderingContext2D,
    display: { startWidth: number; aspectRatio: number[]; scale: number },
    game: ClientGame,
    atlasManager: AtlasManager,
  ) {
    this.ctx = ctx;
    this.display = display;
    this.stars = game.stars;
    this.atlasManager = atlasManager;
  }

  public drawGame(game: ClientGame) {
    this.resize();
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = "#03050cff";
    this.ctx.fillRect(0, 0, 10000, 10000);

    this.ctx.fillStyle = "#fff";
    for (let i = 0; i < this.stars.length; i++) {
      if (this.stars[i].x + game.camera.x / this.stars[i].z > 1300) {
        this.stars[i].x -= 1330;
      }
      if (this.stars[i].x + game.camera.x / this.stars[i].z < -30) {
        this.stars[i].x += 1330;
      }
      if (this.stars[i].y + game.camera.y / this.stars[i].z > 740) {
        this.stars[i].y -= 770;
      }
      if (this.stars[i].y + game.camera.y / this.stars[i].z < -30) {
        this.stars[i].y += 770;
      }
      this.ctx.fillRect(
        this.stars[i].x + game.camera.x / this.stars[i].z,
        this.stars[i].y + game.camera.y / this.stars[i].z,
        10 - this.stars[i].z,
        10 - this.stars[i].z,
      );
    }

    // Update and draw asteroids
    game.updateAsteroids();

    if (this.atlasManager.areAllLoaded()) {
      for (let i = 0; i < game.asteroids.length; i++) {
        const asteroid = game.asteroids[i];

        // Save context
        this.ctx.save();

        // Transform to asteroid position
        this.ctx.translate(
          asteroid.x + game.camera.x,
          asteroid.y + game.camera.y,
        );
        this.ctx.rotate((asteroid.rotation * Math.PI) / 180);
        this.ctx.scale(asteroid.size, asteroid.size);

        // Draw asteroid
        this.atlasManager.drawTexture(
          "entities",
          "asteroid",
          this.ctx,
          -16, // Center the 32x32 sprite
          -16,
        );

        // Restore context
        this.ctx.restore();
      }
    } else {
      // Fallback: draw simple circles for asteroids
      this.ctx.fillStyle = "#666666";
      for (let i = 0; i < game.asteroids.length; i++) {
        const asteroid = game.asteroids[i];
        this.ctx.beginPath();
        this.ctx.arc(
          asteroid.x + game.camera.x,
          asteroid.y + game.camera.y,
          16 * asteroid.size,
          0,
          2 * Math.PI,
        );
        this.ctx.fill();
      }
    }

    // Draw player ship using texture atlas
    this.ctx.translate(game.camera.x, game.camera.y);
    // console.log(game.players)
    for(let i = 0; i < game.players.length;i++){
      for(let a = 0; a < game.players[i].flames.length;a++){
        this.ctx.translate(game.players[i].flames[a].x, game.players[i].flames[a].y);
        this.ctx.fillRect(0,0,5,5);
        this.ctx.translate(-game.players[i].flames[a].x, -game.players[i].flames[a].y);

      }

      this.ctx.translate(game.players[i].x, game.players[i].y);
      this.ctx.rotate(-((game.players[i].rotation * Math.PI) / 180));

      // Apply 3  x scale for player ship
      this.ctx.scale(3, 3);

      // Check if atlas is loaded before drawing
      if (this.atlasManager.areAllLoaded()) {
        // Choose texture based on engine state and selected ship
        // const shipTexture = game.players[i].engineActive
        //   ? game.players[i].shipEngineSprite
        //   : game.players[i].shipSprite;
        const shipTexture = game.players[i].shipSprite;

        this.atlasManager.drawTexture(
          "entities",
          shipTexture,
          this.ctx,
          -16, // Center the 32x32 sprite
          -16,
        );
      } else {
        // Fallback: draw a simple rectangle while atlas loads
        console.log("Atlas not loaded, showing green rectangle");
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(-16, -16, 32, 32);
      }

      // Reset scale after drawing
      this.ctx.scale(0.5, 0.5);

      this.ctx.rotate((game.player.rotation * Math.PI) / 180);
      this.ctx.translate(-game.player.x, -game.player.y);

    }
    this.ctx.translate(-game.camera.x, -game.camera.y);
  }

  private resize() {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height =
      (this.display.aspectRatio[1] * window.innerWidth) /
      this.display.aspectRatio[0];
    if (this.ctx.canvas.height > window.innerHeight) {
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.canvas.width =
        (this.display.aspectRatio[0] * window.innerHeight) /
        this.display.aspectRatio[1];
    }
    this.ctx.scale(
      this.ctx.canvas.width / this.display.startWidth,
      this.ctx.canvas.width / this.display.startWidth,
    );
    this.display.scale = this.ctx.canvas.width / this.display.startWidth;
  }
}
