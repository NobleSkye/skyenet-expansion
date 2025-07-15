// import spaceship from "./sprites/spaceship.webp";
// import * as websocket from "./websocket";
import { KeyManager } from "./keyman.ts";
var keys = new KeyManager()

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
  keys.update()
  player.tick()
  drawGame();
}

function drawGame() {
  resize();
  ctx.fillRect(0, 0, 10000, 10000);
  ctx.translate(player.x,player.y)
  ctx.rotate(-(player.rotation * Math.PI / 180))
  ctx.drawImage(image,0-image.width/2,0-image.height/2)
  ctx.rotate(player.rotation * Math.PI / 180)
  ctx.translate(-player.x,-player.y)
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








var player = {
  x:0,
  y:500,
  velX:0,
  velY:0,
  rotation:0,
  velR:0,

  tick(){
    this.velocityChange()
    this.move()

  },
  velocityChange(){
    // if(keys.isKeyPressed("KeyW")){
    //   this.velY--
    // }
    // this.y+=this.velY
    
            if(keys.isKeyPressed("KeyW")){
                this.velY -= Math.cos(this.rotation * Math.PI /180)
                this.velX -= Math.sin(this.rotation * Math.PI /180)
            }
            if(keys.isKeyPressed("KeyS")){
                this.velY *= .90
                this.velX *= .90
                this.velR *= .90
            }
            if(keys.isKeyPressed("KeyA")){
                this.velR +=.1
            }
            if(keys.isKeyPressed("KeyD")){
                this.velR -=.1
            }

  },
  
    move(){
        this.y += this.velY
        this.x += this.velX
        this.rotation += this.velR
        this.velY *= .97
        this.velX *= .97
        this.velR *= .97
        if(this.rotation >= 360){
            this.rotation -= 360
        }
        if(this.rotation <= 0){
            this.rotation += 360
        }
    }
}

tick();
