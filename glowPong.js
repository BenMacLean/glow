console.log("JS is loading");


var WIDTH = 700, HEIGHT=600, pi=Math.PI;
var UpArrow = 38
var DownArrow = 40
var canvas, ctx, keystate;
var player, ai, ball;

player = {
  x:null,
  y:null,
  width: 20,
  height: 100,

  update: function() {
    console.log("playerUpdateFunction Loading");
    if (keystate[UpArrow]) this.y -= 7;
    if (keystate[DownArrow]) this.y += 7;
  },
  draw: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
};

ai = {
  x:null,
  y:null,
  width: 20,
  height: 100,

  update: function() {},
  draw: function() {
    console.log("aiDrawFunction Loading");
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
};

ball = {
  x:null,
  y:null,
  vel:null,
  side: 20,
  speed: 5,

  update: function() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    if (0 > this.y || this. y+ this.side > HEIGHT) {
      var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
      this.y += 2 * offset;
      this.vel.y *= -1;
    }
  },
  draw: function() {
    console.log("drawFunction Loading");
    ctx.fillRect(this.x, this.y, this.side, this.side)
  }
};

function main() {
  console.log("mainFunction Loading");
  canvas = document.createElement("canvas")
  canvas.width = WIDTH
  canvas.height= HEIGHT
  ctx = canvas.getContext("2d")
  document.body.appendChild(canvas);

  keystate = {};
  document.addEventListener("keydown", function(evt){
    keystate[evt.keyCode] = true;
  });
  document.addEventListener("keyup", function(evt) {
    delete keystate[evt.keyCode];
  });
  init();

  var loop = function(){
    console.log("loopFunction Loading");
    update();
    draw();

    window.requestAnimationFrame(loop, canvas)
  };
  window.requestAnimationFrame(loop, canvas);
}

function init() {
  console.log("initFunction Loading");
  player.x = player.width;
  player.y = (HEIGHT - player.height)/2;

  ai.x = WIDTH - (player.width + ai.width);
  ai.y = (HEIGHT - ai.height)/2;

  ball.x = (WIDTH - ball.side)/2;
  ball.y = (HEIGHT - ball.side)/2;

  ball.vel = {
    x:0,
    y: ball.speed
  }
}

function update() {
  console.log("functionUpdateFunction Loading");
  ball.update()
  player.update()
  ai.update()
}

function draw() {
  console.log("functionDrawFunction Loading");
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.save();
  ctx.fillStyle = "#fff";

  ball.draw();
  player.draw();
  ai.draw();

  var w = 4;
  var x = (WIDTH - w)*0.5;
  var y = 0;
  var step = HEIGHT/15;
  while (y < HEIGHT) {
    ctx.fillRect(x, y + step * 0.45, w, step * 0.1)
    y += step;
  }

  ctx.restore();
}

main()
