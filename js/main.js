const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "white";

const ctx = canvas.getContext('2d');

// ctx.fillStyle = "red";
// ctx.fillRect(100, 100, 100, 100);

let prevX = null;
let prevY = null;
let draw = false;

let clrs = document.querySelectorAll('.clr');
clrs = Array.from(clrs);

clrs.forEach(clr =>{
  clr.addEventListener("click", ()=>{
    ctx.strokeStyle = clr.dataset.clr;
  });
});

ctx.lineWidth = 5;

window.addEventListener('mouseup', (e)=>{draw = false;})
window.addEventListener('mousedown', (e)=>{draw = true;})

window.addEventListener('mousemove', (e)=>{
  // console.log('mouse x: ' + e.clientX);
  // console.log('mouse y: ' + e.clientY);

  if(prevX == null || prevY == null || !draw){
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currX = e.clientX;
  let currY = e.clientY;
  ctx.beginPath();

  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  prevX = currX;
  prevY = currY;
})


document.querySelector('.clear').addEventListener('click', (e)=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector('.save').addEventListener("click", (e)=>{
  let data = canvas.toDataURL('imag/png');
  let a = document.createElement('a');
  a.href = data;
  a.download = "sketch.png";
  a.click();
})

function changeBackground(){
  console.log(canvas.style.backgroundColor);
  let btn = document.querySelector('#theme-btn');
  
  if(canvas.style.backgroundColor === "white"){
    canvas.style.backgroundColor ="black";
    btn.style.background = 'white';
    btn.style.color = 'black';
  }
  else{
    canvas.style.backgroundColor = "white";
    btn.style.background = 'black';
    btn.style.color = 'white';
  }
}