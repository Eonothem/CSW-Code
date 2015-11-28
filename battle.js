var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//ctx.fillRect(0,0,canvas.width,canvas.height);

var strokeWidth = 12
var boxHeight = canvas.height/5;
var boxWidth = canvas.width-strokeWidth;

var meme = 4;
var currentSelection = 0;
var menuItems = 4;
var curText = "ATK";

//ctx.beginPath();
//ctx.lineWidth=strokeWidth;
//ctx.strokeStyle="#3399FF";
//ctx.rect(strokeWidth/2,canvas.height-(boxHeight+strokeWidth/2),boxWidth,boxHeight);
//ctx.stroke();

update();

function update(){
requestAnimationFrame(update);
	drawBG();
}

function drawBG(){
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	ctx.fillStyle = "blue";
	ctx.font="30px Arial";
	ctx.fillText(currentSelection,10,50);
	
	ctx.fillStyle = "red";
	ctx.fillText(curText,100,50);
}

function showMessage(selectionNumber){
	switch(selectionNumber){
		case 0:
			curText = "ATK";
			break;
		case 1:
			curText = "TLK";
			break;
		case 2:
			curText = "ITM";
			break;
		case 3:
			curText = "RUN";
			break;
	}
}

function drawMessage(text){
	
}

document.addEventListener('keydown', function(event) {

	
    if(event.keyCode == 37) {
        currentSelection--;
		
    }
    else if(event.keyCode == 39) {
        currentSelection++;
    }
	
	if(event.keyCode == 13){
		showMessage(currentSelection);
	}
	
	if(currentSelection < 0){
		currentSelection = menuItems-1;
	}
	
	currentSelection = currentSelection%menuItems;

});

//ctx.font = "30px Garamond";
//ctx.fillText("Hello World",canvas.width-200,canvas.height);