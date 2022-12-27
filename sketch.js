var ship;
var asteroids = [];
var lasers = [];
var thrustSound;
var laserSound;
var beat1Sound;
var beat2Sound;
var whichBeat = 1;




function preload() {
  thrustSound = loadSound('sounds/thrust.wav');
  laserSound = loadSound('sounds/fire.wav');
  beat1Sound = loadSound('sounds/beat1.wav')
  beat2Sound = loadSound('sounds/beat2.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i=0; i<10;i++) {
    asteroids.push(new Asteroid());
  }


}

function draw() {
  background(0);


  if (frameCount % 70 == 0) {
    if (whichBeat == 2) {
      beat1Sound.play();
      whichBeat = 1
    }
    else if (whichBeat == 1) {
      beat2Sound.play();
      whichBeat = 2;
    }
    
  }

  for (var i=0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i=0; i < lasers.length; i++) {
    lasers[i].render();
    lasers[i].update();
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

}

function keyReleased() {
  
  if (keyCode == UP_ARROW) {
    ship.boosting(false);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(0);
  } else if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0);
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode = 32) {
    lasers.push(new Laser(ship.pos, ship.heading));
  }

}

