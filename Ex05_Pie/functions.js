/*
    Function:  封装一些图形绘制方法，用于Ex05_Pie调用
    Author:    WuJoel
    BuildDate: 2020-09-28
    Version:   Alpha
*/


// 1、变量定义
const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");


//2、图形方法定义
/*
	Function：drawCircle（画圆/扇形/圆弧）
	Params：circle对象（圆心、半径、起始弧度、绘制方向）
			style对象（线宽、线条描边或填充色）
			isFill（是否填充）
	Returns：none
	version：1.0
*/
function drawCircle(circle, style, isFill) {
    ctx.save();  // 保存当前绘画状态，包括一些参数的设置，这样可以保证不影响其他绘图
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle, circle.counterClockWise);
    ctx.lineWidth = style.lineWidth;
    if (!isFill) {
        ctx.strokeStyle = style.color;
        ctx.stroke();
    } else {
        ctx.fillStyle = style.color;
        ctx.fill();
    }
    ctx.restore();
}

/*
	Function：drawLine（画线）
	Params：line对象（起始点坐标、终止点坐标）
			style对象（线宽、线条描边或填充色）
			isFill（是否填充）
	Returns：none
	version：1.0
*/
function drawLine(line, style, isFill) {
    ctx.save();
    ctx.moveTo(line.x0, line.y0);
    ctx.lineTo(line.x1, line.y1);
    ctx.lineWidth = style.lineWidth;
    if (isFill) {
        ctx.strokeStyle = style.color;
        ctx.stroke();
    }
    ctx.restore();
}

/*
	Function：drawText（绘制文本）
	Params：text对象（文本内容、起始点坐标）
			style对象（字体大小、字体、线宽、文本描边或填充色、文本起始点位置、文本起始点坐标）
			isFill（是否填充）
	Returns：文本大小对象（宽度、高度）
	version：1.0
*/
function drawText(text, style, isFill) {
    let textSize = {};

    ctx.save();
    ctx.font = style.fontSize + "px " + style.fontFamily;
    ctx.textAlign = style.hAlign;
    ctx.textBaseline = style.vAlign;
    ctx.lineWidth = style.lineWidth;
    ctx.translate(text.x, text.y);

    textSize.width = ctx.measureText(text.text).width;
    textSize.height = style.fontSize;

    if (isFill) {
        ctx.fillStyle = style.color;
        ctx.fillText(text.text, 0, 0);
    } else {
        ctx.strokeStyle = style.color;
        ctx.strokeText(text.text, 0, 0);
    }
    ctx.restore();

    return textSize;
}

/*
	Function：drawRect（绘制矩形）
	Params：rect对象（起始点坐标、矩形宽度、高度）
			style对象（线宽、描边或填充色）
			isFill（是否填充）
	Returns：none
	version：1.0
*/
function drawRect(rect, style, isFill) {
    ctx.save();
    ctx.lineWidth = style.lineWidth;

    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    if (isFill) {
        ctx.fillStyle = style.color;
        ctx.fill();
    } else {
        ctx.strokeStyle = style.color;
        ctx.stroke();
    }
    ctx.restore();

}


