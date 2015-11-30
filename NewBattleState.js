//This is where the battle logic happens

function NewBattleState(enemies, party){
    this.stateName = "BattleState";

    var battleStack = new StateStack();

    this.update = function(){
        //Give options to the heroes for action selection
        //When the action for one hero is complete, move to the next hero
        //When all of the hero actions are complete, we move to the EnemyAttackState
        //When that is over we return to the first step
    }

    this.onEnter = function(){

    }

    this.onExit = function(){

    }

}

function Entity(name, hp, dmg){
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
}

function SelectActionState(){
    this.stateName = "SelectActionState";
    this.update = function(){}
    this.onEnter = function(){}
    this.onExit = function(){}
}