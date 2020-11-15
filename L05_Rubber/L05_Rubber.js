/*
    Function:  js
    Author:    WuJoel
    BuildDate: 2020-10-26
    Version:   Alpha
*/


/* -----变量声明----- */
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let resetButton = document.getElementById("resetButton");
let strokeStyleSelect = document.getElementById("strokeStyleSelect");
let eraseAll = document.getElementById("eraseAllButton");
let gameButton = document.getElementById("gameButton");
// 鼠标当前坐标
let loc = {
    x: undefined,
    y: undefined
}

// 鼠标点下的点
let mousedown = {
    x: undefined,
    y: undefined
};

// 橡皮筋的起点和终点坐标
let rubberBand = {
    x0: undefined,
    y0: undefined,
    x1: undefined,
    y1: undefined
};

let k = {x0: 1, y0: 1, x1: -1, y1: -1}  // 控制方向
let dragging;  // 控制拖放状态
let drawingSurfaceImageData;  // 存储绘制表面数据
let overPatten;  // 游戏结束的背景图片
let time;  // 用来控制Interval
let gaming;  // 游戏监听
let rr1, rr2;

let strokeColor = {
    value: undefined
}

let image = new Image();

/* -----函数定义----- */
/**
 * 绘制背景表格
 * @param color
 * @param stepX
 * @param stepY
 */
function drawGrid(color, stepX, stepY) {
    context.save()
    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (let i = stepX + 0.5; i < context.canvas.width; i += stepX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }

    for (let i = stepY + 0.5; i < context.canvas.height; i += stepY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
    context.restore();
}

/**
 * 获取Rubber的边框四个坐标
 * @param loc
 * @returns {{y0: *, x0: *, y1: *, x1: *}}
 */
function updateRubberBand(loc) {
    return {
        x0: mousedown.x,
        y0: mousedown.y,
        x1: loc.x,
        y1: loc.y
    }
}

/**
 * 绘制橡皮筋框
 * @param rubberBand
 */
function drawRubberBand(rubberBand) {
    context.save();
    context.strokeStyle = strokeColor.value;  // 设置橡皮筋框的绘制样式，与颜色复选框的值关联
    context.beginPath();
    context.rect(rubberBand.x0, rubberBand.y0, rubberBand.x1 - rubberBand.x0, rubberBand.y1 - rubberBand.y0);
    context.stroke();

    // 剪辑区域相关代码
    // context.clip();
    // context.fillStyle = 'red';
    // context.fillRect(0, 0, canvas.width, canvas.height);  // 因为有剪辑区域，所以直接全填充

    context.restore();
}

/**
 * 绘制两个圆，圆的颜色使用默认的黑色
 * @param r1
 * @param r2
 */
function drawCircle(r1, r2) {
    // 画第一个圆
    context.beginPath();
    context.arc(rubberBand.x0, rubberBand.y0, r1, 0, 2 * Math.PI);
    context.stroke();
    // 画第二个圆
    context.beginPath();
    context.arc(rubberBand.x1, rubberBand.y1, r2, 0, 2 * Math.PI);
    context.stroke();
}

/**
 * 初始化函数，游戏over之后重新开始就需要调用
 */
function Init() {
    // saveDrawingSurface();
    loc = {
        x: undefined,
        y: undefined
    }

    if (time) {
        clearInterval(time);
    }
    image.src = "bc.jpg"  // 设置背景图片的源
    strokeColor.value = "red";  // 默认绘制颜色
    dragging = false;  // 非拖放状态
    gaming = false;
    clearContext(canvas);
    drawGrid('lightgray', 10, 10);
}

function calculateDistance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow((y1 - y0), 2) + Math.pow((x1 - x0), 2));
}

function circleGame() {
    // 随机生成半径
    let r1 = (Math.random() + 0.25) * 100;
    let r2 = (Math.random() + 0.25) * 100;
    drawCircle(r1, r2);
    // 计算橡皮筋的对角线长
    let r = calculateDistance(rubberBand.x0, rubberBand.y0, rubberBand.x1, rubberBand.y1);
    // 如果半径之和大于对角线，表示两个圆碰到了
    if (r < r1 + r2) {
        clearContext(canvas);
        context.fillStyle = overPatten;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        drawRubberBand(rubberBand)
        drawCircle(r1, r2);
    }
}

/**
 * 生成随机整数
 * @param num
 * @returns {number}
 */
function rand(num) {
    return Math.floor(Math.random() * num + 1);
}

