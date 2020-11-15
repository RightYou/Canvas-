/*
    Function:  share_functions
    Author:    WuJoel
    BuildDate: 2020-11-02
    Version:   Alpha
*/

/* -----函数定义----- */
/**
 * 将Windows窗体的坐标转换为画布坐标
 * @param x
 * @param y
 * @returns {{x: number, y: number}}
 */
function windowToCanvas(x, y) {
    // 获取边框
    let box = canvas.getBoundingClientRect();
    let boxLeft = box.left, boxTop = box.top;

    // 获取border+padding
    let style = window.getComputedStyle(canvas);
    let borderLeft = parseFloat(style["border-left-width"]),
        borderTop = parseFloat(style["border-top-width"]),
        paddingLeft = parseFloat(style["paddingLeft"]),
        paddingTop = parseFloat(style["paddingTop"]);

    // 获取坐标差值
    let xLeft = boxLeft + borderLeft + paddingLeft,
        yTop = boxTop + borderTop + paddingTop;

    return {
        x: x - xLeft,
        y: y - yTop
    };
}

/**
 * 记录当前画布状态
 */
function saveDrawingSurface(canvas) {
    let context = canvas.getContext("2d");
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * 恢复记录的画布
 */
function restoreDrawingSurface(canvas, drawingSurfaceImageData) {
    let context = canvas.getContext("2d");
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

/**
 * 清空画板
 * @param canvas
 */
function clearContext(canvas) {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height)
}
