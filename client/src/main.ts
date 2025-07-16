import { ClientGame } from "./lib/clientgame.ts";
import { GameRenderer } from "./lib/gamerenderer.ts";

const game = new ClientGame();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
  </div>
`;
const canvas = document.getElementById("screen") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const display = { startWidth: 1280, aspectRatio: [16, 9], scale: 0 };
const renderer = new GameRenderer(ctx, display, game);

function tick() {
  requestAnimationFrame(tick);
  game.keys.update();
  game.player.tick();
  game.camera.tick();
  renderer.drawGame(game);
}

tick();
