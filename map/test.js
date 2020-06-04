

//基本設定
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//圖片先創陣列，再個別宣告圖片
var GreenFish = new Array();
GreenFish[0] = new Image();
GreenFish[0].src = '../GUI/Gfish0.png';
GreenFish[1] = new Image();
GreenFish[1].src = '../GUI/Gfish1.png';





//GUI 潛艇
var GUIsubmarine = new Image();
GUIsubmarine.src = "../GUI/submarine.png";
var submarine_hp = 80;

canvas.addEventListener("click", caculate);
var start = setInterval(move, 100);

//計時功能
var timer = 30;
var TimeStart = setInterval(timeAdd, 1000);
function timeAdd() {
    timer -= 1;
    if (timer < 0) {
        clearInterval(TimeStart);
        clearInterval(start);
        GameOverCoin = coin;
        if (GameOverCoin < 20) {
            localStorage.setItem('rank_3', "oneStar");
        }
        else if (GameOverCoin < 40) {
            localStorage.setItem('rank_3', "twoStar");
        }
        else { localStorage.setItem('rank_3', "threeStar"); }
        GameOverCoin += parseInt(localStorage.getItem('Coin'));
        localStorage.setItem('Coin', GameOverCoin);
        localStorage.setItem("item", JSON.stringify(item))
        coin = 0;
        location.replace("../RESULT/success.html");
    }
}


function Pro(x, y, dx, dy, sqm) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.sqm = sqm;
    this.draw = function () {
        //ctx.fillRect( this.x, this.y, this.sqm, this.sqm);

        ctx.drawImage(GreenFish[this.sqm], this.x, this.y, 100, 100);
    }

    this.change = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.sqm += 1;
        if (this.sqm >= GreenFish.length) { this.sqm = 0; }
        this.draw();
    }
}

//金幣動畫工廠
function moneyPro(x, y) {
    this.x = x;
    this.y = y;
    if (blingCoin.length >= 1) {
        for (i = 0; i < blingCoin.length; i++) {
            ctx.drawImage(coinFish, blingCoin[i].x + 25, blingCoin[i].y + 25, 50, 50);
        }
        if (blingCoin.length >= 3) {
            blingCoin.shift();
        }
    }
}



var FishArray2 = [];
create2();
function create2() {
    for (var i = 0; i < 40; i++) {
        var x = Math.random() * (-30) - 100;
        var y = Math.random() * innerHeight;
        var dx = Math.random() * 20 + 20;
        var dy = Math.random();
        var sqm = Math.floor(Math.random() * 2);

        FishArray2.push(new Pro(x, y, dx, dy, sqm));
    }
}

function move() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.drawImage(background, 0, 0, innerWidth, innerHeight);
    submarine();
    for (let i = 0; i < FishArray2.length; i++) {
        FishArray2[i].change();
    }
    moneyPro();
    if (FishArray2.length < 20) {
            create();
        } else { };
    //清除掉超出螢幕的魚
    for (let i = 0; i < FishArray2.length; i++) {
        if (FishArray2[i].x > innerWidth || FishArray2[i].y > innerHeight) {
            FishArray2.splice(i, 1);
        }
    }
}

var coin = 0;
var blingCoin = new Array;

function caculate(evt) {
    (BGMflag == false)? BGmusic.play():0;
    let a = 57;
    for (var i = 0; i < FishArray2.length; i++) {
        var Posx = evt.offsetX - (FishArray2[i].x + 50);
        var Posy = evt.offsetY - (FishArray2[i].y + 50);
        let b = Math.hypot(Posx, Posy);
        if (b < a) {
            a = b;
            var theNearest = i + 1;
        } else { };
    }

    if (theNearest) {
        theNearest -= 1;
        coin += 1;
        blingCoin.push(new moneyPro(FishArray2[theNearest].x, FishArray2[theNearest].y));
        FishArray2.splice(theNearest, 1);
        audioEffect.play();
    }
}

