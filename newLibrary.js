//Create a stage by getting a reference to the canvas
var canvas = document.getElementById("canvas");
var renderList = new createjs.Stage("canvas");


/*
    HAPHAZARD-GUI-STUFF
    ------------------------

    This is terrible practice, but it makes it presentable
    Fix this when you care aboug graphics
*/
//Blue background fill
var bgRect = new createjs.Rectangle(0,0,canvas.width,canvas.height);
var shape = new createjs.Shape();
shape.graphics.beginFill("#2980b9").drawRect(bgRect.x,bgRect.y,bgRect.width,bgRect.height);
renderList.addChild(shape);

var dialogRect = new createjs.Shape();
shape.graphics.beginFill("#95a5a6").drawRect(0,canvas.height-canvas.height/4,canvas.width,1000);
renderList.addChild(shape);

var dialogRect = new createjs.Shape();
shape.graphics.beginFill("#2c3e50").drawRect(0,canvas.height-canvas.height/4.5,canvas.width,1000);
renderList.addChild(shape);


//Selection Item (DEBUG)
//Shows the current selection option you are on (used for debug only)
var selectionText = new createjs.Text("EHLL", "20px Arial", "white");
selectionText.x = 0;
selectionText.y =0;
renderList.addChild(selectionText);


//=========================================================================================
//=---------------------------------------------------------------------------------------=
//=========================================================================================


/*
    Game Loop
    ---------------

    The "heart" of the game.
    The ticker creates a tick so the game updates at 60fps.
*/


createjs.Ticker.addEventListener("tick",gameLoop);
createjs.Ticker.framerate = 60;
//First we set up our state machine info

var baseMenuOptions = ["ATTK", "TALK", "ITEM", "FLEE"];
var baseMenuLeadTo = ["SelectAttackState", "SelectDialogState", "SelectItemState", "EscapeState"];

/*
        //SwitchMenuOption
    
    Attack, Item, and Talk all have a function called use, which then take an entity as a paramater
    So attack.use(enemy), would use the attack on the enemy

    (maybe a target thing like (TARGET = "FREIND": TARGET = "ENEMY" : TARGET = "BOTH"))
       
*/


var stackIt = new StateStack();
stackIt.push(new MenuOptionState(gStateMachine, baseMenuOptions, baseMenuLeadTo));

var gStateMachine = new StateMachine();
var baseMenuOptionState = new MenuOptionState(gStateMachine, baseMenuOptions, baseMenuLeadTo)

gStateMachine.addState("BaseMenuState", baseMenuOptionState);
gStateMachine.addState("SelectAttackState", new EmptyState());
gStateMachine.changeState("BaseMenuState");

//First we update the game logic
//Then we render the graphics that go with the logic
function gameLoop(event){
    update(event);
    render(event);
}

//Updates the state machine
function update(event){
    gStateMachine.update();
}

//Updates the graphical representations of the input
function render(event){
    renderList.update();
}
const DEBUG_LOG_RATE = 50;

//=========================================================================================
//=---------------------------------------------------------------------------------------=
//=========================================================================================

function StateStack(){
    var stack = [];
    stack.push(new EmptyState());

    this.update = function(){
        var top = stack[stack.length-1];

        top.update();
    }

    this.push = function(newState){
        var top = stack[stack.length-1];
        top.onExit();
        console.log("Exited "+top.name);
        stack.push(newState);
        newState.onEnter();
        console.log("Entered "+top.name);
    }

    this.pop = function(){
        var top = stack[stack.length-1];
        top.onExit();
        console.log("Exited "+top.name);
        stack.pop();
        top = stack[stack.length-1];
        top.onEnter();
        console.log("Entered "+top.name);
    }
}

function StateMachine(){
    var states = [];
    var currentState = new EmptyState();
    var currentStateName = "EmptyState";

    this.update = function(){
        currentState.update();
        if(createjs.Ticker.getTicks() % DEBUG_LOG_RATE == 0){console.log("Updated "+currentStateName);}
    }

    this.changeState = function(stateName){
        currentState.onExit();
        console.log("Exited "+currentStateName);

        currentState = states[stateName];
        currentStateName = stateName;

        currentState.onEnter();
        console.log("Entered "+currentStateName);
    }

    this.addState = function(stateName, state){
        states[stateName] = state;
    }
}

//=========================================================================================
//=---------------------------------------------------------------------------------------=
//=========================================================================================

/*
    EmptyState
    --------------------
    Does nothing
    Use this for placeholders
*/

function EmptyState(){
    this.name = "EmptyState";
    this.update = function(){}
    this.onEnter = function(){}
    this.onExit = function(){}
}

/*
    MenuOptionState
    --------------------

    Params

    Controls selections in a dialog like manner 
    Reads input from the keyboard and when the uses preses enter when they are on a s
*/

function MenuOptionState(stateMachine, selectionOptions, selectionLeadStates){
    var currentOption = 0;
    var textGraphics = [];
    var textSpacing = 120;
    var fontSize = 40;    
    //TODO
    //Replace this with a function that will actually center the stuff based on the size
    var textXOffset = 100;
    var textYOffset = canvas.height-canvas.height/6
    this.name = "menuOptionState";
    this.onEnter = function(){
        for(i = 0; i < selectionOptions.length; i++){
            textGraphics[i] = new createjs.Text(selectionOptions[i], "bold "+fontSize+"px Calibri", "white");
            textGraphics[i].x = (textSpacing*i)+textXOffset;
            textGraphics[i].y = textYOffset;
            renderList.addChild(textGraphics[i]);  
        }
    }

    this.onExit = function(){
        for(i = 0; i < textGraphics.length; i++){
            renderList.removeChild(textGraphics[i]);  
        }
    }

    this.update = function(){

        Mousetrap.bind("z", function(){
            stateMachine.changeState(selectionLeadStates[currentOption]);
        });

        Mousetrap.bind('right', function()
        { 
            currentOption++;
        });

        Mousetrap.bind('left', function()
        { 
            currentOption--;
        });

        if(currentOption>textGraphics.length-1){
            currentOption = 0;
        }else if(currentOption<0){
            currentOption = textGraphics.length-1;
        } 

        selectionText.text = currentOption;
        for(i = 0; i < textGraphics.length; i++){
            if(i == currentOption){
                textGraphics[i].color = "yellow";
            }else{
                textGraphics[i].color = "white";
            }
        }
    }
}
