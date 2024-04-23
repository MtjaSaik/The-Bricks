var check = true;
document.addEventListener("DOMContentLoaded", drawIt);

function starter(){
    if(check){
        check = false;
        document.getElementById("start").style.display = "none";
    }
}

function drawIt() {
    var x = 500;
    var y = 700;
    var dx = 0;
    var dy = 0;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var ctx;
    var paddlex;
    var paddleh;
    var paddlew;
    var rightDown = false;
    var leftDown = false;
    var shiftDown = false;
    var canvasMinX;
    var canvasMaxX;
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var tocke;
    var sekunde;
    var sekundeI;
    var minuteI;
    var intTimer;
    var izpisTimer;
    var start = true;

    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        tocke = 0;
        $("#tocke").html(tocke);
        sekunde = 0;
        izpisTimer = "00:00";
        intTimer = setInterval(timer, 1000);
        return intervalId = setInterval(draw, 10);
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        

        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    //END LIBRARY CODE
    function draw() {
        clear();
        circle(x, y, 10);
        x += dx;
        y += dy;
    }

    function init_paddle() {
        paddlex = (WIDTH / 2) - 50;
        paddleh = 10;
        paddlew = 100;
    }

    //nastavljanje leve in desne tipke
    function onKeyDown(evt) {
        if (evt.keyCode == 38)
            shiftDown = true;
        else if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 38)
            shiftDown = false;
        else if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function init_mouse() {
        canvasMinX = $("canvas").offset().left;
        canvasMaxX = canvasMinX + WIDTH;
    }

    function onMouseMove(evt) {
        if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
            paddlex = evt.pageX - canvasMinX - paddlew / 2;
        }
    }
    $(document).mousemove(onMouseMove);

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 1.2;
        BRICKHEIGHT = 30;
        PADDING = 1;
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
    }

    function timer() {
        if (start == true && check == false) {
            sekunde++;

            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;

            $("#cas").html(izpisTimer);
        }
        else {
            sekunde = 0;
            //izpisTimer = "00:00";
            $("#cas").html(izpisTimer);
        }
    }
    init();
    init_paddle();
    init_mouse();
    initbricks();

    function draw() {
        clear();

        circle(x, y, 10);

        if (x + dx > WIDTH - r || x + dx < r)

            dx = -dx;

        if (y + dy > HEIGHT - r || y + dy < r)

            dy = -dy;

        x += dx;

        y += dy;


        clear();
        circle(x, y, 10);
        //premik ploščice levo in desno


        if (rightDown  && shiftDown) paddlex += 6;
        else if (rightDown) paddlex += 2.5;
        else if (leftDown && shiftDown) paddlex -= 6;
        else if (leftDown) paddlex -= 2.5;



        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
        if (x + dx > WIDTH - (r) || x + dx < r)
            dx = -dx;
        if (y + dy < r)
            dy = -dy;
        else if (y + dy > HEIGHT - r) {
            start = false;
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 1 * ((x - (paddlex + paddlew / 2)) / paddlew);
                dy = -dy;
                start = true;
            }
            else if (y + dy > HEIGHT - r)
                clearInterval(intervalId);
        }
        x += dx;
        y += dy;

        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        //riši opeke
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }


        circle(x, y, 10);
        //premik ploščice levo in desno
        if (rightDown) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 0.5;
            } else {
                paddlex = WIDTH - paddlew;
            }
        }
        else if (leftDown) {
            if (paddlex > 0) {
                paddlex -= 0.5;
            } else {
                paddlex = 0;
            }
        }

        rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
        colwidth = BRICKWIDTH + PADDING;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
        //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy; bricks[row][col] = 0;
            tocke += 1; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
            $("#tocke").html(tocke);
        }
        if (x + dx > WIDTH - r || x + dx < r)
            dx = -dx;
        if (y + dy < r)
            dy = -dy;
        else if (y + dy > HEIGHT - r) {
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 0.6 * ((x - (paddlex + paddlew / 2)) / paddlew);
                dy = -dy;
            }
            else if (y + dy > HEIGHT - r)
                clearInterval(intervalId);
        }
        if(check == false && aa == true){
            dy = -2;
            aa = false;
            }
    }
}
var aa = true;