/*jshint esversion: 6 */
class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  toString(){
    return 'Vector Object : [' + this.x + ', ' + this.y + ', ' + ']';
  }
  set(x, y) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      return this;
    }
    this.x = x || 0;
    this.y = y || 0;
    return this;
  }
  copy(){
    return new Vector(this.x, this.y);
  }
  add(x, y) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    return this;
  }
  sub(x, y) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    return this;
  }
  mult(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.mult:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    this.x *= n;
    this.y *= n;
    return this;
  }
  div(n){
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.div:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    if (n === 0) {
      console.warn('Vector.div:', 'divide by 0');
      return this;
    }
    this.x /= n;
    this.y /= n;
    return this;
  }
  setMag(n){
    return this.normalize().mult(n);
  }
  mag(){
    return Math.sqrt(this.magSq());
  }
  magSq(){
    return (this.x * this.x + this.y * this.y);
  }
  dot(x, y) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y);
    }
    return this.x * (x || 0) + this.y * (y || 0);
  }
  dist(v) {
    return v
      .copy()
      .sub(this)
      .mag();
  }
  normalize(){
    let len = this.mag();
    if (len !== 0) this.mult(1/len);
    return this;
  }
  limit(max){
    let mSq = this.magSq();
    if (mSq > max*max) {
      this.div(Math.sqrt(mSq)).mult(max);
    }
    return this;
  }
  heading() {
    return Math.atan2(this.y, this.x);
  }
  rotate(a) {
    var newHeading = this.heading() + a;
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }
  angleBetween(v) {
    var angle = Math.acos(
      Math.min(
        1,
        Math.max(
          -1, this.dot(v) /
          (this.mag() *
          v.mag())
        )
      )
    );
    return angle;
  }
  lerp(x, y, amt) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, y);
    }
    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    return this;
  }
  array() {
    return [this.x || 0, this.y || 0];
  }
  equals(x, y) {
    var a, b;
    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
    } else {
      a = x || 0;
      b = y || 0;
    }
    return this.x === a && this.y === b;
  }

  // Static Methods
  static fromAngle(angle, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle));
  }
  static random2D() {
    return this.fromAngle(Math.random() * Math.PI * 2);
  }
  static add(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.add(v2);
    return target;
  }
  static sub(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.sub(v2);
    return target;
  }
  static mult(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.mult(n);
    return target;
  }
  static div(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.div(n);
    return target;
  }
  static  dot(v1, v2) {
    return v1.dot(v2);
  }
  static dist(v1, v2) {
    return v1.dist(v2);
  }
  static lerp(v1, v2, amt, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.lerp(v2, amt);
    return target;
  }
  static  mag(vecT) {
    var x = vecT.x,
        y = vecT.y;
    var magSq = x * x + y * y;
    return Math.sqrt(magSq);
  }
}
