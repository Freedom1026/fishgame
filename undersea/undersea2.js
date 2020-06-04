

//基本設定
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//圖片先創陣列，再個別宣告圖片
var photoArray = new Array();
photoArray[0] = new Image();
photoArray[0].src = '../GUI/Gfish0.png';
photoArray[1] = new Image();
photoArray[1].src = '../GUI/Gfish1.png';

var background = new Image();
background.src = '../GUI/background.jpg';

var coinFish = new Image();
coinFish.src = '../GUI/coinFish.png';

var GUIcoin = new Image();
GUIcoin.src = '../GUI/coin.png';

var TimeBomb = new Image();
TimeBomb.src = '../GUI/timer.png';

//音效
var audioEffect = new Audio("../GUI/ding.wav");
var BGmusic = new Audio("../GUI/Kindergarden.mp3");


//獲得道具總列
var item = JSON.parse(localStorage.getItem("item"));
var itemA = item[0];

//道具圖片
var itemArray = new Array();
itemArray[0] = new Image();
itemArray[0].src = '../GUI/addHP.png';
itemArray[1] = new Image();
itemArray[1].src = '../GUI/coinDouble.png';
itemArray[2] = new Image();
itemArray[2].src = '../GUI/time.png';

//GUI 潛艇
var GUIsubmarine = new Image();
GUIsubmarine.src = "../GUI/submarine.png";
var submarine_hp = 100;

var Locker = new Image();
Locker.src = "../GUI/lock.png";

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
            localStorage.setItem('rank_2', "1stars");
        }
        else if (GameOverCoin < 40) {
            localStorage.setItem('rank_2', "2stars");
        }
        else { localStorage.setItem('rank_2', "3stars"); }
        GameOverCoin += parseInt(localStorage.getItem('Coin'));
        localStorage.setItem('Coin', GameOverCoin);
        localStorage.setItem("item", JSON.stringify(item))
        coin = 0;
        location.replace("../RESULT/success.html");
    }
}

		//音效撥放功能
		var flagBG = false;
		var flagAD = false;
		function bgPlay(bbk){
			console.log(bbk);
			if(flagBG == false){
				flagBG = true;
				bbk.style.backgroundImage = "url('../GUI/sound-on.png')";
				BGmusic.play();
			}
			else if(flagBG == true){
				flagBG = false;
				bbk.style.backgroundImage = "url('../GUI/sound-off.png')";
				BGmusic.pause();
			}
		}
		function collisionClick(bbk){
			console.log(bbk);
			if(flagAD == false){
				flagAD = true;
				bbk.style.backgroundImage = "url('../GUI/speaker.png')";
			}
			else if(flagAD == true){
				flagAD = false;
				bbk.style.backgroundImage = "url('../GUI/speaker-off.png')";
			}
		}

//扣體力值
var health = localStorage.getItem("life") - 1;
localStorage.setItem("life", health);
//關卡結束時獲得金幣
var GameOverCoin = 0;

function Pro(x, y, dx, dy, sqm) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.sqm = sqm;
    this.draw = function () {
        //ctx.fillRect( this.x, this.y, this.sqm, this.sqm);

        ctx.drawImage(photoArray[this.sqm], this.x, this.y, 100, 100);
    }

    this.change = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.sqm += 1;
        if (this.sqm >= photoArray.length) { this.sqm = 0; }
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

