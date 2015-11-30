createjs.Ticker.addEventListener("tick",gameLoop);
createjs.Ticker.framerate = 60;

var gameStack = new StateStack();

var enemies = [new Entity("Badguy1", 100, 20)];
var party = [new Entity("Hero1", 100, 20), new Entity("Hero2", 80,50)];

gameStack.push(new NewBattleState(enemies, party))

//First we update the game logic
//Then we render the graphics that go with the logic
function gameLoop(event){
    update(event);
    render(event);
}

//Updates the state machine
function update(event){
   //battleStack.update();
   gameStack.update();
}

//Updates the graphical representations of the input
function render(event){
    //renderList.update();
}