/*
    Function:  js
    Author:    WuJoel
    BuildDate: 2020-11-16
    Version:   Alpha
*/

/* -----变量声明----- */
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let str = "START";
let point = {x: canvas.width / 2, y: canvas.height / 2};  // 中心位置
// 文字的样式
let textStyle = {
    fontSize: 100,
    hAlign: "center",
    vAlign: "middle",
    fontFamily: "Arial",
    fillStyle: "orange",
    lineWidth: 3
};
let loc = {x: undefined, y: undefined};  // 心的位置
let t = undefined;   // 用来控制有颜色的位置
let flag = false;  // 判断是否正在转动
let interval;  // 用于clearInterval

/* -----函数定义----- */
/**
 * 绘制文本
 * @param text
 * @param style
 * @param point
 */
function drawText(text, style, point) {
    context.font = style.fontSize + "px " + style.fontFamily;
    context.textAlign = style.hAlign;
    context.textBaseline = style.vAlign;
    context.strokeStyle = style.fillStyle;
    context.lineWidth = style.lineWidth;
    context.strokeText(text, point.x, point.y);
}


function drawHeart() {
    context.save();
    context.translate(point.x, point.y);
    loc.x = 0;
    loc.y = -(canvas.height * 4.5);
    for (i = 0; i < 12; i++) {
        pathFullHeart(loc);
        if (i === t) {
            context.fillStyle = randColor();
        } else {
            context.fillStyle = '#cdcdcd'
        }
        context.fill();
        context.rotate(Math.PI / 6);
    }
    t++;
    if (t === 12) {
        t = 0;
    }
    context.restore();
}


function drawInit() {
    drawText(str, textStyle, point);
    drawHeart();
    t = 0;
}


/* -----事件响应----- */
canvas.addEventListener('mousedown', ev => {
    // 如果没有动，就开始
    if (!flag) {
        flag = true;
        context.clearRect(0, 0, canvas.width, canvas.height);
        interval = setInterval(drawHeart, 200);
    } else {
        flag = false;
        drawText((t - 1).toString(), textStyle, point);
        clearTimeout(interval);
        t = 0;  // 使颜色回到第一个心
    }
})

/* -----初始化----- */
drawInit();