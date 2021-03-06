const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "black";

const ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
ctx.lineJoin = "bevel";

// ctx.fillStyle = "red";
// ctx.fillRect(100, 100, 100, 100);

let prevX = null;
let prevY = null;
let draw = false;

let clrs = document.querySelectorAll('.clr');
clrs = Array.from(clrs);
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = "bevel";

clrs.forEach(clr => {
  clr.addEventListener("click", () => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = clr.dataset.clr;
  });
});

document.querySelector('.ersr').addEventListener('click', () => {
  ctx.lineWidth = 30;
  ctx.strokeStyle = canvas.style.backgroundColor;
  ctx.lineCap = 'round';
  ctx.lineJoin = "round";
})


window.addEventListener('mouseup', (e) => { draw = false; })
window.addEventListener('mousedown', (e) => { draw = true; })

window.addEventListener('mousemove', (e) => {
  // console.log('mouse x: ' + e.clientX);
  // console.log('mouse y: ' + e.clientY);

  if (prevX == null || prevY == null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currX = e.clientX;
  let currY = e.clientY;
  ctx.beginPath();

  ctx.moveTo(prevX, prevY);

  ctx.quadraticCurveTo(prevX, prevY, currX, currY);

  ctx.lineTo(currX, currY);
  ctx.stroke();

  prevX = currX;
  prevY = currY;
})


document.querySelector('.clear').addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector('.save-jpeg').addEventListener("click", (e) => {
  let data = canvas.toDataURL('image/jpeg');
  let a = document.createElement('a');
  a.href = data;
  a.download = "sketch.jpeg";
  a.click();
})

document.querySelector('#save-png').addEventListener('click', () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement('a');
  a.href = data;
  a.download = "sketch.png";
  a.click();
})