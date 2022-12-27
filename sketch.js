var ship;
var asteroids = [];
var lasers = [];
var thrustSound;
var laserSound;
var beat1Sound;
var beat2Sound;
var bangSmall;
var bangMedium;
var bangLarge;
var whichBeat = 1;




function preload() {
  thrustSound = loadSound('sounds/thrust.wav');
  laserSound = loadSound('sounds/fire.wav');
  beat1Sound = loadSound('sounds/beat1.wav')
  beat2Sound = loadSound('sounds/beat2.wav')
  bangSmall = loadSound('sounds/bangSmall.wav')
  bangMedium = loadSound('sounds/bangMedium.wav')
  bangLarge = loadSound('sounds/bangLarge.wav')
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

    if (ship.hits(asteroids[i])) {
      ship.dead();
      
      // break;
      
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i=lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();


    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {

      for (var j=asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 15) {
              var newAsteroids = asteroids[j].breakup();
              console.log(newAsteroids);
              asteroids = asteroids.concat(newAsteroids);
            }
            console.log(asteroids[j].r);
            
            
            if (asteroids[j].r < 15) {
              bangSmall.play();
            } else if (asteroids[j].r < 40) {
              bangMedium.play();
            } else {
              bangLarge.play();
            }


            asteroids.splice(j,1);
            lasers.splice(i,1);
            
            
            break;
          }
        }
      }

    }



  
    if (ship.stillAlive) {
      ship.render();
      ship.turn();
      ship.update();
      ship.edges();
    }

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
  if (ship.stillAlive) {
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

}

