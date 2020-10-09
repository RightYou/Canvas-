/*
    Function:  L02_Draw
    Author:    WuJoel
    BuildDate: 2020-09-28
    Version:   Alpha
*/

// 1、变量定义
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d')

// 2、函数定义
// 绘图
function drawFace() {
    // 矩形和直线的绘制
    context.strokeStyle = 'rgb(172,246,68)'
    context.lineWidth = 8;
    context.beginPath()
    context.strokeRect(100, 100, 100, 50);
    context.moveTo(250, 100);  // 起点
    context.lineTo(350, 100);  // 终点
    context.stroke();  // 描边

    let linearGradient = context.createLinearGradient(400, 0, 500, 100);
    linearGradient.addColorStop(1, '#eab2d5')
    linearGradient.addColorStop(0, 'white');
    context.fillStyle = linearGradient;
    context.lineWidth = 20;
    context.beginPath()
    context.arc(220, 200, 120, 0, 180 * Math.PI / 180)
    context.closePath();
    context.stroke();  // 描边
    context.fill();
}
// 清空画板
function clearContext(canvas) {
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, 600, 400)
}


// 3、事件响应
canvas.addEventListener("mousedown", () => {
    if (!flag) {
        clearContext((canvas));
        flag = !flag;
    } else {
        drawFace();
        flag = !flag;
    }
});

// 4、初始化
let flag = false;  // 控制画面的显示和消失
// 绘图属性设置
// context.lineWidth = 5;
context.strokeStyle = 'blue';
context.fillStyle = 'red';
// 也可以通过rgb，rgba，hsl，hsla，16进制，名称等方式设置颜色
context.fillStyle = 'rgb(255,255,0)';

// 两种绘制模式
// 1、立即绘制
context.strokeRect(0, 0, 50, 50);  // 宽度是往两边扩展的，-LineWidth/2为起点就看不见了
context.fillRect(0, 60, 50, 50);
// 2、基于路径的绘制
context.beginPath();  // 路径初始化
// 线段
context.moveTo(0, 130);  // 起点
context.lineTo(50, 130);  // 终点
context.stroke();
// 矩形
context.rect(0, 150, 50, 50);
context.stroke();
// 圆弧
context.beginPath();  // 再次路径初始化，否则圆弧会和上一个重点连接
context.arc(150, 50, 100, -30 * Math.PI / 180, 20 * Math.PI / 180)
context.stroke();
context.closePath()  // 封闭圆弧的开放路径，并不是结束当前路径
// 圆弧仍然会连接到直线，但使用了上一句后，圆弧从起点连接到直线。
context.lineTo(150, 50)
context.stroke();
// arcTo的使用，用于绘制圆角多边形
context.beginPath();  // 路径初始化
context.moveTo(100, 100)  // 第一个参考点
context.arcTo(200, 100, 200, 200, 50)
context.stroke()
// fill填充时有非零环绕规则


// 纹理渐变的方式设置填充
// 线性渐变
const linearGradient = context.createLinearGradient(400, 0, 500, 100);
linearGradient.addColorStop(0, 'blue')
linearGradient.addColorStop(0.5, "yellow")
linearGradient.addColorStop(1, 'blue');
context.fillStyle = linearGradient;
context.fillRect(400, 0, 100, 100)
// 放射渐变
const radialGradient = context.createRadialGradient(400, 150, 100, 400, 250, 100);
radialGradient.addColorStop(0, 'blue')
radialGradient.addColorStop(0.5, "yellow")
radialGradient.addColorStop(1, 'blue');
context.fillStyle = radialGradient;
context.fillRect(400, 150, 100, 100)