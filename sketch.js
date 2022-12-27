function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    fill(0)
  }
  else {
    fill(255)
  }
  ellipse(mouseX, mouseY,80,80)
}
