// .....借用已有函数.....
let heart = {};

function pathHeart() {
    context.beginPath();

    context.moveTo(heart.x, heart.y);
    console.log(heart.x,heart.y)
    context.quadraticCurveTo(heart.x - heart.deltX, heart.y - heart.deltY,
        heart.x - 2 * heart.deltX, heart.y);

    context.quadraticCurveTo(heart.x - heart.w / 2, heart.y + heart.h / 2,
        heart.x, heart.y + heart.h);

    context.quadraticCurveTo(heart.x + heart.w / 2, heart.y + heart.h / 2,
        heart.x + 2 * heart.deltX, heart.y);

    context.quadraticCurveTo(heart.x + heart.deltX, heart.y - heart.deltY,
        heart.x, heart.y);
    context.closePath();
}

function pathFullHeart(point) {
    heart.deltX = 50;
    heart.deltY = 50;
    heart.w = heart.deltX * 6.5;
    heart.h = canvas.height / 2;
    // heart.x = 0;
    // heart.y = -heart.h / 2;
    heart.x = point.x;
    heart.y = point.y;
    context.save();
    context.scale(0.1, 0.1);
    pathHeart();
    context.restore();
}

function randColor() {
    let colorR = parseInt(Math.random() * 255);
    let colorG = parseInt(Math.random() * 255);
    let colorB = parseInt(Math.random() * 255);
    return 'rgba(' + colorR + ',' + colorG + ',' + colorB + ')';
}
