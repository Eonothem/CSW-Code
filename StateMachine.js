function StateStack(debug){
    var stack = [];
    stack.push(new EmptyState());

    this.update = function(){
        var top = stack[stack.length-1];
        
        top.update();
        if(debug){console.log("Updated "+top.stateName);}
    }

    this.getTop = function(){
        return stack[stack.length-1];
    }

    this.push = function(newState){
        var top = stack[stack.length-1];
        top.onExit();
        if(debug){console.log("Exited "+top.stateName);}
        stack.push(newState);
        newState.onEnter();
        if(debug){console.log("Entered "+newState.stateName);}
    }

    this.pop = function(){
        var top = stack[stack.length-1];
        top.onExit();
        if(debug){console.log("Exited "+top.stateName);}
        stack.pop();
        top = stack[stack.length-1];
        top.onEnter();
        if(debug){console.log("Entered "+top.stateName);}
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
