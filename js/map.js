var index;

function onLoadFromWiki(){
    // Get saved data from sessionStorage 
    if (sessionStorage.getItem('index') == null){
        sessionStorage.setItem('index', '0');                       
    }

    index = sessionStorage.getItem('index');
    if(index == 0){
        document.getElementById("prevButton").disabled = true;              
    }
    if(index == 1){
        document.getElementById("nextButton").disabled = true;                  
    }
    loadMap(index);
}

function loadMap(i){        
    var newImg = document.getElementById('image');
    var newDesc = document.getElementById('descElement');
    sessionStorage.setItem('index', i); 
    if(i==0){
        newImg.src = "../assets/images/sampleMap.png";
        newImg.alt = "";
        newImg.useMap = "#beachmap";    
        newDesc.innerHTML = "Hover pointer to see Beach hut, Lifering and Flag. Click to visit wikilink.";              
    }
    if(i==1){
        newImg.src = "../assets/images/face.png";
        newImg.alt = "";
        newImg.useMap = "#facemap"; 
        newDesc.innerHTML = "Hover pointer to see Eye, Ear, Eyebrow, Iris, Lip, Forehead and Cheek. Click to visit wikilink.";  
    }
}

function nextClicked(){
    document.getElementById("prevButton").disabled = false;
    ++index;
    if(index == 1){
        document.getElementById("nextButton").disabled = true;                  
    }
    loadMap(index);
}

function prevClicked(){
    --index;
    document.getElementById("nextButton").disabled = false;                         
    if(index == 0){
        document.getElementById("prevButton").disabled = true;              
    }
    loadMap(index);
}        