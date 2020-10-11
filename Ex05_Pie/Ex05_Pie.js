/*
    Function:  Ex05_Pie
    Author:    WuJoel
    BuildDate: 2020-09-28
    Version:   Alpha
*/

// 1、变量定义
const legend = ["优秀", "良好", "中等", "及格", "不及格"];
const data = [20, 40, 20, 10, 10];
const colors = ["#1a9641", "#a6d96a", "#fdae61", "#fda9a3", "#d7191c"];

const RECT_MARGIN = 15,   //控制图例间距
    TEXT_OFFSET = 50,   //控制文本偏移
    PIE_OFFSET = 50,    //控制饼图偏移
    LINE_OFFSET = 8,    //线条中的横线宽度
    START_ANGLE = -Math.PI / 3;   //饼图第一块的初始弧度
let alpha;  // 透明度
let sumData;  // data的总和

// 图形对象定义
const circle = {
    x: canvas.width / 2, y: canvas.height / 2, r: canvas.width / 4,
    sAngle: 0, eAngle: Math.PI * 2, counterClockWise: false  // 默认为false为顺时针
};
const style = {
    color: "blue", fontSize: 20, lineWidth: 1,
    fontFamily: "Arial", hAlign: "center", vAlign: "middle"
};
const line = {x0: canvas.width / 2, y0: canvas.height / 2, x1: 0, y1: 0};
const text = {text: "hello world!", x: canvas.width / 2, y: canvas.height / 2};
const rect = {x: 0, y: 0, width: 100, height: 100};

// 2、函数定义
/*
	Function：calcSum（计算数据总和）
	Params：data(数据数组)
	Returns：sums（数据之和，number型）
	version：1.0
*/
function calcSum(data) {
    let sums = 0;
    data.forEach(function (item) {
        sums += item;
    });
    return sums;
}

/*
	Function：drawLegend（绘制图例）
	Params：none
	Returns：none
	version：1.0
*/
function drawLegend() {
    //设置矩形的起始位置
    rect.x = RECT_MARGIN;
    rect.y = RECT_MARGIN;
    rect.width = RECT_MARGIN * 2.5;
    rect.height = RECT_MARGIN;
    style.hAlign = "left";
    style.vAlign = "top";

    // 循环绘制g
    legend.forEach(function (item, index) {
        // 绘制图例的矩形
        rect.y += RECT_MARGIN + rect.height;
        style.color = colors[index]
        ctx.beginPath();
        drawRect(rect, style, true);
        ctx.closePath();
        //绘制图例文本提示
        text.text = item;
        text.x = rect.x + rect.width + RECT_MARGIN;
        text.y = rect.y;
        style.color = colors[index];
        drawText(text, style, true);
    });
}


/*
	Function：drawPie（绘制饼图）
	Params：none
	Returns：none
	version：1.0
*/
function drawPie() {
    // 设置起始弧度
    circle.r = canvas.height / 3;
    circle.x = canvas.width / 2 + PIE_OFFSET;
    line.x0 = canvas.width / 2 + PIE_OFFSET;
    circle.eAngle = START_ANGLE;
    // 绘制各个扇形
    data.forEach(function (item, index) {
        ctx.beginPath();
        circle.sAngle = circle.eAngle;
        circle.eAngle += (item / sumData) * Math.PI * 2;
        // 设置线条终点坐标
        line.x1 = line.x0 + circle.r * Math.cos(circle.sAngle);
        line.y1 = line.y0 + circle.r * Math.sin(circle.sAngle);
        // 设置扇形填充颜色
        style.color = colors[index];
        drawLine(line, style, true);
        drawCircle(circle, style, true);
        ctx.closePath();
    });
}

/*
	Function：drawPieLegend（绘制饼图图例）
	Params：none
	Returns：none
	version：1.0
*/
function drawPieLegend() {
    let angle = START_ANGLE;
    let endAngle = START_ANGLE;

    // 绘制各个扇形
    data.forEach(function (item, index) {
        style.color = colors[index];
        angle = endAngle + (item / sumData) * Math.PI; //确定文字位置
        text.x = circle.x + (circle.r + TEXT_OFFSET) * Math.cos(angle);  // 设置文本起始点
        text.y = circle.y + (circle.r + TEXT_OFFSET) * Math.sin(angle);  // 设置文本起始点
        style.hAlign = "center";
        style.vAlign = "middle";
        text.text = legend[index] + ":" + item;
        drawText(text, style, true);

        // 绘制从圆心出发射线
        ctx.beginPath();
        line.x0 = circle.x;  // 就是圆心坐标
        line.y0 = circle.y;
        line.x1 = circle.x + (circle.r + TEXT_OFFSET / 3) * Math.cos(angle);
        line.y1 = circle.y + (circle.r + TEXT_OFFSET / 3) * Math.sin(angle);
        drawLine(line, style, true);

        // 绘制线条的短横
        line.x0 = line.x1;
        line.y0 = line.y1;


        // 圆心两边文本的短横方向不同
        if (line.x0 > circle.x)
            line.x1 += LINE_OFFSET;
        else
            line.x1 -= LINE_OFFSET;
        drawLine(line, style, true);
        ctx.closePath();
        // 设置每部分扇形的终止弧度
        endAngle += (item / sumData) * Math.PI * 2;
    });
}

// 3、事件处理函数定义
function onInterval() {
    //设置圆心的偏移位置
    let x = circle.x - circle.r - TEXT_OFFSET;
    let y = circle.y - circle.r - TEXT_OFFSET;
    //清屏
    ctx.clearRect(x, y, canvas.width - x, canvas.height - y);
    //设置全局透明度
    ctx.globalAlpha = alpha;
    //根据透明度变化控制元素的出现
    if (alpha < 1)
        setTimeout(onInterval, 1000 / 24);
    else
        setTimeout(drawPieLegend, 500);
    //绘制饼图
    drawPie();
    //透明度每次调用都累加一点
    alpha += 0.25;
}

// 4、调用执行
// 设置初始值
style.fontSize = 12;
alpha = 1
sumData = calcSum(data);  //计算数据之和
drawLegend();  // 绘制图例
setTimeout(onInterval, 500);  //动画入口，指定的毫秒数后调用函数