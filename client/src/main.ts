// import spaceship from "./sprites/spaceship.webp";
// import * as websocket from "./websocket";  aaa
import { imports } from "./lib/imports.ts";

var game = new imports()


var image = new Image(32,32);
image.src = "./src/sprites/spaceship.webp";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  </div>
`;
const canvas = document.getElementById("screen") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const display = { startWidth: 1280, aspectRatio: [16, 9], scale: 0 };

function tick() {
  requestAnimationFrame(tick);
  game.keys.update()
  game.player.tick()
  game.camera.tick()
  drawGame();
}

function drawGame() {
  resize();
  ctx.fillRect(0, 0, 10000, 10000);
  ctx.translate(game.camera.x,game.camera.y)
  ctx.translate(game.player.x,game.player.y)
  ctx.rotate(-(game.player.rotation * Math.PI / 180))
  ctx.drawImage(image,0-image.width/2,0-image.height/2)
  ctx.rotate(game.player.rotation * Math.PI / 180)
  ctx.translate(-game.player.x,-game.player.y)
  ctx.translate(-game.camera.x,-game.camera.y)
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height =
    (display.aspectRatio[1] * window.innerWidth) / display.aspectRatio[0];
  if (ctx.canvas.height > window.innerHeight) {
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width =
      (display.aspectRatio[0] * window.innerHeight) / display.aspectRatio[1];
  }
  ctx.scale(
    ctx.canvas.width / display.startWidth,
    ctx.canvas.width / display.startWidth,
  );
  display.scale = ctx.canvas.width / display.startWidth;
}









tick();
