/*
    Function:Ex03
    Author:U.N-Owen
    BuildDate:2019-11-02
    Version:Alpha
 */

var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext("2d");

//主要有两个部分，首先是欢迎光临的文本绘制，然后是直线和圆弧的绘制

//将一些后面会重复用到的量保存
var point = {x: canvas.width / 2, y: canvas.height / 2};

var style = {
    fontSize: 60,
    hAlign: "center",
    vAlign: "middle",
    fontFamily: "Arial",
    color: "orange",
    //线条的宽度，用于线条绘制
    lineWidth: "1"
};

var strWelcom = "欢迎光临";
//index用来后面索引单个字符绘制
var index = 0;

//绘制文本
function drawText(text, style, bIsFill, point) {
    //设置字体大小和字体名称，注意px后面有空格
    ctx.font = style.fontSize + "px " + style.fontFamily;
    //设置文本对齐方式
    ctx.textAlign = style.hAlign;
    ctx.textBaseline = style.vAlign;

    if (bIsFill) {
        //设置填充属性
        ctx.fillStyle = style.color;
        //绘制填充文本
        ctx.fillText(text, point.x, point.y);
    } else {
        //设置描边属性
        ctx.strokeStyle = style.color;
        //绘制描边文字
        ctx.strokeText(text, point.x, point.y);
    }
}


//对单个字符的绘制
function onInterval() {
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (index < strWelcom.length)
    //绘制单个文字，charAt为字符串取字符方法
        drawText(strWelcom.charAt(index), style, true, point);
    else
        drawText(strWelcom, style, true, point);
    index++;
    if (index <= strWelcom.length)
        setTimeout(onInterval, 500);
    else {
        drawLine(line, style);//绘制细线
        drawArc(arc, style);//绘制半圆
    }
}

//绘制欢迎光临
drawText(strWelcom, style, true, point);
//线条和圆弧的绘制
var line = {
    x0: 0,
    y0: 0,
    x1: canvas.width,
    y1: canvas.height
};

var arc = {
    x: 0,
    y: 0,
    r: 200,
    sAngle: 0,
    eAngle: Math.PI
};

//设置粗线和文本的间隔常量值，常量用大写
var MARGIN = 20;

//绘制线条
function drawLine(line, style) {
    //设置起始点坐标
    ctx.moveTo(line.x0, line.y0);
    //设置终止点坐标
    ctx.lineTo(line.x1, line.y1);
    //保存当前的绘图环境
    ctx.save();
    //设置描边属性
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    //线条着色
    ctx.stroke();
    //还原刚才压入的绘图环境
    ctx.restore();
}

//绘制圆弧
function drawArc(arc, style) {
    //开启路径
    ctx.beginPath();
    //绘制圆弧
    ctx.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle);
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
    ctx.stroke();
    //关闭路径
    ctx.closePath();
}

//获取字符串的宽度，必须在字体设置之后（font属性赋值后）
var nWidth = ctx.measureText(strWelcom).width;

//设置粗线起始点坐标
line.x0 = canvas.width / 2 - nWidth / 2;
line.y0 = canvas.height / 2 + style.fontSize / 2 + MARGIN;

//设置粗线终止点坐标
line.x1 = line.x0 + nWidth;
line.y1 = line.y0;

style.lineWidth = "5";
drawLine(line, style);//绘制细线

arc.x = line.x0 + nWidth / 2;//设置圆心坐标在细线的重点
arc.y = line.y0;
arc.r = nWidth / 2;     //设置圆的半径为宽度的一半(字符串宽度一半）
style.lineWidth = "2";
drawArc(arc, style);//绘制半圆

//调用执行
//添加一个返回值，便于使用clearTimeout()。
setTimeout(onInterval, 1000);