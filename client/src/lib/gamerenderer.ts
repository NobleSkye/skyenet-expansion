import type { ClientGame } from "./clientgame";

export class GameRenderer {
    private ctx;
    private display;
    private stars;
    constructor(ctx: CanvasRenderingContext2D, display: { startWidth: number, aspectRatio: number[], scale: number }, game: ClientGame) {
        this.ctx = ctx;
        this.display = display;
        this.stars = game.stars;
    }
    public drawGame(game: ClientGame) {
        const spaceshipImg = new Image(32, 32);
        spaceshipImg.src = "./src/sprites/spaceship.webp";
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
        this.ctx.translate(game.camera.x, game.camera.y);
        this.ctx.translate(game.player.x, game.player.y);
        this.ctx.rotate(-((game.player.rotation * Math.PI) / 180));
        this.ctx.drawImage(spaceshipImg, 0 - spaceshipImg.width / 2, 0 - spaceshipImg.height / 2);
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