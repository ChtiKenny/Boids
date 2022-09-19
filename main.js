/*jshint esversion: 6 */

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    mousePos = new Vector(),
    flock = [];
const WIDTH = canvas.width,
      HEIGHT = canvas.height;

function update() {
  let snapshoot = flock;
  ctx.fillStyle = '#111';
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  ctx.fillStyle = '#fff';
  for (let boid of flock) {
    boid.update(snapshoot);
    boid.show();
  }
}

function start() {
  for (let i = 0; i < 0; i++) {
    let x = Math.floor(Math.random() * WIDTH)  + 1,
        y = Math.floor(Math.random() * HEIGHT) + 1;
    flock.push(new Red(x,y));
  }
  for (let i = 0; i < 50; i++) {
    let x = Math.floor(Math.random() * WIDTH)  + 1,
        y = Math.floor(Math.random() * HEIGHT) + 1;
    flock.push(new Blue(x,y));
  }
  window.requestAnimationFrame(loop);
}

var loop = function() {
  update();

  window.requestAnimationFrame(loop);
};

start();
