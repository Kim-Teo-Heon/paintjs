const canvas = document.querySelector('#js-canvas');
const ctx = canvas.getContext('2d');

// Hard
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = '2.5';

let painting = false;

function start_painting() {
    painting = true;
}

function stop_painting() {
    painting = false;
}

if(canvas) {
    canvas.addEventListener('mousemove', on_mouse_move);
    canvas.addEventListener('mousedown', on_mouse_down);
    canvas.addEventListener('mouseup',stop_painting);
    canvas.addEventListener('mouseleave', stop_painting)
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
