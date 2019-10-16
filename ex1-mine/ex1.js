/*
    Function:Ex1
    Author  :unowen
    BuildData:2019-10-16
    Version:Alpha
 */
//获取Canvas标记对象
var canvas = document.getElementById("MyCanvas");
//获取canvas的绘图环境对象context
var ctx = canvas.getContext("2d");
//修改canvas 上的字体大小
ctx.font="64px 宋体";
//修改文本绘制点的水平方向
ctx.textAlign = "center";
//修改文本绘制点的字符基线方向（垂直方向）
ctx.textBaseline = "middle";
//修改填充文本的颜色
ctx.fillStyle = '#ffcc33';
//绘制填充文本
ctx.fillText("开学第一课",canvas.width/2,canvas.height/2);