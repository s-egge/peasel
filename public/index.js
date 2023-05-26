
var gridSizeButton = document.getElementById("grid-size-button");
var penButton = document.getElementById("pen");
var eraserButton = document.getElementById("eraser");
var deleteButton = document.getElementById("delete");
var deleteYes = document.getElementById("delete-yes");
var deleteNo = document.getElementById("delete-no");
var leftColorPicker = document.getElementById("left-color");
var rightColorPicker = document.getElementById("right-color");
var randomColorBtn = document.getElementById("random-color-btn");
var colorSwapperBtn = document.getElementById("swap-colors-btn");


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

//button functionality variables
var currentOnButton = "pen"
var mousePressed = false
var penOn = false
var eraserOn = false
var deleteOn = false
var bucketOn = false


/***********************************************************************************
 * Calls toggle for whichever button is currently on, then updates currentOnButton
 * *********************************************************************************/
function changeCurrentOnButton(newOnButton) {
    switch(currentOnButton) {
        case newOnButton: //prevents infinite calls to this function
            return;
        case "pen":
          penToggle();
          break;
        case "eraser":
          eraserToggle();
          break;
      }

      currentOnButton = newOnButton;
}

function bucketFill() {
    
}

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

    changeCurrentOnButton("pen");
}

/***********************************************************************************
 * If the eraser button is currently "on", remove "clicked" from classList, change
 * icon to black, and set bool to false. If the eraser button is "off", add "clicked", 
 * change icon to white, and set bool to true.
 * *********************************************************************************/
function eraserToggle(){
    eraserButton.classList.toggle("clicked");

    //toggle eraser icon to black/white as needed
    if(eraserOn) {
        document.getElementById("eraser-img").src = "imgs/eraser-black.png"
        eraserOn = false
    }

    else{
        document.getElementById("eraser-img").src = "imgs/eraser-white.png"
        eraserOn = true
    }

    changeCurrentOnButton("eraser");
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

//add button functinality
penButton.addEventListener('click', penToggle)
eraserButton.addEventListener('click', eraserToggle)
deleteButton.addEventListener('click', deleteToggle)

//change left and right colors on input
leftColorPicker.oninput = function() {
    leftColor = this.value;
}

rightColorPicker.oninput = function() {
    rightColor = this.value;
}

//color swap functionality
colorSwapperBtn.addEventListener('click', function(){
    tempColor = leftColor;
    leftColor = rightColor;
    rightColor = tempColor;

    //change color picker colors
    leftColorPicker.value = leftColor;
    rightColorPicker.value = rightColor;
})

//random color functionality
randomColorBtn.addEventListener('click', function(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/randomcolor");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        leftColorPicker.value = xhr.responseText;
        leftColor = xhr.responseText;
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

//draw on current pixel with given color
function draw(color) {
        c.beginPath();
        c.fillStyle = color;
        c.fillRect(pixelX, pixelY, pixelLength, pixelLength);
        c.fill();
}

//main loop, perform action based on clicking and currently pressed button
function loop() {

    if (mousePressed) {
        if (penOn)
            draw(pixelColor);
        if (eraserOn)
            draw("#FFFFFF")
        if (bucketOn)
            bucketFill()
    }

    //update canvas
    window.requestAnimationFrame(loop);
}

loop();