/*
	Function:Ex2
	Author:Un-owen
	Build-Date:2019-10-16
	Version：Alpha
 */

var canvas = document.getElementById("MyCanvas");
var ctx = canvas.getContext('2d');

//时间格式控制，补上前导0
function addZero(value) {
    var str = "";
    if (value < 10)
        str = '0' + value;
    else
        str = value;
    return str;
}

//定时器事件处理
function onInterval() {
    var myDate = new Date();        //新建日期对象
    var h = myDate.getHours();
    var m = myDate.getMinutes();
    var s = myDate.getSeconds();
    var str = addZero(h) + ":" + addZero(m) + ":" + addZero(s);
    ctx.font = '38px Arial';
    //控制文字居中
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = 'red';
    //刷新
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //绘制文本
    ctx.fillText(str, canvas.width / 2, canvas.height / 2);

    setTimeout(onInterval, 1000);//1000ms后递归调用
}

//鼠标事件处理函数
canvas.onmousedown = function () {
    onInterval();
};

window.onkeydown = function (event) {
    if (event.keyCode == 13)
        onInterval();
};