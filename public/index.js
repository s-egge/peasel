
var gridSizeButton = document.getElementById("grid-size-button");
var penButton = document.getElementById("pen");
var deleteButton = document.getElementById("delete");
var deleteYes = document.getElementById("delete-yes");
var deleteNo = document.getElementById("delete-no");
var leftColorPicker = document.getElementById("left-color");
var rightColorPicker = document.getElementById("right-color");
var randomColor = document.getElementById("random-color");
var colorSwapper = document.getElementById("swap-colors");


// canvas set-up
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

// pixel variables
var gridSize = 0
var pixelLength = 0
var leftColor = "#000000"
var rightColor = "#FFFFFF"
var pixelColor = leftColor;
var pixelX = 0
var pixelY = 0

//mouse variables
var mousePressed = false
var penOn = false
var deleteOn = false

/***********************************************************************************
 * If the pen button is currently "on", remove "clicked" from classList, change
 * icon to black, and set bool to false. If the pen button is "off", add "clicked", 
 * change icon to white, and set bool to true.
 * *********************************************************************************/
function penToggle(){
    penButton.classList.toggle("clicked");

    //toggle pen icon to black/white as needed and 
    if(penOn) {
        document.getElementById("pen-img").src = "imgs/pencil-black.png"
        penOn = false
    }

    else{
        document.getElementById("pen-img").src = "imgs/pencil-white.png"
        penOn = true
    }
}

/***********************************************************************************
 * If the delete button is currently "on", remove "clicked" from classList, change
 * icon to black, set bool to false, turn pen on, and hide backdrop modal. If the
 * delete button is "off", add "clicked", change icon to white, set bool to true,
 * turn pen off, and show backdrop.
 * *********************************************************************************/
function deleteToggle(){

    deleteButton.classList.toggle("clicked");
    document.getElementById("modal-backdrop").classList.toggle("hidden");
    document.getElementById("delete-modal").classList.toggle("hidden");
    penToggle();

    if(deleteOn){
        document.getElementById("delete-img").src = "imgs/garbage-black.png";
        deleteOn = false
    }
    else {
        document.getElementById("delete-img").src = "imgs/garbage-white.png";
        deleteOn = true
    }
    
}

//add pen button click functinality
penButton.addEventListener('click', penToggle)

//add delete button functinality
deleteButton.addEventListener('click', deleteToggle)

//change left color on input
leftColorPicker.oninput = function() {
    leftColor = this.value;
}

//change right color on input
rightColorPicker.oninput = function() {
    rightColor = this.value;
}

//color swap functionality
colorSwapper.addEventListener('click', function(){
    tempColor = leftColor;
    leftColor = rightColor;
    rightColor = tempColor;

    //change color picker colors
    leftColorPicker.value = leftColor;
    rightColorPicker.value = rightColor;
})

//random color functionality
randomColor.addEventListener('click', function(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/randomcolor");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        leftColor = xhr.responseText;

        colorPickerImg = document.getElementById("color-picker-img");
        colorPickerImg.style.backgroundColor = leftColor;
    }};

    xhr.send(); 
})


//if user clicks yes, erase the whole canvas and close modals
deleteYes.addEventListener('click', function(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    deleteToggle();
})

//if user clicks no, close the modals
deleteNo.addEventListener('click', deleteToggle)

//when user clicks OK on grid size, update canvas pixel dimensions
gridSizeButton.addEventListener('click', function(){
    var gridOptions = document.getElementsByName("grid-size");
    var gridSize = 0

    //get selected grid size
    for(x = 0; x < gridOptions.length; x++) {
        if (gridOptions[x].checked)
            gridSize = gridOptions[x].value
    }

    //determine canvas size based on gridSize, not allowing floating point numbers
    canvas.height = Math.floor((window.innerHeight * 0.8) / gridSize) * gridSize
    canvas.width = canvas.height

    //update canvas pixel dimensions based on grid size
    pixelLength = canvas.width / gridSize

    //close grid-size modal and backdrop, display canvas
    document.getElementById("modal-backdrop").classList.toggle("hidden")
    document.getElementById("grid-size-modal").classList.toggle("hidden")
    document.getElementById("canvas").classList.toggle("hidden")

    //turn on pen automatically
    penToggle();
})

//toggle mousePressed bool when user clicks down
window.onmousedown = function(mouse) {
    mousePressed = true;
    if (mouse.which === 1)
        pixelColor = leftColor;
    else if (mouse.which === 3)
        pixelColor = rightColor;
}

//toggle mousePressed bool when user releases mouse
window.onmouseup = function() {
    mousePressed = false;
}

//update mouse position as it moves
window.onmousemove = function (event) {
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    //get canvas in relation to viewport
    let rect = canvas.getBoundingClientRect();

    //set mouse (x, y) coordinates based on canvas, not viewport
    var mouseX = (event.clientX - rect.left);
    var mouseY = (event.clientY - rect.top);

    //set current pixel coordinates based on canvas size
    pixelX = Math.floor((mouseX / pixelLength)) * pixelLength
    pixelY = Math.floor((mouseY / pixelLength)) * pixelLength
}

//drawing loop
function draw() {
    if (mousePressed && penOn) {
        c.beginPath();
        c.fillStyle = pixelColor;
        c.fillRect(pixelX, pixelY, pixelLength, pixelLength);
        c.fill();
    }

    //update canvas
    window.requestAnimationFrame(draw);
}

draw();