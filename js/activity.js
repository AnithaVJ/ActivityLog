//Timer objects will be pushed to activityList
var mainIndex = -1; 
var activityList = [];

function Activity(i){
    this.indexVar = i;
    this.totalSeconds = 0;
    this.isPlaying = false;
    this.timer;

    this.playPauseButton;
    this.resetButton;
    this.saveButton;
    this.timeDisplay;
    this.activityNameDisplay;
    
    this.timeDisplay.innerHTML = "00:00:00";

    this.play = function(){
    //image change to pause
        var p = document.getElementById('activityLog'+this.index).getElementsByClassName('playPause')[0];
        p.style.backgroundImage = "url('../assets/images/pause.png')";
        p.style.backgroundSize = "contain";
        isPlaying = true;

        this.timer = setInterval(
        (function(self) { 
            return function() { 
                self.totalSeconds += 1; 
                update(self.totalSeconds,self.indexVar);
                }
            }
        )(this), 1000 );     
    }

    this.pause = function(){    
        //image change to play
        var p = document.getElementById('activityLog'+this.index).getElementsByClassName('playPause')[0];
        p.style.backgroundImage = "url('../assets/images/play.png')";
        p.style.backgroundSize = "contain"; 
        this.isPlaying = false; 
        clearInterval(this.timer);           
    }

    this.playPause = function(){        //eventlistener
        this.resetButton.disabled = false; 
        if(this.isPlaying){             //pause button tapped
            this.pause();
        }
        else{                           //play button tapped
            this.play();
        }
    } 

    this.reset = function(){            //eventlistener
        this.totalSeconds = 0;
        this.isPlaying = false;
        this.timeDisplay.innerHTML = "00:00:00";
        clearInterval(this.timer);
        this.playPauseButton.disabled = false;
        this.resetButton.disabled = true;
    }

    this.save = function(){  /* move to aside...load in local*/ } //eventlistener

    this.remove = function(){ /*remove from aside...splice array...do local clean*/    }

}

Activity.prototype.createUI = function(mainIndex){
    this.playPauseButton;
    this.resetButton;
    this.timeDisplay;
    this.saveButton;
    this.activityNameDisplay;
}

Activity.prototype.update = function(tot,timeDisp) {
    var seconds=hours=minutes=0;
    seconds =  tot;

    hours = Math.floor(seconds / 3600);
    seconds -= hours * (3600);

    minutes = Math.floor(seconds / 60);
    seconds -= minutes * (60);

    timeDisp.getElementsByClassName('time')[0].innerHTML = pad(hours)+":"+pad(minutes)+":"+pad(seconds);
};


//to display in doubles
function pad(n) { 
    if (n<10 && n >=0) 
        return ("0" + n);
    else
        return n;
}

function add(){
    ++mainIndex;
    var n = new activityObj();
    activityObj.createUI(mainIndex);
}


function cloneRow() {       
    var row = document.getElementById("activityLog"); 
    var clone = row.cloneNode(true); // copy children 
    clone.id = "activityLog"+mainIndex; // change id or other attributes/contents
    clone.className = "active";

    var newActivity = new Activity();    

    newActivity.playPauseButton = document.getElementById(clone.id).getElementsByClassName('playPause')[0];
    newActivity.resetButton = document.getElementById(clone.id).getElementsByClassName('stop')[0];
    newActivity.saveButton = document.getElementById(clone.id).getElementsByClassName('delete')[0];
    newActivity.timeDisplay = document.getElementById(clone.id).getElementsByClassName('time')[0];
    newActivity.activityNameDisplay = document.getElementById(clone.id).getElementsByClassName('activityName')[0];

    var table = document.getElementById("activityTable"); 
    table.appendChild(clone); // add new row to end of table
    // document.getElementById(clone.id).className = "active";
}

// function add(){
//     //creating new timer object with each row addition
//     ++mainIndex;
//     var n = new logObj(mainIndex);
//     activityList.push(n);

//     document.getElementById("add").style.outline = "none"; //remove outline after click
//     // if (mainIndex==0){
//     //     document.getElementById("activityLog0").className = "active"; //pre created first row made visible
//     // }
//     // else{
//         cloneRow();     //dynamically create/clone other rows                   
//     // }   
// }

// function delete(i){
//     document.getElementById("activityTable").deleteRow(i);
//     activityList.splice(i,);
// }