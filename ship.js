function Ship() {
    this.pos = createVector(width/2, height/2)
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0,0);
    this.isBoosting = false;
    this.stillAlive = true;
    this.deadPlayed = false;
  
    this.boosting = function(b) {
      this.isBoosting = b;
  
    }
  
  
    this.update = function() {

        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.95);

    }
  
    this.boost = function() {
      var force = p5.Vector.fromAngle(this.heading);
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
        
    }


  
    this.render = function() {   
        if (this.stillAlive) {
        
            push();
            
            fill(0);
            stroke(255);
            
            translate(this.pos.x, this.pos.y);
            rotate(this.heading + PI/2);

            
            if (this.isBoosting) {
                ellipse(0, this.r, this.r/2, this.r*2);
                // ellipse(-this.r/5, this.r, this.r/2, this.r*2);
                // ellipse(this.r/5, this.r, this.r/2, this.r*2);
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
  