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

function EmptyState(){
    this.stateName = "EmptyState";
    this.update = function(){}
    this.onEnter = function(){}
    this.onExit = function(){}
}
