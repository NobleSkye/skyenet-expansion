import type { ClientGame } from "./clientgame";
import { TextureAtlas, type TextureRegion } from "./textureatlas";

export class GameRenderer {
    private ctx;
    private display;
    private stars;
    private textureAtlas: TextureAtlas;
    
    constructor(ctx: CanvasRenderingContext2D, display: { startWidth: number, aspectRatio: number[], scale: number }, game: ClientGame) {
        this.ctx = ctx;
        this.display = display;
        this.stars = game.stars;
        
        // Option 1: Define atlas data inline
        const atlasData: Record<string, TextureRegion> = {
            "blue-ship": { x: 0, y: 0, width: 32, height: 32 },
            "red-ship": { x: 32, y: 0, width: 32, height: 32 },
            "green-ship": { x: 64, y: 0, width: 32, height: 32 },
            "bullet": { x: 0, y: 32, width: 8, height: 8 },
            "explosion-1": { x: 8, y: 32, width: 16, height: 16 },
            "explosion-2": { x: 24, y: 32, width: 16, height: 16 },
        };
        
        this.textureAtlas = new TextureAtlas("./src/assets/textures/spritesheet.webp", atlasData);
        
        // Option 2: Load from JSON file (uncomment to use)
        // this.initializeAtlasFromJSON();
    }
    
    // Alternative initialization method using JSON
    private async initializeAtlasFromJSON() {
        try {
            this.textureAtlas = await TextureAtlas.fromJSON(
                "./src/assets/textures/spritesheet.webp",
                "./src/assets/textures/atlas.json"
            );
        } catch (error) {
            console.error("Failed to load texture atlas:", error);
        }
    }
    
    public drawGame(game: ClientGame) {
        this.resize();
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, 10000, 10000);

        // Draw stars
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
        
        // Draw the ship from the texture atlas
        this.textureAtlas.drawTexture(
            this.ctx,
            "blue-ship",
            -16, // Center the 32x32 sprite
            -16
        );
        
        this.ctx.rotate((game.player.rotation * Math.PI) / 180);
        this.ctx.translate(-game.player.x, -game.player.y);
        this.ctx.translate(-game.camera.x, -game.camera.y);
        
        // Example: Draw bullets if they exist
        if (game.bullets) {
            for (const bullet of game.bullets) {
                this.ctx.translate(bullet.x, bullet.y);
                this.textureAtlas.drawTexture(
                    this.ctx,
                    "bullet",
                    -4, // Center the 8x8 bullet sprite
                    -4
                );
                this.ctx.translate(-bullet.x, -bullet.y);
            }
        }
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
