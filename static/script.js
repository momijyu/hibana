let fireworks = [];
let gravity;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');

  colorMode(HSB, 360, 255, 255, 255);
  gravity = createVector(0, 0.2); 
  background(0);
}

function draw() {
  background(0, 0, 0, 25); 

  if (random(1) < 0.103) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Firework {
  constructor() {
    this.hu = random(360);
    this.hu2 = (this.hu + random(90, 270)) % 360;
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= -0.5) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    // 爆発する火花の量
    let numParticles = random(750, 1000);

    for (let i = 0; i < numParticles; i++) {
      let isLeft = i % 2 === 0;
      let x = this.firework.pos.x;
      let color = isLeft ? this.hu : this.hu2;
      let p = new Particle(x, this.firework.pos.y, color, false);
      this.particles.push(p);
    }
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}

class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;

    if (this.firework) {
      let targetHeight = random(height * 0.5, height * 0.8);
      let initialSpeed = -sqrt(2 * 0.2 * targetHeight);
      
      this.vel = createVector(random(-1, 1), initialSpeed);
    } else {
      this.vel = p5.Vector.random2D();
      // 爆発の広がりの大きさ
      this.vel.mult(random(2, 20)); 
    }
    this.acc = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.93); 
      this.lifespan -= 4;  
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    if (!this.firework) {
      strokeWeight(random(1, 3.5));
      let flicker = random(1) > 0.15 ? this.lifespan : 0;
      stroke(this.hu, 200, 255, flicker);
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}