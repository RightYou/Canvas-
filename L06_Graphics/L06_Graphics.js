/*
    Function:  L06_Graphics
    Author:    WuJoel
    BuildDate: 2020-11-09
    Version:   Alpha
*/

/* -----变量定义----- */
canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");
image = new Image();

/* -----事件监听----- */
image.addEventListener("load", ev => {
    let canvasWidth = context.canvas.width;
    let canvasHeight = context.canvas.height;

    context.drawImage(image, 0, 0);

    context.drawImage(image, 0, 410, 300, 200);

    context.drawImage(image, image.width / 3, image.height / 3, image.width / 3, image.height / 3,
        610, 0, canvasWidth/ 3, canvasHeight / 3);

    // let patten = context.createPattern(image, "repeat");
    // // context.fillStyle = patten;
    // // context.fillRect(0,0,context.canvas.width,context.canvas.height);
    // context.drawImage(image, image.width / 3, image.height / 3, image.width / 3, image.height / 3, context.canvas.width / 3, context.canvas.height / 3, context.canvas.width / 3, context.canvas.height / 3);
})

/* -----初始化----- */
image.src = "im.jpg"
