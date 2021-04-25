function Fruit(scale) {
  this.scale = scale;
  this.x;
  this.y;

  this.pickLocation = function () {
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  };

  // Fruits
  const fruitImage = new Image(this.scale, this.scale); // Using optional size for image
  // fruitImage.onload = drawImageActualSize; // Draw when image has loaded
  // Load an image of intrinsic size 300x227 in CSS pixels
  fruitImage.src = 'pineapple.png';
  
  this.draw = function () {
    ctx.fillStyle = "#ca4268";
    ctx.fillRect(this.x, this.y, this.scale, this.scale);
    
    // Wall
    ctx.strokeRect(this.x - this.scale, this.y - this.scale, this.scale * 3, this.scale * 2);
    
    // Door
    ctx.strokeRect(this.x, this.y, this.scale, this.scale);
    
    // Roof
    ctx.beginPath();
    ctx.moveTo(this.x - this.scale * 2, this.y - this.scale);
    ctx.lineTo(this.x + this.scale * 0.7, this.y - this.scale * 3);
    ctx.lineTo(this.x + this.scale * 3, this.y - this.scale);
    ctx.closePath();
    ctx.stroke();
    
  };
  
  function pineappleDraw() {
    ctx.drawImage(this, this.x, this.y, this.scale, this.scale);
  }
  
  fruitImage.onload = pineappleDraw;

  this.pickLocation();
}

