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

createjs.Ticker.addEventListener("tick",gameLoop);
createjs.Ticker.framerate = 60;

//=========================
//=-----------------------
//=========================

function EmptyState(){
    this.stateName = "EmptyState";
    this.update = function(){}
    this.onEnter = function(){}
    this.onExit = function(){}
}

function SineAttackState(stateStack, attackLevel){
    this.attackLevel = attackLevel;
    this.stateName = "SineAttackState";
    this.targets = "badguy";

    this.update = function(){}
    this.onEnter = function(){console.log("Attacking "+this.targets+" with SineAttack!")}
    this.onExit = function(){}
}

function SelectTargetState(){
    this.update = function(){console.log("Serchin for targets")};
    this.onEnter = function(){}
    this.onExit = function(){}
}




function SelectMenuOptionState(stateStack, optionList, selectMethod){
        this.stateName = "SelectMenuOptionState";
        var currentSelection = 0;
    
        var selectGraphic = new createjs.Text(currentSelection, "30px Arial", "white");
        selectGraphic.x = 100;
        selectGraphic.y = 100;

    this.onEnter = function(){
        for(i = 0; i < optionList.length; i++){
            console.log(i+": "+optionList[i]);
        }
        renderList.addChild(selectGraphic);
    }
    
    this.update = function(){
        //Selection an Option
        Mousetrap.bind("z", function(){selectMethod(stateStack,currentSelection, optionList);});
    
        //Go Back a menu
        Mousetrap.bind("x", function(){stateStack.pop();});
        //Increment the selection
        Mousetrap.bind('right', function(){currentSelection++});

        
        
        //Decrement the Selection
        Mousetrap.bind('left', function(){currentSelection--;});

        if(currentSelection>optionList.length-1){
            currentSelection = 0;
        }else if(currentSelection<0){
            currentSelection = optionList.length-1;
        } 

        selectGraphic.text = currentSelection;
    }
    
    this.onExit = function(){
        renderList.removeChild(selectGraphic);
        Mousetrap.unbind("z");
        Mousetrap.unbind("x");
        Mousetrap.unbind("right");
        Mousetrap.unbind("left");
    }
}

function basicBattleMenuOption(stateStack,currentSelection){
    if(currentSelection == 0){
        stateStack.push(new SelectMenuOptionState(stateStack, attackOptions, selectAttack));
    }else if(currentSelection == 1){
        stateStack.push(new SelectMenuOptionState(stateStack, regularItems, EmptyState));
    }else if(currentSelection == 2){
         console.log("YUR TALKING");
    }else if(currentSelection == 3){
         console.log("YUR RUNNING");
    }
}

function selectAttack(stateStack, currentSelection, attackOptions){
    var attack = new attackList[attackOptions[currentSelection]];
    stateStack.push(new TargetSelectionState(stateStack, attack));
}

//Act can be commit attack, commit talk, commit item
function TargetSelectionState(stateStack, ActionState){
    this.targets = "badguy";
    this.stateName = "TargetSelectionState";
    ActionState.targets = this.targets; 

    this.update = function(){Mousetrap.bind("z", function(){stateStack.push(ActionState);});}
    this.onEnter = function(){}
    this.onExit = function(){Mousetrap.unbind("z")}
}

var attackList = [];
attackList["SinAttack"] = SineAttackState;

var battleStack = new StateStack();

var basicOptions = ["ATTK", "ITEM", "TALK", "FLEE"];

var regularItems = ["Dank Memes", "Donuts", "Kek Despository"];
var attackOptions = ["SinAttack", "CosAttack", "d/dx", "Integral"];

var entryState = new SelectMenuOptionState(battleStack, basicOptions, basicBattleMenuOption)

battleStack.push(entryState);
Mousetrap.bind("w", function(){battleStack.reset(entryState)});



function StateStack(){
    var stack = [];
    stack.push(new EmptyState());

    this.update = function(){
        var top = stack[stack.length-1];
        
        top.update();
        console.log("Updated "+top.stateName);
    }

    this.push = function(newState){
        var top = stack[stack.length-1];
        top.onExit();
        console.log("Exited "+top.stateName);
        stack.push(newState);
        newState.onEnter();
        console.log("Entered "+newState.stateName);
    }

    this.pop = function(){
        var top = stack[stack.length-1];
        top.onExit();
        console.log("Exited "+top.stateName);
        stack.pop();
        top = stack[stack.length-1];
        top.onEnter();
        console.log("Entered "+top.stateName);
    }

    //Pops off everthing until it reaches EmptyState and then pushes resetTo
    this.reset = function(resetTo){
        console.log("Resetting to "+resetTo.stateName+"!");
        var i = stack.length-1;
        while(i > 0){
            this.pop();
            i--;
        }
        this.push(resetTo);
    }
}

//First we update the game logic
//Then we render the graphics that go with the logic
function gameLoop(event){
    update(event);
    render(event);
}

//Updates the state machine
function update(event){
   battleStack.update();
}

//Updates the graphical representations of the input
function render(event){
    renderList.update();
}

