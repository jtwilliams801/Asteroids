function Ship() {
    this.pos = createVector(width/2, height/2)
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isBoosting = false;
    this.boostdir = 0;
    this.stillAlive = true;
    this.deadPlayed = false;
  
    this.boosting = function(b, bdir) {
      console.log(bdir);
      this.isBoosting = b;
      if (bdir == false) {
        this.boostdir = PI;
      } else {
        this.boostdir = 0;
      }
    }
  
  
    this.update = function() {

        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.95);

    }
  
    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading + this.boostdir);
      
      this.vel.add(force);
  
      if (!thrustSound.isPlaying()){
        thrustSound.play();
      }
    }


    this.dead = function() {
        this.stillAlive = false;

        if (!this.deadPlayed){
            bangLarge.play();
            this.deadPlayed = true;
        }


        fill(0);
        stroke(255); 
        for(i = 0; i < 10; i++) {
          circle(ship.pos.x, ship.pos.y, random(10, 50));
        }
        


    }


  
    this.render = function() {   
        if (this.stillAlive) {
        
            push();
            
            fill(0);
            stroke(255);            
            translate(this.pos.x, this.pos.y);
            rotate(this.heading + PI/2);
            
            if (this.isBoosting && this.boostdir == 0) {
                ellipse(0, this.r, this.r/2, this.r*2);
                // ellipse(-this.r/5, this.r, this.r/2, this.r*2);
                // ellipse(this.r/5, this.r, this.r/2, this.r*2);
            } else if (this.isBoosting && this.boostdir == PI) {
              ellipse(0, 0, this.r);
            }

            triangle(-this.r/2, this.r, this.r/2, this.r, 0, -this.r)

            pop();
        }
    }
  
    this.edges = function() {
      if(this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
  
      if(this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    }
  
    this.setRotation = function(a) {
      this.rotation = a;
    }
  
    this.turn = function(angle) {
      this.heading += this.rotation;
    }
  
    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r - 3) {
            return true;
        } else {
            return false;
        }
    }
  
  }
  