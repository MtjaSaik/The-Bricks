var check = true;
document.addEventListener("DOMContentLoaded", drawIt);

function starter() {
    if (check) {
        check = false;
        document.getElementById("start").style.display = "none";
    }
}

function drawIt() {
    var x = 250;
    var y = 700;
    var dx = 0;
    var dy = 0;
    var WIDTH;
    var HEIGHT;
    var r = 20;
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
    var num = 0;
    var nbrick;
    var hit = 0;

    var pickaxe = new Array();
    pickaxe[0] = new Image();
    pickaxe[0].src = 'pictures/pickaxe1.png';
    pickaxe[1] = new Image();
    pickaxe[1].src = 'pictures/pickaxe2.png';
    pickaxe[2] = new Image();
    pickaxe[2].src = 'pictures/pickaxe3.png';
    pickaxe[3] = new Image();
    pickaxe[3].src = 'pictures/pickaxe4.png';
    pickaxe[4] = new Image();
    pickaxe[4].src = 'pictures/pickaxe5.png';
    pickaxe[5] = new Image();
    pickaxe[5].src = 'pictures/pickaxe6.png';
    pickaxe[6] = new Image();
    pickaxe[6].src = 'pictures/pickaxe7.png';
    pickaxe[7] = new Image();
    pickaxe[7].src = 'pictures/pickaxe8.png';

    const stone = document.getElementById("stone");
    const deepslate = document.getElementById("deepslate");
    const deepslate_emerald = document.getElementById("deepslate_emerald");
    const deepslate_diamond = document.getElementById("deepslate_diamond");
    const stone_gold = document.getElementById("stone_gold");
    const stone_iron = document.getElementById("stone_iron");

    function win() {
        start = false;
        clearInterval(intAnim);
        clearInterval(intTimer);

        Swal.fire({
            title: "You won.",
            text: "Good game.",
            confirmButtonText: "play again",
            confirmButtonColor: "#949494",
            background: "rgba(255, 255, 255, 0.70)",
            width: '450px',
            customClass: {
                confirmButton: 'confirm',
                title: 'swtitle',
                popup: 'swtext',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    }

    function lose() {
        start = false;
        clearInterval(intAnim);
        clearInterval(intTimer);

        Swal.fire({
            title: "You lose.",
            text: "Better luck next time.",
            confirmButtonText: "retry",
            confirmButtonColor: "#949494",
            background: "rgba(255, 255, 255, 0.70)",
            width: '450px',
            customClass: {
                confirmButton: 'confirm',
                title: 'swtitle',
                popup: 'swtext',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    }

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
        NCOLS = 10;
        nbrick = NROWS * NCOLS;
        BRICKWIDTH = (WIDTH / NCOLS) - 2.2;
        BRICKHEIGHT = 48;
        PADDING = 2;
        /*
            stone - 1
            stone iron - 2
            stone gold - 3
            deepslate - 4
            deepslate diamond - 5
            deepslate emerald - 6
        */

        //    (Math.floor(Math.random() * 3) + 4)    // deepslate
        //    (Math.floor(Math.random() * 3) + 1)    // stone

        BArray = [
            [
                [4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4],
                [(Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4, 4, (Math.floor(Math.random() * 3) + 4)],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, 1, 1, 1],
                [(Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, (Math.floor(Math.random() * 3) + 1), 1],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1)],
            ],
            [
                [(Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4)],
                [4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1],
                [1, 1, (Math.floor(Math.random() * 3) + 1), 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1],
                [(Math.floor(Math.random() * 3) + 1), 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1],
            ],
            [
                [4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4],
                [4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1],
                [1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1)],
            ],
            [
                [4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4)],
                [4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, (Math.floor(Math.random() * 3) + 4), 4, 4, (Math.floor(Math.random() * 3) + 4), 4],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, (Math.floor(Math.random() * 3) + 1)],
                [1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1],
                [(Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1],
            ],
            [
                [4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4],
                [4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, (Math.floor(Math.random() * 3) + 4), 4, 4, 4, 4],
                [(Math.floor(Math.random() * 3) + 1), 1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1)],
                [1, 1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, 1, 1],
                [1, (Math.floor(Math.random() * 3) + 1), 1, 1, 1, 1, 1, 1, (Math.floor(Math.random() * 3) + 1), 1],
            ],
        ];

        let select = Math.floor(Math.random() * 5);
        bricks = BArray[select];
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
    function anim() {
        num++;
    }

    init();
    init_paddle();
    init_mouse();
    initbricks();

    function draw() {
        clear();

        if (num > 7) {
            num = 0;
        }
        ctx.drawImage(pickaxe[num], x - r, y - r, 2 * r, 2 * r)



        if (x + dx > WIDTH - r || x + dx < r)

            dx = -dx;

        if (y + dy > HEIGHT - r || y + dy < r)

            dy = -dy;

        x += dx;

        y += dy;


        //premik ploščice levo in desno


        if (rightDown && shiftDown) paddlex += 6;
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
                    ctx.drawImage(stone, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }

                else if (bricks[i][j] == 2) {
                    ctx.drawImage(stone_iron, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }

                else if (bricks[i][j] == 3) {
                    ctx.drawImage(stone_gold, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }

                else if (bricks[i][j] == 4) {
                    ctx.drawImage(deepslate, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }

                else if (bricks[i][j] == 5) {
                    ctx.drawImage(deepslate_diamond, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }

                else if (bricks[i][j] == 6) {
                    ctx.drawImage(deepslate_emerald, j * (BRICKWIDTH + PADDING) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }


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
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) { //stone
            dy = -dy; bricks[row][col] = 0;
            tocke += 1;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
        }
        else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2) { //stone iron
            dy = -dy; bricks[row][col] = 0;
            tocke += 2;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
        }
        else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3) { //stone gold
            dy = -dy; bricks[row][col] = 0;
            tocke += 3;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
        }
        else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 4) { //deepslate
            dy = -dy; bricks[row][col] = 0;
            tocke += 2;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
        }
        else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 5) { //deepslate diamond
            dy = -dy; bricks[row][col] = 0;
            tocke += 5;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
        }
        else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 6) { //deepslate emerald
            dy = -dy; bricks[row][col] = 0;
            tocke += 8;
            $("#tocke").html(tocke);
            hit++;
            if (hit >= nbrick) {
                dx = 0;
                dy = 0;
                win();
            }
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
            else if (y + dy > HEIGHT - r){
                lose();
                clearInterval(intervalId);
            }
        }
        if (check == false && aa == true) {
            dy = 2;
            intAnim = setInterval(anim, 50);
            aa = false;
        }
    }
}
var aa = true;