//潛艇動畫工廠
var subUpDown = -30;
function submarine() {
    if (subUpDown < innerHeight / 2) {
        subUpDown += 3;
    }

    //GUI BAR
    ctx.drawImage(GUIsubmarine, innerWidth - 500, subUpDown, 240, 200);
    ctx.save();
    ctx.fillStyle = "#e34f4f";
    ctx.fillRect(innerWidth - 460, subUpDown + 230, submarine_hp, 20);
    ctx.restore();
    //設定字體
    ctx.font = '48px serif';
    //金幣獲得數
    ctx.drawImage(GUIcoin, 800, 30, 250, 40);
    ctx.fillText(coin, 920, 65);
    //計時器
    ctx.drawImage(TimeBomb, 500, 30, 250, 40);
    ctx.fillText(timer, 620, 65);
    //道具
    itemA = item[0];
    if(itemA){
        switch (itemA) {
                case 'Recover':
                    ctx.drawImage(itemArray[0], 200,30);
                    break;
                case 'Double':
                    ctx.drawImage(itemArray[1], 200,30);
                    break;
                case 'Bomb':
                    ctx.drawImage(itemArray[2], 200,30);
                    break;
                case 'test':
                    ctx.fillText("test", 200, 80);
                    break;                    
                default:
                    console.log("test1");
                    break;
            }
    }
    if (submarine_hp <= 0) {
        clearInterval(start);
        clearInterval(TimeStart);
        localStorage.setItem("item", JSON.stringify(item))
        GameOverCoin = coin;
        coin = 0;
        location.replace("../RESULT/fail.html");
    }

    let c = 102;
    for (var i = 0; i < FishArray.length; i++) {
        var PosSubX = (FishArray[i].x + 50) - (innerWidth - 405);
        var PosSubY = (FishArray[i].y + 50) - (subUpDown + 100);
        let d = Math.hypot(PosSubX, PosSubY);
        if (d < c) {
            c = d;
            submarine_hp -= 1;
        } else { };
    }

}


var FishArray = [];
create();
function create() {
    for (var i = 0; i < 40; i++) {
        var x = Math.random() * (-30) - 100;
        var y = Math.random() * innerHeight;
        var dx = Math.random() * 20 + 3;
        var dy = Math.random();
        var sqm = Math.floor(Math.random() * 2);

        FishArray.push(new Pro(x, y, dx, dy, sqm));
    }
}

function move() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.drawImage(background, 0, 0, innerWidth, innerHeight);
    submarine();
    for (let i = 0; i < FishArray.length; i++) {
        FishArray[i].change();
    }
    moneyPro();
    if (FishArray.length < 20) {
            create();
        } else { };
    //清除掉超出螢幕的魚
    for (let i = 0; i < FishArray.length; i++) {
        if (FishArray[i].x > innerWidth || FishArray[i].y > innerHeight) {
            FishArray.splice(i, 1);
        }

    }
}

var coin = 0;
var blingCoin = new Array;

function caculate(evt) {
    let a = 57;
    for (var i = 0; i < FishArray.length; i++) {
        var Posx = evt.offsetX - (FishArray[i].x + 50);
        var Posy = evt.offsetY - (FishArray[i].y + 50);
        let b = Math.hypot(Posx, Posy);
        if (b < a) {
            a = b;
            var theNearest = i;
        } else { };
    }

    //道具使用
    let e = 50;
    var PosItemX = evt.offsetX - 230;
    var PosItemY = evt.offsetY - 70;
    let f = Math.hypot(PosItemX, PosItemY);
    if (f < e) {
        switch (itemA) {
            case 'Recover':
                submarine_hp += 20;
                console.log("補血了");
                item.splice(0, 1);
                break;
            case 'Double':
                coin *= 2;
                console.log("金錢雙倍");
                item.splice(0, 1);
                break;
            case 'Bomb':
                    coin += FishArray.length;
				    FishArray = [];
				item.splice(0, 1);
                console.log("test3");
                break;
            case 'test':
                console.log("test4");
                item.splice(0, 1);
                break;                    
            default:
                console.log("test1");
                break;
        }
    }

    if (theNearest != null) {
        coin += 1;
        blingCoin.push(new moneyPro(FishArray[theNearest].x, FishArray[theNearest].y));
        FishArray.splice(theNearest, 1);
        (flagAD == true)?  audioEffect.play():audioEffect.pause();
    }



}

