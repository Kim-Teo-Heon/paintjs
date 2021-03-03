const canvas = document.querySelector('#js-canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.querySelector('#range');
const mode_btn = document.querySelector('#btns__mode-btn');

const initial_color = '#2c2c2c';
const canvas_size = 700;

// Hard
canvas.width = canvas_size;
canvas.height = canvas_size;

ctx.strokeStyle = initial_color;
ctx.lineWidth = '2.5';

ctx.fillStyle = initial_color;

let painting = false;
let filling = false;

function start_painting() {
    painting = true;
}

function stop_painting() {
    painting = false;
}

function on_mouse_move(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        // 새로운 경로 생성
        ctx.beginPath();
        // 특정 시작점 설정
        ctx.moveTo(x, y);
    } else {
        // 이전 경로의 끝점에서 x , y로 지정된 위치까지 Path를 만든다
        ctx.lineTo(x, y);
        // 윤곽선을 이용하여 그리기
        ctx.stroke();
    }
}

function on_mouse_down() {
    start_painting();
}

function handle_color_click(e) {
    const color = e.target.style.backgroundColor;
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handle_range_change(e) {
    const width = e.target.value;
    console.log(width)
    ctx.lineWidth = width; 
}

function handle_mode_click() {
    if(filling) {
        filling = false;
        mode_btn.innerText = 'Fill';
    } else {
        filling = true;
        mode_btn.innerText = 'Paint';
    }
}

function handle_canvas_click() {
    if(filling) {
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

if(canvas) {
    canvas.addEventListener('mousemove', on_mouse_move);
    canvas.addEventListener('mousedown', on_mouse_down);
    canvas.addEventListener('mouseup',stop_painting);
    canvas.addEventListener('mouseleave', stop_painting);
    canvas.addEventListener('click', handle_canvas_click)
}

if(colors) {
    colors.forEach((color) => {
        color.addEventListener('click',handle_color_click);
    })  
} 

if(range) {
    range.addEventListener('input', handle_range_change);
}

if(mode_btn) {
    mode_btn.addEventListener('click',handle_mode_click);
}