/*
    Function:  L03_Text
    Author:    WuJoel
    BuildDate: 2020-10-12
    Version:   Alpha
*/


// 变量定义
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let style = {
    fontSize: 100,
    hAlign: "center",
    vAlign: "middle",
    fontFamily: "Arial",
    fillStyle: "orange"
};
let str = "Happy";
let image = new Image();
let index = 0;
let point = {x: canvas.width / 2, y: canvas.height / 2};

// 函数定义
// 绘制文本
function drawText(text, style, point) {
    context.font = style.fontSize + "px " + style.fontFamily;
    context.textAlign = style.hAlign;
    context.textBaseline = style.vAlign;
    context.fillStyle = style.fillStyle;
    context.fillText(text, point.x, point.y);
}

// 绘制单个字符
function drawChar() {
    // 清屏
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (index < str.length) {
        context.save();
        let wChar = Math.round(context.measureText(str).width / str.length);
        let nChar = (Math.round((str.length - 1) / 2) - index);
        point = {x: canvas.width / 2 - wChar * nChar, y: canvas.height / 2};
        context.shadowColor = 'rgba(0,0,0,0.7)';
        context.shadowBlur = 10;
        context.shadowOffsetX = 10;
        context.shadowOffsetY = 10;
        style.fillStyle = 'orange'
        drawText(str.charAt(index), style, point);
        context.restore();
    } else {
        style.fillStyle = context.createPattern(image, 'no-repeat')
        point = {x: canvas.width / 2, y: canvas.height / 2};
        drawText(str, style, point);
    }
    index++;
    if (index <= str.length)
        setTimeout(drawChar, 500);
}

// 事件响应
image.addEventListener("load", () => {
    style.fillStyle = context.createPattern(image, 'no-repeat')
    drawText(str, style, point);
    // 图片加载完成后才能监听
    canvas.addEventListener("mousedown", () => {
        drawChar()
    });
});

// 初始化
image.src = "Autumn.jpg";