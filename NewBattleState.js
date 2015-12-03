//This is where the battle logic happens
//var enemyList = 0;

function battleData(){
    this.enemies = 0;
    this.party = 0;
}

var actionOptionList = ["Attack", "Talk", "Item", "Flee"];

function NewBattleState(enemies, party){
    this.stateName = "BattleState";

    battleData.party = party;
    battleData.enemies = enemies;

    var battleStack = new StateStack(true);

    var initialState = new SelectTargetState(battleStack, party, selectPlayer)

    Mousetrap.bind('x', function(){battleStack.pop()});
    Mousetrap.bind('w', function(){battleStack.reset(initialState)});

    var selectGraphic;

    var playerHealthGraphic;
    var enemyHealthGraphic;

    this.onEnter = function(){
        battleStack.push(initialState);
        
        selectGraphic = new createjs.Text("WEW LAD", "30px Arial", "white");
        selectGraphic.x = 0;
        selectGraphic.y = 0;
        renderList.addChild(selectGraphic);

        playerHealthGraphic = new createjs.Text(party[0].hp, "30px Arial", "white");
        playerHealthGraphic.x = 400;
        playerHealthGraphic.y = 100;
        renderList.addChild(playerHealthGraphic);

        enemyHealthGraphic = new createjs.Text(battleData.enemies[0].hp, "30px Arial", "white");
        enemyHealthGraphic.x = 200;
        enemyHealthGraphic.y = 100;
        renderList.addChild(enemyHealthGraphic);
    }


    this.update = function(){
        battleStack.update();
        selectGraphic.text = battleStack.getTop().stateName;
        
        playerHealthGraphic.text = party[0].hp;
        enemyHealthGraphic.text = battleData.enemies[0].hp;
        

        //Give options to the heroes for action selection
        //When the action for one hero is complete, move to the next hero
        //When all of the hero actions are complete, we move to the EnemyAttackState
        //When that is over we return to the first step
    }

    

    this.onExit = function(){

    }

}

function selectPlayer(battleStack, player){
    battleStack.push(new OptionSelectState(battleStack, actionOptionList, actionOptionSelection, player));
}

var attackDatabase = [];
attackDatabase["SinAttack"] = SineAttackState;

function SineAttackState(stateStack, target){
    this.stateName = "SineAttackState";

    this.update = function(){}
    this.onEnter = function(){
        console.log("Attacking "+target.name+" with SineAttack!");
        target.hp = target.hp - 50;
        console.log(battleData.enemies[0].hp);
    }
    this.onExit = function(){}
}

function selectAttack(battleStack, currentSelection, entity){
    var attackState = attackDatabase[entity.attackList[currentSelection]];
    battleStack.push(new SelectTargetState(battleStack, battleData.enemies, attackEnemySelection, attackState));
}

function attackEnemySelection(battleStack, target, AttackState){
    battleStack.push(new AttackState(battleStack, target));
}


function SelectTargetState(battleStack, targets, selectionMethod, actionToDo){
    var currentTarget;
    this.stateName = "SelectTargetState";

    this.onEnter = function(){
        currentTarget = 0;
        console.log("Select who to attack with.");
    }

    this.update = function(){
        if(select){
            selectionMethod(battleStack, targets[currentTarget], actionToDo);
        }

        Mousetrap.bind('right', function(){currentTarget++});
        Mousetrap.bind('left', function(){currentTarget--;});      
        
        if(currentTarget>targets.length-1){
        currentTarget = 0;
        }else if(currentTarget<0){
        currentTarget = targets.length-1;
        }
    }

    this.onExit = function(){
        Mousetrap.unbind("right");
        Mousetrap.unbind('left');
    } 
}

function actionOptionSelection(battleStack, currentSelection, entity){
    switch(currentSelection){
        case 0:
            console.log("Attack");
            battleStack.push(new OptionSelectState(battleStack, entity.attackList, selectAttack, entity));
            break;
        case 1:
            console.log("Talk");
            break;
        case 2:
            console.log("Item");
            break;
        case 3:
            console.log("Flee");
            break;
    }
}

function OptionSelectState(battleStack, optionList, selectionMethod, entity){

    this.stateName = "OptionSelectState";
    currentSelection = 0;

    this.update = function(){
        if(select){
           //console.log("DANK");
           //console.log(entity.name);
           selectionMethod(battleStack, currentSelection, entity); 
        } 
        
        //Menu Navigation
        Mousetrap.bind('right', function(){currentSelection++});
        Mousetrap.bind('left', function(){currentSelection--;});

        if(currentSelection>optionList.length-1){
            currentSelection = 0;
        }else if(currentSelection<0){
            currentSelection = optionList.length-1;
        } 
         
    }

    this.onEnter = function(){
        console.log(optionList);
    }

    this.onExit = function(){
        Mousetrap.unbind("right");
        Mousetrap.unbind('left');
    }
}

function Entity(name, hp, dmg){
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.hasUsedAction = false;
    this.attackList = ["SinAttack", "CosAttack", "d/dx", "Integral"];
}