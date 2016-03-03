//Timer objects will be pushed to activityList
var mainIndex = -1; 
var activityList = [];

function logObj(i){
    this.indexVar = i;  
    this.totalSeconds = 0;
    this.isPlaying = false;
    this.timer;
}

function update(tot,i) {
    var seconds=hours=minutes=0;
    seconds =  tot;

    hours = Math.floor(seconds / 3600);
    seconds -= hours * (3600);

    minutes = Math.floor(seconds / 60);
    seconds -= minutes * (60);

    var r = document.getElementById("activityLog"+i);       
    r.getElementsByClassName('time')[0].innerHTML = pad(hours)+":"+pad(minutes)+":"+pad(seconds);
}



function play(){
    this.isPlaying = true;
    this.timer = setInterval(
        (function(self) { 
                    return function() { 
                                    self.totalSeconds += 1; 
                                    update(self.totalSeconds,self.indexVar);
                                    }
                    }
    )(this), 1000 ); 
}

function cloneRow() {       
    var row = document.getElementById("activityLog"); 
    var clone = row.cloneNode(true); // copy children 
    clone.id = "activityLog"+mainIndex; // change id or other attributes/contents
    
    var table = document.getElementById("activityTable"); 
    table.appendChild(clone); // add new row to end of table
    document.getElementById(clone.id).getElementsByClassName('time')[0].innerHTML = "00:00:00";
    document.getElementById(clone.id).className = "active";
}

function add(){
    //creating new timer object with each ro addition
    ++mainIndex;
    var n = new logObj(mainIndex);
    activityList.push(n);

    document.getElementById("add").style.outline = "none"; //remove outline after click
    // if (mainIndex==0){
    //     document.getElementById("activityLog0").className = "active"; //pre created first row made visible
    // }
    // else{
        cloneRow();     //dynamically create/clone other rows                   
    // }   
}


//to display in doubles
function pad(n) { 
    if (n<10 && n >=0) 
        return ("0" + n);
    else
        return n;
}


//button play/pause from every row - distinguished by rowIndex
function playPause(rowIndex){
    var currentObj = activityList[rowIndex];
    document.getElementById('activityLog'+rowIndex).getElementsByClassName('stop')[0].disabled = false;
    var p = document.getElementById('activityLog'+rowIndex).getElementsByClassName('playPause')[0];
    
    if(currentObj.isPlaying){           //pause button to be changed to play
        p.style.backgroundImage = "url('../assets/images/play.png')";
        p.style.backgroundSize = "contain"; 
        clearInterval(currentObj.timer);
        currentObj.isPlaying = false;     
    }
    else{                               //play button to be changed to pause
        p.style.backgroundImage = "url('../assets/images/pause.png')";
        p.style.backgroundSize = "contain";             
        play.call(currentObj);
        currentObj.isPlaying = true; 
    }
}

function stop(rowIndex) {   
    var currentObj = activityList[rowIndex];
    clearInterval(currentObj.timer);    
    currentObj.totalSeconds = 0;
    currentObj.isPlaying = false;
    document.getElementById('activityLog'+rowIndex).getElementsByClassName('time')[0].innerHTML = "00:00:00";
    document.getElementById('activityLog'+rowIndex).getElementsByClassName('playPause')[0].disabled = false;
    document.getElementById('activityLog'+rowIndex).getElementsByClassName('stop')[0].disabled = true;  
} 

// function display(){

//     //get length of array
//     //make a loop
//     //call clone -- call update
//     //end loop
// }

// function delete(i){
//     document.getElementById("activityTable").deleteRow(i);
//     activityList.splice(i,);
// }
