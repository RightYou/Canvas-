/*
    Function:  T01_Clock
    Author:    WuJoel
    BuildDate: 2020-10-12
    Version:   Alpha
*/

// 设计三种表面，通过按钮切换

/*  变量命名  */
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let clockRadius = 150;
let rx = canvas.width / 2;
let ry = canvas.height / 2;  // 圆心坐标及半径
let timeText = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]  // 创建时间数组
let handStyle = {"seconds": "red", "minutes": "green", "hours": "blue"};
let image = new Image();
image.src = "back.jpg";
let imageFill;
let backStyle;
let dialStyle;


/*  函数定义  */

// 主函数，调用其他绘图函数，完成钟的绘制
function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);  // 刷新画板
    drawBackground(backStyle);  // 绘制背景
    drawDial(clockRadius, dialStyle);  // 绘制表盘
    drawText(clockRadius);  // 绘制时间刻度
    drawHands(clockRadius, handStyle);  // 绘制指针
    drawClockCenter(clockRadius);  // 绘制表的中心
}

/*
	Function：drawBackground（绘制背景）
	Params：  backStyle（传入填充样式）
	Returns： None
*/
function drawBackground(backStyle) {
    context.save();
    context.fillStyle = backStyle;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

/*
	Function：drawDial（绘制表盘）
	Params：  radius（表盘的半径）
			  dialStyle（表盘内填充样式）
	Returns： None
*/
function drawDial(radius, dialStyle) {
    context.save()
    context.lineWidth = radius / 10;  // 表盘边框宽度
    context.strokeStyle = 'rgb(241,238,37)';  // 表盘边框样式
    context.shadowColor = 'rgb(241,185,37)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = dialStyle;  // 表盘填充样式

    context.beginPath();
    context.arc(rx, ry, radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.fill();
    context.restore()
}

/*
	Function：drawText（绘制数字）
	Params：  radius（表盘的半径，计算数字的位置）
	Returns： None
*/
function drawText(radius) {
    context.save();
    context.font = "25px Arial";
    context.fillStyle = "rgb(241,181,5)";
    context.translate(rx, ry);  // 平移绘图坐标原点到圆心，便于四周数字的绘制
    context.textAlign = "center";  // 设置文本水平居中
    context.shadowColor = 'rgb(35,179,222)';  // 设置文本阴影
    context.shadowBlur = 5;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 0;

    // 逐个绘制数字
    timeText.forEach(function (item, index) {
        context.fillText(item.toString(), 0, -radius - 15)
        context.rotate(Math.PI / 6);
    })
    context.restore();
}

/*
	Function：drawHands（绘制时分秒指针）
	Params：  radius（表盘的半径，计算后得到指针的长度和宽度）
			  handStyle（指针的颜色）
	Returns： None
*/
function drawHands(radius, handStyle) {
    // 获取时间
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    // 绘制指针
    let angle;  // 弧度制
    angle = (seconds / 60) * 2 * Math.PI;
    drawRadial(angle, radius * 0.9, handStyle["seconds"], radius / 100);
    angle = (minutes / 60) * 2 * Math.PI;
    drawRadial(angle, radius * 0.75, handStyle["minutes"], radius / 50);
    angle = ((hours * 60 + minutes) / (12 * 60)) * 2 * Math.PI;
    drawRadial(angle, radius * 0.6, handStyle["hours"], radius / 40);
}

/*
	Function：drawRadial（绘制指针）
	Params：  angle（角度） length（长度） style（颜色） width（宽度）
	Returns： None
*/
function drawRadial(angle, length, style, width) {
    context.save()
    context.lineWidth = width;
    context.translate(rx, ry);  // 平移绘图坐标原点到圆心，为指针的起点
    let y = -length * Math.cos(angle);
    let x = length * Math.sin(angle);
    context.strokeStyle = style;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(x, y);
    context.stroke();
    context.restore()
}

/*
    Function: drawClockCenter（绘制表中心的点，需要在绘制指针后画）
    Params:   radius（用于计算半径）
 */
function drawClockCenter(radius) {
    context.save();
    context.beginPath();
    context.fillStyle = "rgb(248,221,43)";
    context.strokeStyle = "rgb(250,73,131)"
    context.arc(rx, ry, radius / 30, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    context.restore();
}


/*  事件响应  */
image.addEventListener("load", () => {
    imageFill = context.createPattern(image, 'no-repeat'); // 图片加载成功后才能赋值
    backStyle = imageFill;
    setInterval(main, 100)  // 不一定设置为1秒刷新一次，可以小一点，避免误差
    btnListener();  // 确保图片成功加载
});

/*
	Function：btnListener（整合按钮事件监听代码）
*/
function btnListener() {
    let btnStyle1 = document.getElementById("style1");
    btnStyle1.addEventListener("mousedown", ev => {
        // 设置指针样式
        handStyle = {"seconds": "red", "minutes": "green", "hours": "blue"};
        backStyle = imageFill;
        dialStyle = linearGradientDail;
    })

    let btnStyle2 = document.getElementById("style2");
    btnStyle2.addEventListener("mousedown", ev => {
        // 设置指针样式
        handStyle = {"seconds": "black", "minutes": "black", "hours": "black"};
        const radialGradient = context.createRadialGradient(0, 0, 100, 600, 400, 100);
        radialGradient.addColorStop(0, 'red');
        radialGradient.addColorStop(0.25, "yellow");
        radialGradient.addColorStop(0.5, "green");
        radialGradient.addColorStop(0.75, 'blue')
        radialGradient.addColorStop(1, 'pink');
        backStyle = radialGradient;
        dialStyle = imageFill;
    })

    let btnStyle3 = document.getElementById("style3");  // 由于渐变的原因，指针长度会变化
    btnStyle3.addEventListener("mousedown", ev => {
        let radialGradient = context.createRadialGradient(0, 0, 100, clockRadius, clockRadius, 100);
        radialGradient.addColorStop(0, 'red');
        radialGradient.addColorStop(0.25, "yellow");
        radialGradient.addColorStop(0.5, "green");
        radialGradient.addColorStop(1, 'blue')
        handStyle = {"seconds": radialGradient, "minutes": "green", "hours": "blue"};
        let linearGradient = context.createLinearGradient(400, 0, 500, 100);
        linearGradient.addColorStop(1, '#eab2d5')
        linearGradient.addColorStop(0, 'white');
        backStyle = linearGradient;
        dialStyle = imageFill;
    })
}

/*  初始化  */
console.log("默认使用样式1");
let linearGradientDail = context.createLinearGradient(400, 0, 500, 100);
linearGradientDail.addColorStop(1, '#eab2d5')
linearGradientDail.addColorStop(0, 'white');
dialStyle = linearGradientDail;
