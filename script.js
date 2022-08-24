const ctx = document.querySelector("canvas").getContext("2d");
const angle = document.querySelector("#angle");

const launch = document.querySelector("#launch");

class Launcher {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


class Ball {
  constructor(x, y, radius, speed, color, direction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = {
      x: Math.cos(direction) * speed,
      y: Math.sin(direction) * speed,
    }
  }
  move() {
    this.x += this.speed.x;
    this.speed.y += 0.5;
    this.y += this.speed.y;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

class Target {
  constructor(x, width, height, color) {
    this.x = x;
    this.y = Math.floor(Math.random() * (ctx.canvas.height - height));
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * 
   * @param {Ball} ball 
   * @returns 
   */
  detectCollision(ball) {
    return (
      ball.x + ball.radius > this.x && ball.y > this.y && ball.y < this.y + this.height
    );
  }
}

const launcher = new Launcher(40, 190, 20, 20);
launcher.draw();

const target = new Target(ctx.canvas.width - 10, 10, 70, "green");

ctx.fillStyle = "red";
ctx.fillRect(ctx.canvas.width - target.width, 0, target.width, ctx.canvas.height);

target.draw();

launch.addEventListener("click", () => {
  const ball = new Ball(80, 190, 10, 20, "red", (angle.value - 90) * Math.PI / 180);
  interval = setInterval(() => {
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = "red";
    ctx.fillRect(ctx.canvas.width - target.width, 0, target.width, ctx.canvas.height);
    launcher.draw();
    ball.move();
    ball.draw();
    target.draw();
    if(ball.y > 400) {
      alert("You lose");
      clearInterval(interval);
      location.reload();
    }

    if(ball.x > 400) {
      alert("You lose");
      clearInterval(interval);
      location.reload();
    }
    if(target.detectCollision(ball)) {
      alert("You win");
      clearInterval(interval);
      location.reload();
    }
  }, 1000 / 60);
});

window.addEventListener("keydown", (e) => {
  if(e.key === "ArrowUp") {
    e.preventDefault();
    angle.value = parseInt(angle.value) - 5;
  } else if(e.key === "ArrowDown") {
    e.preventDefault();
    angle.value = parseInt(angle.value) + 5;
  } else if(e.key === "Enter") {
    e.preventDefault();
    launch.click();
  }

  document.querySelector("#degrees").innerHTML = angle.value + "°";
});

angle.addEventListener("input", function() {
  document.querySelector("#degrees").innerHTML = angle.value + "°";
});