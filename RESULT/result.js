
var coin = localStorage.getItem('Coin');
var item = JSON.parse(localStorage.getItem("item"));
var List = document.getElementById("itemList");
var itemArray = new Array();
    itemArray[0] = new Image();
    itemArray[0].src = '../GUI/addHP.png';
    itemArray[1] = new Image();
    itemArray[1].src = '../GUI/coinDouble.png';
var recover = 0;
var coinDouble = 0;
var bomb = 0;
if(item)
for(var i = 0 ; i< item.length; i++){
    if (item[i] = "Recover")
    {  recover+=1;}
    else if (item[i] = "Double")
    {   coinDouble += 1;}
	else if (item[i] = "Bomb"){
		bomb += 1;}
}

List.innerHTML = "目前金幣數："+coin+"<br><img src='../GUI/addHP.png'>："+recover+"<img src='../GUI/coinDouble.png'>：" + coinDouble + "<img src='../GUI/time.png'>："+ bomb;
