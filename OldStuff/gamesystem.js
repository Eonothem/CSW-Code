var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



//TODO:
//Figure out how the hell arrays in weakly typed languages work

//---------------------------------------------
//#############################################
//---------------------------------------------

//A state stack is used to control the game

function StateStack(){
	var stateStack = new Array();

	this.update = function(dt){
		var top = stateStack[stateStack.length-1];
		top.update();
	}
	
	this.render = function(){
		var top = stateStack[stateStack.length-1];
		top.render();
	}
	
	this.push = function(state){
		state.onEnter();
		stateStack.push(state);
	}
	
	this.pop = function(){
		var top = stateStack[stateStack.length-1];
		top.onExit();
		stateStack.pop();
	}
}

function EmptyState(stateName){
	this.name = stateName;
	
	this.update = function(dt){
		alert("UPDATE "+this.name);
	}
	
	this.render = function(){
		alert("RENDER "+this.name);
	}
	
	this.onEnter = function(){
		alert("YOU HAVE ENTERED "+this.name);
	}
	
	this.onExit = function(){
		alert("YOU HAVE EXITED "+this.name);
	}
}

function BattleState(stateName){
	this.name = stateName;
	
	this.update = function(dt){
		alert("UPDATE "+this.name);
	}
	
	this.render = function(){
		alert("RENDER "+this.name);
	}
	
	this.onEnter = function(){
		alert("YOU HAVE ENTERED "+this.name);
	}
	
	this.onExit = function(){
		alert("YOU HAVE EXITED "+this.name);
	}
}


function BasicAttack(attackName, attackDamage){
	this.attackName = attackName;
	this.attackDamage = attackDamage;
	
	this.attackEntity = function(entity){
		entity.takeDamage(this.attackDamage);
	}
}

function Entity(name, attack, health){
	this.attack = attack;
	this.name = name;
	this.health = health;
	
	
	this.takeDamage = function(damage){
		this.health = this.health - damage;
	}
	
	this.attackOpponent = function(opponent){
		alert(this.name+" attacked "+opponent.name+"!");
		this.attack.attackEntity(opponent);
	}
	
	this.getInfo = function(){
		return this.name+" | "+this.attack.attackName+" ("+this.attack.attackDamage+" dmg) | "+this.health;
	}
}

//---------------------------------------------
//#############################################
//---------------------------------------------

var player = new Entity("Player", new BasicAttack("Super Punch", 30) ,100);
//alert(player.getInfo());

var enemy = new Entity("Freshman", new BasicAttack("Whine", 20), 50);
//alert(enemy.getInfo());

//player.attackOpponent(enemy);

//alert(enemy.getInfo());



function Rectangle(x, y, width, length, strokeStyle, strokeWidth){
	this.x = x;
	this.y = y;
	this.width = width;
	this.length = length;
	this.strokeStyle = strokeStyle;
	this.strokeWidth = strokeWidth;
}

var basicMenuItems = ["ATK", "TLK", "ITM", "RUN"];

var currentMenuScreen = basicMenuItems;

gameLoop();
function gameLoop(){
requestAnimationFrame(gameLoop);
	update();
	render();
}

function update(){
	//playerTurn()
	//enemyTurn()
}

function render(){
	drawBG();
	renderMenu();
}

function renderMenu(){
	
}

function drawBG(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#2980b9";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawRect(rectangle){
	ctx.beginPath();
	ctx.lineWidth =rectangle.strokeWidth;
	ctx.strokeStyle = rectangle.strokeStyle;
	ctx.rect(rectangle.x,rectangle.y,rectangle.length,rectangle.width);
	ctx.stroke();
	ctx.closePath();
}

//var gameStack = new StateStack();
//var battle = new BattleState("VS CHARTER STUDENT!");

