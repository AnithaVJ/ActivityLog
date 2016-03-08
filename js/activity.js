//Timer objects will be pushed to activityList
var mainIndex = -1; 
var activityList = [];

function Activity(i){
    this.indexVar = i;
    this.totalSeconds = 0;
    this.isPlaying = false;
    var me = this;
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
        )(this), 1000 );     
    }


    this.pause = function(){    
        //image change to play
        this.playPauseButton.style.backgroundImage = "url('../assets/images/play.png')";
        this.playPauseButton.style.backgroundSize = "contain"; 
        this.isPlaying = false; 
        clearInterval(this.timer);           
    }


    this.playPause = function(){
        console.log("indside play pause -" + me);
        me.resetButton.disabled = false; 
        if(me.isPlaying){             //pause button tapped
            me.pause();
        }
        else{                           //play button tapped
            me.play();
        }
    }
  

    this.reset = function(){            //eventlistener
        me.totalSeconds = 0;
        me.isPlaying = false;
        me.timeDisplay.innerHTML = "00:00:00";
        clearInterval(this.timer);
        me.playPauseButton.disabled = false;
        me.resetButton.disabled = true;
    }

    // this.save = function(){ use me.. /* move to aside...load in local*/ } //eventlistener

    // this.remove = function(){ /*remove from aside...splice array...do local clean*/    }

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

    var me= this;
    
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    var button1 = document.createElement("button");
    button1.className = 'playPause';
    button1.addEventListener("click", function(){me.playPause();} )//this.mouseMoving.bind(this)
    this.playPauseButton = button1;

    var button2 = document.createElement("button");
    button1.addEventListener("click", function(){me.reset();} );
    button2.className= 'reset';
    this.resetButton = button2;    

    var button3 = document.createElement("button");
    button1.addEventListener("click",  function(){me.save();} );
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


//to display in doubles
function pad(n) { 
    if (n<10 && n >=0) 
        return ("0" + n);
    else
        return n;
}

function add(){
    document.getElementById("add").style.outline = "none";
    ++mainIndex;
    var  newActivity = new Activity(mainIndex);
    var addRow = newActivity.createUI();
    var table = document.getElementById("activityTable");    
    table.appendChild(addRow);
}

// function delRow()
//   {
//     var current = window.event.srcElement;
//     //here we will delete the line
//     while ( (current = current.parentElement)  && current.tagName !="TR");
//          current.parentElement.removeChild(current);
//   }
// function delete(i){
//     document.getElementById("activityTable").deleteRow(i);
//     activityList.splice(i,);
    // --mainIndex;
// }