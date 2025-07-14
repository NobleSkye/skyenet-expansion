
import spaceship from './sprites/spaceship.webp'
import * as websocket from './websocket';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  </div>
`
const canvas  = document.getElementById("screen") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

var display = {startWidth:1280, aspectRatio:[16,9], scale:0}


function tick(){
  requestAnimationFrame(tick)
  drawGame()
}

function drawGame(){
  resize()
  ctx.fillRect(0,0,10000,10000)
}

function resize(){
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = display.aspectRatio[1] * window.innerWidth / display.aspectRatio[0];
    if(ctx.canvas.height>window.innerHeight){
        ctx.canvas.height=window.innerHeight
        ctx.canvas.width = display.aspectRatio[0] * window.innerHeight / display.aspectRatio[1]
    }
    ctx.scale(ctx.canvas.width/display.startWidth,ctx.canvas.width/display.startWidth)
    display.scale=ctx.canvas.width/display.startWidth
}

tick()