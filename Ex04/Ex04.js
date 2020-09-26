/*
    Function:  Ex04-米奇时钟绘图练习
    Author:    WuJoel
    BuildDate: 2019-11-02
    Version:   Alpha
 */

let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext("2d");

//新建图像对象
let image = new Image();
let circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: canvas.width / 4,
    sAngle: 0,
    eAngle: Math.PI * 2,
    clockwise: false    //路径顺时针绘制
};
//设置图像对象来源
image.src = "micky.jpeg";
//注册图像加载完成的事件处理
image.onload = function () {
    ctx.save();
    //1、创建图案对象，注意平铺方式，并设置图案对象为填充样式
    ctx.fillStyle = ctx.createPattern(image, "no-repeat");
    //2、绘制填充矩形，其实这个方法就是绘制矩形，上一步是设置了填充样式
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    drawArc(circle);//因为圆弧的填充利用了图片，所以要保证图片加载完成
};
drawWord();

//画圆弧并填充
function drawArc(circle) {
    ctx.save(); //起到保存绘制状态和防止污染状态栈
    ctx.moveTo(canvas.width / 2, canvas.height / 2); //设置起始点为圆心，开始绘制
    //类似于海龟绘图
    circle.sAngle = 0;    //设置扇形起始弧度
    circle.eAngle = Math.PI / 4;//设置扇形终止弧度
    //arc是将路径勾画出来，具体的填充和描边需要后续处理
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle, circle.clockwise);
    //注意，此时的点在圆弧上，下一步就让它回到圆心了
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.stroke();
    //填充样式
    ctx.fillStyle = ctx.createPattern(image, "repeat");
    ctx.fill();
    ctx.restore();  //还原绘图环境
}

//在右下角填充文字，并设置字体样式
function drawWord() {
    ctx.save();
    ctx.fillStyle = "red";      //设置填充颜色
    ctx.shadowColor = "yellow";   //设置阴影色
    ctx.shadowBlur = 10;        //设置阴影模糊参数
    ctx.shadowOffsetX = -3;     //设置x方向偏移量
    ctx.shadowOffsetY = -3;     //设置y方向偏移量
    ctx.font = "60px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText("扇形", canvas.width, canvas.height);
    ctx.restore();
}

//================================================================
//为画时钟准备
let Numerals = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];//创建时间数组
//设置边距常量
let Margins = 20;
let HourMargins = 100;
let MinuteMargins = 60;

//设置样式、线对象，圆的样式使用前面的
let style = {
    color: "blue",
    fontSize: 20,
    isFill: false,   //填充还是描边
    isFillImage: false,  //是否为填充图案
    lineWidth: 1
};
let line = {x0: canvas.width / 2, y0: canvas.height / 2, x1: 0, y1: 0, margins: MinuteMargins};

//画圆
function drawCircle(circle, style) {
    ctx.save(); //保存绘图环境，保证此次填充样式、线宽等环境属性不影响其他图形绘制
    ctx.beginPath();//开启新路径
    //如果选择填充图案，则平移坐标系，为下一步图案应用做好铺垫
    circle.sAngle = 0;    //设置起始弧度
    circle.eAngle = Math.PI * 2;//设置终止弧度
    if (style.isFillImage)
        ctx.translate(canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
    //绘制圆路径
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle, circle.clockwise)
    //设置线宽
    ctx.lineWidth = style.lineWidth;

    if (!style.isFill) {
        ctx.strokeStyle = style.color;
        ctx.stroke();
    } else {
        ctx.fillStyle = style.color;
        ctx.fill();
    }
    ctx.closePath();    //关闭新路径
    ctx.restore();      //还原绘图环境
}

//绘制数字
function drawNumerals(circle, style) {
    let num, angle;
    ctx.save();
    ctx.font = style.fontSize + "px Arial";
    ctx.fillStyle = style.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    //设置阴影，这步还可以优化，阴影的参数可传入
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = 0;
    //遍历Numerals数组，每遍历一个元素就进行绘制
    Numerals.forEach(function (item, index) {
        //item为遍历的元素值，index为遍历到元素的索引值
        num = item;
        //绘制数字的位置弧度
        angle = -Math.PI / 2 + index * Math.PI / 6;
        ctx.fillText(num, circle.x + Math.cos(angle) * (circle.r - Margins), circle.y + Math.sin(angle) * (circle.r - Margins));
    });
    ctx.restore();
}

//绘制指针
function drawHand(line, style, angle, circle) {
    ctx.save();
    ctx.beginPath();
    //计算终止点坐标
    line.x1 = circle.x + Math.cos(angle) * (circle.r - line.margins);
    line.y1 = circle.y + Math.sin(angle) * (circle.r - line.margins);
    //设置指针的起始点
    ctx.moveTo(line.x0, line.y0);
    //画线
    ctx.lineTo(line.x1, line.y1);

    ctx.lineWidth = style.lineWidth;    //设置线宽
    ctx.strokeStyle = style.color       //设置描边色
    ctx.stroke();   //绘制

    ctx.closePath();//创建从当前点到开始点的路径
    ctx.restore();
}

//绘制时、分、秒针
function drawHands() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let sec = today.getSeconds();
    let angle;

    //绘制秒针
    style.lineWidth = 1;
    line.margins = MinuteMargins / 2;
    angle = -Math.PI / 2 + sec * 2 * Math.PI / 60;    //秒针实时位置的弧度计算
    drawHand(line, style, angle, circle);

    //绘制分针
    style.lineWidth = 2;
    line.margins = MinuteMargins;
    angle = -Math.PI / 2 + minutes * 2 * Math.PI / 60;
    drawHand(line, style, angle, circle);

    //绘制时钟
    style.lineWidth = 3;
    line.margins = MinuteMargins;
    hours = hours % 12;
    angle = -Math.PI / 2 + hours * Math.PI / 6 + minutes * 2 * Math.PI / 12 * 60;
    drawHand(line, style, angle, circle);
}

//定时器设置
function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // style.lineWidth=5;

    //渐变设置
    let gradient = ctx.createRadialGradient(circle.x, circle.y, canvas.width / 1200, circle.x, circle.y, circle.r);
    gradient.addColorStop(0, "rgb(255,0,0)");
    gradient.addColorStop(0.2, "rgb(255,165,0)");
    gradient.addColorStop(0.4, "rgb(255,255,0)");
    gradient.addColorStop(0.6, "rgb(0,255,0)");
    gradient.addColorStop(0.8, "rgb(0,127,255)");
    gradient.addColorStop(1, "rgb(0,0,255)");
    style.color = gradient;
    style.isFill = true;
    drawCircle(circle, style);   //因为画布要清空，所以表框也要重新画

    //绘制钟的外框
    style.isFillImage=false;
    style.lineWidth=1;
    circle.r=5;
    style.color="black";
    style.isFill=true;
    drawCircle(circle,style);

    //绘制数字
    circle.x = canvas.width / 2;
    circle.y = canvas.height / 2;
    style.isFill = false;
    circle.r = canvas.width / 4;
    style.color = "black";
    drawNumerals(circle, style);

    //绘制时分秒
    drawHands();
}


let but = document.getElementById("but");
but.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClock();
    setInterval(drawClock,1000);
};