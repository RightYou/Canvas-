/*
    Function:  L04_Rendering
    Author:    WuJoel
    BuildDate: 2020-10-19
    Version:   Alpha
*/

// 变量声明
canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");
let i = 0;
let msg = "Happy";

// 函数定义
function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    i += 1;
    if (i === 16) i = 0;  // 防止溢出
    context.rotate(Math.PI * i / 8);
    context.fillText(msg, 0, 0);
    context.textAlign = "center";
    context.shadowColor = 'rgba(0,0,0,0)'
    context.fillText("Name",0,-150);
    context.restore()
}

// 事件响应
canvas.addEventListener("mousedown",ev => {
    setInterval(draw,800); // 如果多次点击，会越转越快，hhhh
})

// 初始化
context.shadowColor = 'rgba(0,0,0,0.7)';
context.shadowBlur = 10;
context.shadowOffsetX = 20;
context.shadowOffsetY = 20;
context.font = "50px Arial";
context.textBaseline = "middle"
context.fillStyle = "orange"
context.fillText("点击开始",300,200);

