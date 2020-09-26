/*
	Function:  Ex02-时钟
	Author:    WuJoel
	BuildDate: 2019-10-16
	Version:   Alpha
 */

let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext('2d');

// 时间格式控制，补上前导0
function addZero(value) {
    let str = "";
    if (value < 10)
        str = '0' + value;
    else
        str = value;
    return str;
}

// 定时器事件处理
function onInterval() {
    let myDate = new Date();        // 新建日期对象
    let h = myDate.getHours();
    let m = myDate.getMinutes();
    let s = myDate.getSeconds();
    let time = addZero(h) + ":" + addZero(m) + ":" + addZero(s);
    ctx.font = '38px Arial';
    //控制文字居中
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "red";
    //刷新
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //绘制文本
    ctx.fillText(time, canvas.width / 2, canvas.height / 2);

    setTimeout(onInterval, 1000);//1000ms后递归调用
}

// 鼠标事件处理函数
/* 有点过时
canvas.onmousedown = function () {
    onInterval();
};
*/

// 使用了箭头函数，相比于匿名函数，this指向会自动指向作用域
canvas.addEventListener("mousedown", e => {
    onInterval();
})

/* keyCode被舍弃了
window.onkeydown = function (event) {
    if (event.keyCode === 13)
        onInterval();
};


window.onkeydown = function (event) {
    if (event.code === 'Enter')  // 按下enter键，也能启动
        onInterval();
};
*/

window.addEventListener("keydown", function (event) {
    if (event.code === 'Enter')
        onInterval();
})