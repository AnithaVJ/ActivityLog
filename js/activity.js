//Timer objects will be pushed to activityList
var mainIndex = -1; 
var activityList = [];
var idCount = 0;

function remove(){
    localStorage.removeItem('activityList');
}

function Activity(i){
    this.totalSeconds = 0;
    this.isPlaying = false;
    var me = this;
    this.indexVar = i;
    this.timer;
    this.playPauseButton;
    this.resetButton; 
    this.saveButton;      
    this.timeDisplay;
    this.activityNameDisplay;
   
    this.play = function(){
    //image change to pause
        this.playPauseButton.style.backgroundImage = "url('../assets/images/pause.png')";
        this.playPauseButton.style.backgroundSize = "contain";
        this.isPlaying = true;

        this.timer = setInterval(
        (function(self) { 
            return function() { 
                self.totalSeconds += 1; 
                self.update(self.totalSeconds,self.timeDisplay);
                }
            }
        )(this),1000);     
    },


    this.pause = function(){    
        //image change to play
        this.playPauseButton.style.backgroundImage = "url('../assets/images/play.png')";
        this.playPauseButton.style.backgroundSize = "contain"; 
        this.isPlaying = false; 
        clearInterval(this.timer);           
    },


    this.playPause = function(){
        me.resetButton.disabled = false; 
        if(me.isPlaying){             //pause button tapped
            me.pause();
        }
        else{                           //play button tapped
            me.play();
        }
    },


    this.reset = function(){            //eventlistener
        this.totalSeconds = 0;
        this.isPlaying = false;
        this.timeDisplay.innerHTML = "00:00:00";
        clearInterval(this.timer);
        this.playPauseButton.disabled = false;
        this.playPauseButton.style.backgroundImage = "url('../assets/images/play.png')";
        this.playPauseButton.style.backgroundSize = "contain"; 
        this.resetButton.disabled = true;
    },

    this.save = function(){ 
        this.pause();
       
        var obj = getActivityList("activityList");
        ++idCount;

        var activityToSave = new CompletedActivity();
        if(this.activityNameDisplay.value == "")
            activityToSave.completedActivityName = "activity"+idCount;
        else
            activityToSave.completedActivityName = this.activityNameDisplay.value;

        activityToSave.completedTimeDisplay = this.timeDisplay.innerHTML;
        activityToSave.tots = this.totalSeconds;
        activityToSave.idVar =  "ac"+idCount;

        obj['list'].push(activityToSave);
        localStorage.setItem('activityList', JSON.stringify(obj['list']));

        var table = document.getElementById("activityTable");   
        var row = document.getElementById('activityLog'+this.indexVar);
        var newRow = document.createElement("tr"); 
        var td = document.createElement("td");   
        var notif = document.createElement("p");
        notif.innerHTML =  "Activity has been saved";
        td.appendChild(notif);
        newRow.appendChild(td);
        newRow.style.backgroundColor =  '#639098';
        table.replaceChild(newRow,row);

        setTimeout(
            function() {
                newRow.style.display = "none";
            },
            2000);
    } 
  };

Activity.prototype.update = function(tot,timeDisp) {
    var seconds=hours=minutes=0;
    seconds =  tot;

    hours = Math.floor(seconds / 3600);
    seconds -= hours * (3600);

    minutes = Math.floor(seconds / 60);
    seconds -= minutes * (60);

    timeDisp.innerHTML = pad(hours)+":"+pad(minutes)+":"+pad(seconds);
}

Activity.prototype.createUI = function(){
    var row = document.createElement("tr");
    row.id='activityLog'+mainIndex;
    row.className = 'active';     
    
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var me= this;

    var button1 = document.createElement("button");
    button1.className = 'playPause';
    button1.addEventListener("click", function(){me.playPause();} )//this.mouseMoving.bind(this)
    this.playPauseButton = button1;

    var button2 = document.createElement("button");
    button2.addEventListener("click", function(){me.reset();} );
    button2.className= 'reset';
    this.resetButton = button2;    

    var button3 = document.createElement("button");
    button3.addEventListener("click",  function(){me.save();} );
    button3.className = 'save';
    this.saveButton = button3;

    var disp = document.createElement("p");
    disp.className = 'time';
    disp.innerHTML = "00:00:00";
    this.timeDisplay = disp;

    var aName = document.createElement("input");
    aName.type = 'text';
    aName.name = "activity";
    aName.size = 30;
    aName.maxlength = 255;
    aName.className = 'activityName';
    aName.placeholder = 'Activity Name';
    this.activityNameDisplay = aName;

    td1.appendChild(aName);               
    td2.appendChild(disp);               
    td3.appendChild(button1);
    td3.appendChild(button2);
    td3.appendChild(button3);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);  

    return row;  
}

function CompletedActivity(){
    this.completedActivityName;
    this.completedTimeDisplay;
    this.tots;
    this.idVar;
    this.trashButton;

    this.trash = function(){
        var row = document.getElementById(this.idVar);
        row.style.display = "none";
        var obj = getActivityList("activityList");
        obj['list'].splice(this.idVar,1);
        localStorage.setItem('activityList', JSON.stringify(obj['list']));               
    }
};

 CompletedActivity.prototype.createUI = function(obj){
        var row = document.createElement("tr");                 
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var me = this;
      
        var aName = document.createElement("p");
        aName.className = 'activityName';
        aName.innerHTML = obj.completedActivityName;
        this.completedActivityName = aName;

        var disp = document.createElement("p");
        disp.className = 'time';
        disp.innerHTML =  obj.completedTimeDisplay
        this.completedTimeDisplay = disp;

        var tButton = document.createElement("button");
        tButton.className = 'trash';
        tButton.addEventListener("click", function(){me.trash();} );
        this.trashButton = tButton;    

        td1.appendChild(aName); 
        td2.appendChild(tButton);              
        td2.appendChild(disp);  
        
        row.appendChild(td1);
        row.appendChild(td2);
        
        row.id = this.idVar
        return row;  
    }


CompletedActivity.prototype.popFromActivityList = function(arrayName) {
  var existingArray = getActivityList(arrayName);
  if (existingArray.length > 0) {
    arrayItem = existingArray.pop();
    localStorage.setItem(arrayName,JSON.stringify(existingArray));
  }
}

function getActivityList (arrayName) {
  var completedList = [];  
  var fetchArrayObject = localStorage.getItem(arrayName);
  if (typeof fetchArrayObject !== 'undefined') {
    if (fetchArrayObject !== null) { 
        completedList = JSON.parse(fetchArrayObject); 
        idCount = completedList.length;
    }
  }
   return {
        list: completedList,
        count: idCount
    };
}

function showList(){
    var obj = getActivityList("activityList");
    var activityList = obj['list'];
    idCount = obj['count'];

    
    var table = document.getElementById("activityTableCompleted");   
    var rowCount = table.rows.length; 

    if(rowCount != 0){
        while(--rowCount) 
            table.deleteRow(rowCount);
    }
    
    for (var i = 0; i < activityList.length; i++) {
        var activity = new CompletedActivity();
        activity.tots = activityList[i].tots;
        activity.idVar = String(activityList[i].idVar);  
        var addRow = activity.createUI(activityList[i]);
        table.appendChild(addRow);
    }
}


//to display in doubles
function pad(n) { 
    if (n<10 && n >=0) 
        return ("0" + n);
    else
        return n;
}

function add(){
    // document.getElementById("add").style.outline = "none";
    ++mainIndex;
    var  newActivity = new Activity(mainIndex);
    var addRow = newActivity.createUI();
    var table = document.getElementById("activityTable");    
    table.appendChild(addRow);
}