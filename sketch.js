let cols;
let rows;
let previous;
let current;

let damping = 0.99;

function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
  
  //set variables to values
  cols = width;
  rows = height;
  //2D cols by rows array
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
}

function mouseDragged() {
  previous[mouseX][mouseY] = 500;
}

function draw() {
  
  background(0);
  loadPixels();
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      current[x][y] = 
        (previous[x-1][y] +
        previous[x+1][y] +
        previous[x][y-1] +
        previous[x][y+1]) /2 -
        current[x][y];
      current[x][y] = current[x][y] * damping;
      //4 colour entries
      let index = (x + y * cols) * 4;
      pixels[index+0] = current[x][y];
      pixels[index+1] = current[x][y];
      pixels[index+2] = current[x][y];
    }
  }
  

  updatePixels();

  let temp = previous;
  previous = current;
  current = temp;
}
