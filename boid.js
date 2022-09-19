/*jshint esversion: 6 */
// TODO: snapshoot vel
//       optimization
//       interface
//       view field
class Boid {
  constructor(x,y) {

    this.pos = new Vector(x,y);
    this.vel = Vector.random2D();
    this.vel.setMag(4);
    this.acc = new Vector();

    this.r = 4;
    this.perception = 50;
    this.maxForce  = 0.1;
    this.maxSpeed  = 2;
    this.minSpeed  = 0.5;

    this.scale = {
      separ:1,
      cohes:0.8,
      align:1
    };

    this.color = 'rgba(255,255,255,0.7)';
  }
  edges(){
    if (this.pos.x > WIDTH) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = WIDTH;
    }
    if (this.pos.y > HEIGHT) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = HEIGHT;
    }
  }
  detect(boids){
    let detected = [];
    for (let other of boids) {
      let d = Vector.dist(this.pos, other.pos);
      if (other !=this && d < this.perception) {
        detected.push(other);
      }
    }
    return detected;
  }
  align(boids){
    let avg = new Vector();
    for (let other of boids) {
      avg.add(other.vel);
    }
    avg.div(boids.length);
    avg.setMag(this.maxSpeed);
    avg.sub(this.vel);
    avg.limit(this.maxForce);
    return avg;
  }
  cohes(boids){
    let avg = new Vector();
    for (let other of boids) {
      avg.add(other.pos);
    }
    avg.div(boids.length);
    avg.sub(this.pos);
    avg.setMag(this.maxSpeed);
    avg.sub(this.vel);
    avg.limit(this.maxForce);
    return avg;
  }
  separ(boids){
    let avg = new Vector();
    for (let other of boids) {
      let diff = Vector.sub(this.pos, other.pos);
      let d = Vector.dist(this.pos, other.pos);
      diff.mult(1/(d*d));
      avg.add(diff);
    }
    avg.div(boids.length);
    avg.setMag(this.maxSpeed);
    avg.sub(this.vel);
    avg.limit(this.maxForce);
    return avg;
  }
  update(boids){
    this.edges();
    let local = this.detect(boids);
    if (local.length > 0) {
      this.acc.add(this.align(local).mult(this.scale.align));
      this.acc.add(this.cohes(local).mult(this.scale.cohes));
      this.acc.add(this.separ(local).mult(this.scale.separ));
    }
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    if (this.vel.mag() < this.minSpeed) {
      this.vel.setMag(this.minSpeed);
    }
    this.acc.set();
  }
  show(){
    ctx.fillStyle = this.color;
    let vertex =  [
      Vector.fromAngle(this.vel.heading(),this.r*2),
      Vector.fromAngle(this.vel.heading()+2,this.r),
      Vector.fromAngle(this.vel.heading()-2,this.r)
    ];

    ctx.beginPath();
    for (var i = 0; i <vertex.length; i++) {
      if (i == 0) {
        ctx.moveTo(this.pos.x +vertex[i].x, this.pos.y +vertex[i].y);
      } else {
        ctx.lineTo(this.pos.x +vertex[i].x, this.pos.y +vertex[i].y);
      }
    }
    ctx.fill();
    ctx.stroke();
  }
}
class Blue extends Boid {
  constructor(x,y) {
    super(x,y);

    this.perception += -10;
    this.maxForce   += 0.01;
    this.maxSpeed   += -0.5;
    this.color = 'rgba(100,100,255,0.5)';
    this.r = 4;
    this.scale.separ += 0.5;
  }
  detect(boids){
    let detected = [];
    for (let other of boids) {
      let d = Vector.dist(this.pos, other.pos);
      if (other !=this && d < this.perception && other instanceof Blue) {
        detected.push(other);
      }
    }
    return detected;
  }
  detectPred(boids){
    let detected = [];
    for (let other of boids) {
      let d = Vector.dist(this.pos, other.pos);
      if (other !=this && d < this.perception && !(other instanceof Blue)) {
        detected.push(other);
      }
    }
    return detected;
  }
  update(boids){
    super.update(boids);
    let predator = this.detectPred(boids);
    if (predator.length > 0) {
      this.acc.add(this.separ(predator).mult(this.scale.separ * 1.01));
    }
  }
}
class Red extends Boid {
  constructor(x,y) {
    super(x,y);

    this.perception += 10;
    this.maxForce   += -0.05;
    this.maxSpeed   += 0.1;
    this.color = 'rgba(255,50,50,0.7)';
    this.r = 5;
    this.scale.separ += 1;
    this.scale.align += -0.2;
  }
  detect(boids){
    let detected = [];
    for (let other of boids) {
      let d = Vector.dist(this.pos, other.pos);
      if (other !=this && d < this.perception && other instanceof Red) {
        detected.push(other);
      }
    }
    return detected;
  }
  update(boids){
    super.update(boids);
  }
}
