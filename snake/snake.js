class Snake {
  constructor(snakeSizeAsPixel) {
    console.log("create snake");
    this.x = 0;
    this.y = 0;
    this.size = snakeSizeAsPixel;
    this.currentDirection = "Right";
    this.xSpeed = this.size * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  get score() {
    return this.total;
  }

  // ctx should be defined previously.
  draw() {
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.size, this.size);
    }

    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updateAndCheckIfIsOver() {
    // shift tail to the left
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;

    this.y += this.ySpeed;

    this.x = (this.x + canvas.width) % canvas.width;
    this.y = (this.y + canvas.width) % canvas.height;

    // check if bite own tail
    return (
      this.tail.filter((t) => {
        return t.x == this.x && t.y == this.y;
      }).length > 0
    );
  }

  eat(fruit) {
    if (this.x == fruit.x && this.y == fruit.y) {
      this.total += 1;
      return true;
    }
    return false;
  }

  changeDirection(direction) {
    console.log(direction);
    if (this.currentDirection == direction) {
      return;
    }
    switch (direction) {
      case "Down":
        if (this.currentDirection === "Up") {
          return;
        }
        this.xSpeed = 0;
        this.ySpeed = this.size * 1;
        break;
      case "Up":
        if (this.currentDirection === "Down") {
          return;
        }
        this.xSpeed = 0;
        this.ySpeed = this.size * -1;
        break;
      case "Left":
        if (this.currentDirection === "Right") {
          return;
        }
        this.xSpeed = this.size * -1;
        this.ySpeed = 0;
        break;
      case "Right":
        if (this.currentDirection === "Left") {
          return;
        }
        this.xSpeed = this.size * 1;
        this.ySpeed = 0;
        break;
      default:
        break;
    }

    this.currentDirection = direction;
  }
}
