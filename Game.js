var canvas = document.getElementById("canvas");
var renderList = new createjs.Stage("canvas");

createjs.Ticker.addEventListener("tick",gameLoop);
createjs.Ticker.framerate = 60;

var bgRect = new createjs.Rectangle(0,0,canvas.width,canvas.height);
var shape = new createjs.Shape();
shape.graphics.beginFill("#2980b9").drawRect(bgRect.x,bgRect.y,bgRect.width,bgRect.height);
renderList.addChild(shape);

var gameStack = new StateStack(false);

var enemies = [new Entity("Badguy1", 100, 20)];
var party = [new Entity("Hero1", 100, 20), new Entity("Hero2", 80,50), new Entity("Hero3", 80,50)];
gameStack.push(new NewBattleState(enemies, party))


var select = false;
Mousetrap.bind("z", function(){select = true});

//First we update the game logic
//Then we render the graphics that go with the logic
function gameLoop(event){
    update(event);
    render(event);
}

//Updates the state machine
function update(event){
   gameStack.update();
   select = false;
}

//Updates the graphical representations of the input
function render(event){
    renderList.update();
}