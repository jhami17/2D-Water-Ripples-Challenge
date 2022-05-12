let cols;
let rows;
//two arrays of words (integers)
//one holds the current state of water
let current;
//one hold the previous state of water
let previous;

//some non-integer between 0 and 1
let damping = 0.995;

function setup() {
  pixelDensity(1);
  createCanvas(600,400);
  //create background with columns and rows
  cols = width;
  rows = height;
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
}
var sceneNum = 0;

function scene0() {
  
  sceneNum = 0;
  background(10, 150, 300);
  fill(255);
  textSize(30);
  text("2D Water Ripples", 175, 100);
  textSize(15);
  text("Press the space bar to view the simulation", 175, 150);
  text("Press 'r' to change suck the ripples back", 175, 180);
  
}

function pinkRips() {
  
  //for every non-edge element, loop through:
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      current[x][y] = (
        previous[x-1][y] + 
        previous[x+1][y] +
        previous[x][y-1] + 
        previous[x][y+1]) / 1.999 - 
        current[x][y];
      current[x][y] = current[x][y] * damping;
      let index = (x + y * cols) * 4
          pixels[index + 0] = current[x][y];
          pixels[index + 1] = current[x][y+1];
          pixels[index + 2] = current[x][y-1];
    }
  }
}

function whiteRips() {
  
  //for every non-edge element, loop through:
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      current[x][y] = (
        previous[x-1][y] + 
        previous[x+1][y] +
        previous[x][y-1] + 
        previous[x][y+1]) / 1.999 - 
        current[x][y];
      current[x][y] = current[x][y] * damping;
      let index = (x + y * cols) * 4
          pixels[index + 0] = current[x][y];
          pixels[index + 1] = current[x][y];
          pixels[index + 2] = current[x][y];
    }
  }
  
}

function scene1() {
  sceneNum = 1
  //square pixels arranged in columns and rows
  loadPixels();
  /*//for every non-edge element, loop through:
  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      current[x][y] = (
        previous[x-1][y] + 
        previous[x+1][y] +
        previous[x][y-1] + 
        previous[x][y+1]) / 1.999 - 
        current[x][y];
      current[x][y] = current[x][y] * damping;
      let index = (x + y * cols) * 4
          pixels[index + 0] = current[x][y];
          pixels[index + 1] = current[x][y+1];
          pixels[index + 2] = current[x][y-1];
    }
  }*/
  
  updatePixels();
  
  let temp = previous;
  previous = current;
  current = temp;
  
  //buttons
  fill(0);
  rect(7, 10, 60, 20);
  fill(255);
  text("Intensity", 10, 23);
  fill(0);
  rect(10, 30, 25, 25);
  fill(255);
  text("▲", 15, 45);
  fill(0);
  rect(10, 70, 25, 25);
  fill(255);
  text("▼", 15, 85);
  
  fill(0);
  rect(width - 50, 5, 40, 20);
  fill(300, 150, 200);
  text("pink", width - 45, 20)
  }



function keyPressed() {
  
  if (keyCode === 32 && sceneNum === 0) {
    sceneNum = 1;
  } else if (keyCode === 32 && sceneNum === 1) {
    sceneNum = 0;
  }
   if (keyCode === 82) {
      for (let x = 1; x < cols - 1; x++) {
        for (let y = 1; y < rows - 1; y++) {
          current[x][y] = (
            previous[x-1][y] + 
            previous[x+1][y] +
            previous[x][y-1] + 
            previous[x][y+1]) / 1.999 - 
            current[x][y];
          current[x][y] = current[x][y] * damping;
              let index = (x + y * cols) * 4
              pixels[index + 0] = current[x][y];
              pixels[index + 1] = current[x][y];
              pixels[index + 2] = current[x][y];
         }
      }
    }
}


function mouseDragged() {
  if (sceneNum === 1) {
    previous[mouseX][mouseY] = 600;
  }
}

function mouseClicked() {
  
  if (mouseX >= 10 && mouseX <= 30 && mouseY >= 35 && mouseY <= 50) {
    damping += 0.001;
  } else if (mouseX >= 10 && mouseX <= 30 && mouseY >= 75 && mouseY <= 90) {
    damping -= 0.005;
  }
  if (mouseX >= width - 50 && mouseX <= width - 10 && mouseY >= 5 && mouseY <= 25) {
    pinkRips();
  } else {
    whiteRips();
  }
}

function draw() {

  if (sceneNum === 0) {
    scene0();
  }
  if (sceneNum === 1) {
    scene1();
  }
}
