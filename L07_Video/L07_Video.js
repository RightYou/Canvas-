/*
    Function:  L07_Video
    Author:    WuJoel
    BuildDate: 2020-11-23
    Version:   Alpha
*/

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let video = document.getElementById("myVideo")

video.oncanplay = function () {
    video.play();
    drawFrame();
}

function drawFrame() {
    if (!video.ended) {
        let tempCanvas = document.createElement("canvas");
        tempCanvas.height = 400;
        tempCanvas.width = 600;
        let tempContext = tempCanvas.getContext("2d");
        tempContext.globalAlpha = 0.5
        tempContext.drawImage(video, 0, 0);
        let imageData = tempContext.getImageData(0, 0, 600, 400);
        for (let i = 0, len = imageData.data.length; i < len; i += 4) {
            // // 使用加权平均
            let gray = Math.floor(imageData.data[i] * 0.3 + imageData.data[i + 1] * 0.59 + imageData.data[i + 2] * 0.11);
            imageData.data[i] = gray;
            imageData.data[i + 1] = gray;
            imageData.data[i + 2] = gray;
        }
        context.putImageData(imageData, 0, 0);
        setTimeout(drawFrame, 10);
    }
}