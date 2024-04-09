function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    //draw a circle
    ctx.beginPath();
    ctx.arc(75, 75, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}