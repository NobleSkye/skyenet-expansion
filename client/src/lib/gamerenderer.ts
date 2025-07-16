import type { ClientGame } from "./clientgame";
import { AtlasManager } from "./atlasmanager";

export class GameRenderer {
    private ctx;
    private display;
    private stars;
    private atlasManager: AtlasManager;
    
    constructor(ctx: CanvasRenderingContext2D, display: { startWidth: number, aspectRatio: number[], scale: number }, game: ClientGame) {
        this.ctx = ctx;
        this.display = display;
        this.stars = game.stars;
        
        // Initialize atlas manager
        this.atlasManager = new AtlasManager();
        this.loadAtlases();
    }

    private async loadAtlases() {
        try {
            console.log("Starting to load atlases...");
            
            // Load 32px atlas for ships and large objects
            await this.atlasManager.loadAtlas(
                "32px",
                "./src/assets/atlas/32px-atlas/spritesheet-32x.webp",
                "./src/assets/atlas/32px-atlas/atlas.json"
            );
            console.log("32px atlas loaded");

            // Load 16px atlas for bullets and small objects
            await this.atlasManager.loadAtlas(
                "16px",
                "./src/assets/atlas/16px-atlas/spritesheet-16x.webp",
                "./src/assets/atlas/16px-atlas/atlas.json"
            );
            console.log("16px atlas loaded");

            console.log("All atlases loaded successfully");
        } catch (error) {
            console.error("Failed to load atlases:", error);
            // Try fallback with different file extensions
            console.log("Trying fallback with .png extension...");
            try {
                await this.atlasManager.loadAtlas(
                    "32px",
                    "./src/assets/atlas/32px-atlas/spritesheet-32x.png",
                    "./src/assets/atlas/32px-atlas/atlas.json"
                );
                console.log("32px atlas loaded with PNG fallback");
            } catch (fallbackError) {
                console.error("Fallback also failed:", fallbackError);
            }
        }
    }
    public drawGame(game: ClientGame) {
        this.resize();
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "#000";
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
        
        // Draw player ship using texture atlas
        this.ctx.translate(game.camera.x, game.camera.y);
        this.ctx.translate(game.player.x, game.player.y);
        this.ctx.rotate(-((game.player.rotation * Math.PI) / 180));
        
        // Check if atlas is loaded before drawing
        if (this.atlasManager.areAllLoaded()) {
            this.atlasManager.drawTexture(
                "32px",
                "white-ship-engine", // This sprite exists in your atlas
                this.ctx,
                -16, // Center the 32x32 sprite
                -16
            );
        } else {
            // Fallback: draw a simple rectangle while atlas loads
            this.ctx.fillStyle = "#00ff00";
            this.ctx.fillRect(-16, -16, 32, 32);
        }
        
        this.ctx.rotate((game.player.rotation * Math.PI) / 180);
        this.ctx.translate(-game.player.x, -game.player.y);
        this.ctx.translate(-game.camera.x, -game.camera.y);
    }

    private resize() {
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height =
        (this.display.aspectRatio[1] * window.innerWidth) / this.display.aspectRatio[0];
      if (this.ctx.canvas.height > window.innerHeight) {
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.canvas.width =
          (this.display.aspectRatio[0] * window.innerHeight) / this.display.aspectRatio[1];
      }
        this.ctx.scale(
        this.ctx.canvas.width / this.display.startWidth,
        this.ctx.canvas.width / this.display.startWidth,
      );
      this.display.scale = this.ctx.canvas.width / this.display.startWidth;
    }
}