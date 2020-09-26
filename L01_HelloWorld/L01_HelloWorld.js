/*
    Function:  L01_HelloWorld
    Author:    WuJoel
    BuildDate: 2020-09-26
    Version:   Alpha
*/

// 获取canvas对象
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
// 设置字体样式
context.font = '20pt Arial';
// 填充文本，x和y为相对绘图表面的坐标
context.fillText('Hello Canvas', 0, 20);


// 获取边框盒，position+margin
let box = canvas.getBoundingClientRect();
let boxLeft = box.left, boxTop = box.top;


// 获取border+padding
let style = window.getComputedStyle(canvas);

let borderLeft = parseFloat(style["border-left-width"]),
    borderTop = parseFloat(style["border-top-width"]),
    paddingLeft = parseFloat(style["paddingLeft"]),
    paddingTop = parseFloat(style["paddingTop"]);

// 获取坐标差值
let xLeft = boxLeft + borderLeft + paddingLeft,
    yTop = boxTop + borderTop + paddingTop;

// 如果设置了CSS导致缩放(这个应该是求绘图表面的坐标才考虑）
let cssWidth = parseFloat(style["width"]), cssHeight = parseFloat(style["height"]);
let scaleX = canvas.width / cssWidth, scaleY = canvas.height / cssHeight;  //缩放因子

// 鼠标在画布上的值就是鼠标的坐标减去
canvas.addEventListener("mousemove", (e) => {
    let x = e.clientX - xLeft;  // 获取鼠标相对于 viewport 的坐标
    let y = e.clientY - yTop;
    x = x * scaleX;
    y = y * scaleY;
    console.log(x, y);
});

// 通过地址传递返回值？？？
function windowToCanvas(canvas, xw, yw, xc, yc) {
    let box = canvas.getBoundingClientRect();
    let boxLeft = box.left, boxTop = box.top;
    let borderLeft = parseFloat(style["border-left-width"]),
        borderTop = parseFloat(style["border-top-width"]),
        paddingLeft = parseFloat(style["paddingLeft"]),
        paddingTop = parseFloat(style["paddingTop"]);
    let xLeft = boxLeft + borderLeft + paddingLeft,
        yTop = boxTop + borderTop + paddingTop;
    xc = xw - xLeft;
    yc = xw - yTop;
}

// 绘画表面的坐标需要计算缩放后的结果
function windowToDrawing(canvas, xw, yw, xd, yd) {
    let box = canvas.getBoundingClientRect();
    let boxLeft = box.left, boxTop = box.top;
    let borderLeft = parseFloat(style["border-left-width"]),
        borderTop = parseFloat(style["border-top-width"]),
        paddingLeft = parseFloat(style["paddingLeft"]),
        paddingTop = parseFloat(style["paddingTop"]);

    let xLeft = boxLeft + borderLeft + paddingLeft,
        yTop = boxTop + borderTop + paddingTop;
    let cssWidth = parseFloat(style["width"]), cssHeight = parseFloat(style["height"]);
    let scaleX = canvas.width / cssWidth, scaleY = canvas.height / cssHeight;

    xd = (xw - xLeft) * scaleX;
    yd = (yw - yTop) * scaleY;
}