function drawGame() {
    let r1 = rr1;
    let r2 = rr2;
    let speedX0 = rand(10);
    let speedY0 = rand(10);
    let speedX1 = rand(10);
    let speedY1 = rand(10);
    if (rubberBand.x0 + k.x0 * speedX0 > context.canvas.width - r1 || rubberBand.x0 + k.x0 * speedX0 < r1)
        k.x0 = -k.x0;
    if (rubberBand.y0 + k.y0 * speedY0 > context.canvas.height - r1 || rubberBand.y0 + k.y0 * speedY0 < r1)
        k.y0 = -k.y0;
    if (rubberBand.x1 + k.x1 * speedX1 > context.canvas.width - r2 || rubberBand.x1 + k.x1 * speedX1 < r2)
        k.x1 = -k.x1;
    if (rubberBand.y1 + k.y1 * speedY1 > context.canvas.height - r2 || rubberBand.y1 + k.y1 * speedY1 < r2)
        k.y1 = -k.y1;
    rubberBand.x0 = rubberBand.x0 + k.x0 * speedX0;
    rubberBand.y0 = rubberBand.y0 + k.y0 * speedY0;
    rubberBand.x1 = rubberBand.x1 + k.x1 * speedX1;
    rubberBand.y1 = rubberBand.y1 + k.y1 * speedY1;

    clearContext(canvas);
    drawGrid('lightgray', 10, 10);
    drawCircle(r1, r2);

    // 将判断提到移动事件外，可以有效解决鼠标不动，就不会over的bug。但移出画布后的坐标还是有点小问题。
    if ((calculateDistance(rubberBand.x0, rubberBand.y0, loc.x, loc.y) < rr1) || (calculateDistance(rubberBand.x1, rubberBand.y1, loc.x, loc.y)) < rr2) {
        clearContext(canvas);
        context.fillStyle = overPatten;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        clearInterval(time);
    }
}

/* -----事件响应----- */
image.addEventListener("load", ev => {
    // 使用第二块画布的方式，缩放图像填充
    let canvasTemp = document.createElement('canvas');
    let contextTemp = canvasTemp.getContext('2d');
    canvasTemp.width = 600;
    canvasTemp.height = 400;
    contextTemp.drawImage(image, 0, 0, 1728, 1080, 0, 0, 600, 400);
    overPatten = context.createPattern(canvasTemp, 'no-repeat');
})

canvas.addEventListener("mousedown", ev => {
    dragging = true;
    loc = windowToCanvas(ev.clientX, ev.clientY);  // 获取当前鼠标坐标
    mousedown.x = loc.x;  // 坐标存储到点击坐标中
    mousedown.y = loc.y;
    drawingSurfaceImageData = saveDrawingSurface(canvas);  // 保存刚点下去的图像，即上次拖动结束的图像，对于第一次，就保存了背景
})

canvas.addEventListener("mousemove", ev => {
    if (dragging) {
        // 1.记录当前坐标
        loc = windowToCanvas(ev.clientX, ev.clientY);
        // 2、更新橡皮筋框位置
        rubberBand = updateRubberBand(loc);
        // 3、清屏
        clearContext(canvas);
        // 4、恢复原图
        restoreDrawingSurface(canvas, drawingSurfaceImageData);  // 恢复到上一次点击拖动结束，即这次刚点下去的时候的图像
        // 5、绘制新的橡皮筋框
        drawRubberBand(rubberBand)  // 绘制橡皮筋框
    }
    if (gaming) {
        loc = windowToCanvas(ev.clientX, ev.clientY);
    }
})

canvas.addEventListener("mouseup", ev => {
    rubberBand = updateRubberBand(loc);  // 这一步可以有效避免只点击，不移动，导致的绘图bug
    clearContext(canvas);
    restoreDrawingSurface(canvas, drawingSurfaceImageData);
    drawRubberBand(rubberBand)  // 绘制橡皮筋框
    circleGame();  // 这里确实没办法恢复之前的橡皮筋框了，因为和背景一体了
    dragging = false;
})

/* -----控件系列----- */
// 样式复选框
strokeStyleSelect.addEventListener("change", ev => {
    let index = strokeStyleSelect.selectedIndex
    strokeColor.value = strokeStyleSelect.options[index].value;
})

// 重置按钮
resetButton.addEventListener("click", ev => {
    Init();
})

// 擦除全部按钮，对于背景的绘制有待修改
eraseAll.addEventListener("click", ev => {
    clearContext(canvas);
    drawGrid('lightgray', 10, 10);
})

// Guide wires

gameButton.addEventListener("click", ev => {
    Init();
    gaming = true;
    rr1 = 100;
    rr2 = 100;
    rubberBand.x0 = 100;
    rubberBand.y0 = 100;
    rubberBand.x1 = 500;
    rubberBand.y1 = 300;
    time = setInterval(drawGame, 30);
})

/* -----初始化----- */
Init();
