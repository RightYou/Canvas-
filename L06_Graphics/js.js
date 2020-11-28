/*
    Function:  js
    Author:    WuJoel
    BuildDate: 2020-11-15
    Version:   Alpha
*/

/* -----变量定义----- */
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let image = new Image();
let t = 3;
let fontStyle = {
    fontSize: 150,
    hAlign: "center",
    vAlign: "middle",
    fontFamily: "Arial",
    fillStyle: "green"
};
let point = {x: canvas.width / 2, y: canvas.height / 2};

let dw = 560;
let dh = 415;

/* -----函数定义----- */

/**
 * 绘制倒计时
 */
function drawCountdown() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.fillStyle = 'rgb(243,179,127)'
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = fontStyle.fontSize + "px " + fontStyle.fontFamily;
    context.textAlign = fontStyle.hAlign;
    context.textBaseline = fontStyle.vAlign;
    context.fillStyle = fontStyle.fillStyle;
    context.fillText(t.toString(), point.x, point.y);
    context.restore();

    t = t - 1;
    if (t !== 0) {
        setTimeout(drawCountdown, 1000);
    } else {
        setTimeout(drawGraphic, 1000);
    }
}

function drawGraphic() {
    context.fillStyle = 'rgb(243,179,127)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.arc(point.x, point.y, 200, 0, Math.PI * 2);
    context.clip();

    setInterval(drawTemp, 100);
}


function drawTemp() {
    let canvasTemp = document.createElement('canvas');
    let contextTemp = canvasTemp.getContext('2d');
    canvasTemp.width = 600;
    canvasTemp.height = 400;

    dw = dw + 5.6;
    dh = dh + 4.15;
    contextTemp.drawImage(image, 0, 0, 560, 415, -300, -200, dw, dh);
    overPatten = context.createPattern(canvasTemp, 'no-repeat');
    context.fillStyle = overPatten;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

/* -----事件响应----- */
image.addEventListener("load", ev => {
    context.fillStyle = 'rgb(243,179,127)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setTimeout(drawCountdown, 100);
});

/* -----初始化----- */
image.src = "bc.png";