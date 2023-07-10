
var gridSizeButton = document.getElementById("grid-size-button");
var penButton = document.getElementById("pen");
var eraserButton = document.getElementById("eraser");
var bucketButton = document.getElementById("bucket");
var deleteButton = document.getElementById("delete");
var deleteYes = document.getElementById("delete-yes");
var deleteNo = document.getElementById("delete-no");
var leftColorPicker = document.getElementById("left-color");
var rightColorPicker = document.getElementById("right-color");
var randomColorBtn = document.getElementById("random-color-btn");
var colorSwapperBtn = document.getElementById("swap-colors-btn");


// canvas set-up
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d', { willReadFrequently: true });


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
        case "bucket":
            bucketToggle();
            break;
        case "delete":
            deleteToggle;
            break;
      }

      currentOnButton = newOnButton;
}

/***********************************************************************************
 * Returns hex value for color at given coordinates on the canvas
 * *********************************************************************************/
function getPixelColorFromCoordinates(x, y) {
    const colorData = c.getImageData(x, y, 1, 1);
    var r = colorData.data[0];
    var g = colorData.data[1];
    var b = colorData.data[2];
    var a = colorData.data[3];

    //special case where the color all white will return as black
    if (a == 0)
      return "#FFFFFF"

    //otherwise convert rgb to hex
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


/***********************************************************************************
 * Checks if given screen coordinates are within the bounds of the Canvas
 * *********************************************************************************/
function withinCanvasBounds(x, y) {
    if (x < 0 || x >= pixelLength * gridSize ||
        y < 0 || y >= pixelLength * gridSize)
        return false

    else
        return true
}


/***********************************************************************************
 * Given the coordinates of a pixel and what color that pixel is, replaces that pixel
 * and any matching and touching pixels with the desired color
 * *********************************************************************************/
function bucketFill(colorToReplace, x, y) {
    //fill pixel of passed in coordinates
    c.beginPath();
    c.fillStyle = pixelColor;
    c.fillRect(x, y, pixelLength, pixelLength);
    c.fill();

    //check all surrounding pixels to see if they need to be replaced

    //up
    if(withinCanvasBounds(x, y - pixelLength) &&
        getPixelColorFromCoordinates(x, y - pixelLength) == colorToReplace)
        bucketFill(colorToReplace, x, y - pixelLength);

    //down
    if(withinCanvasBounds(x, y + pixelLength) &&
        getPixelColorFromCoordinates(x, y + pixelLength) == colorToReplace)
        bucketFill(colorToReplace, x, y + pixelLength);

    //right
    if(withinCanvasBounds(x + pixelLength, y) &&
        getPixelColorFromCoordinates(x  + pixelLength, y) == colorToReplace)
        bucketFill(colorToReplace, x + pixelLength, y);

    //left
    if(withinCanvasBounds(x - pixelLength, y) &&
        getPixelColorFromCoordinates(x  - pixelLength, y) == colorToReplace)
        bucketFill(colorToReplace, x - pixelLength, y);

}


/***********************************************************************************
 * Toggles the pen button on/off
 * *********************************************************************************/
function penToggle(){
    penButton.classList.toggle("clicked");

    //toggle pen icon to black/white as needed and 
    if(penOn) {
        document.getElementById("pen-img").src = "imgs/pencil-black.png"
        penOn = false
        currentOnButton = "";
    }

    else{
        document.getElementById("pen-img").src = "imgs/pencil-white.png"
        penOn = true
        changeCurrentOnButton("pen");
    }
}


/***********************************************************************************
 * Toggles the eraser button on/off
 * *********************************************************************************/
function eraserToggle(){
    eraserButton.classList.toggle("clicked");

    //toggle eraser icon to black/white as needed
    if(eraserOn) {
        document.getElementById("eraser-img").src = "imgs/eraser-black.png"
        eraserOn = false
        currentOnButton = "";
    }

    else{
        document.getElementById("eraser-img").src = "imgs/eraser-white.png"
        eraserOn = true
        changeCurrentOnButton("eraser");
    }
}


/***********************************************************************************
 * Toggles the bucket button on/off
 * *********************************************************************************/
function bucketToggle(){
    bucketButton.classList.toggle("clicked");

    
    //toggle eraser icon to black/white as needed
    if(bucketOn) {
        document.getElementById("bucket-img").src = "imgs/bucket-black.png"
        bucketOn = false;
        currentOnButton = "";
    }

    else {
        document.getElementById("bucket-img").src = "imgs/bucket-white.png"
        bucketOn = true;
        changeCurrentOnButton("bucket");
    }

    return;
}


/***********************************************************************************
 * Toggles the delete button on/off
 * *********************************************************************************/
function deleteToggle(){

    deleteButton.classList.toggle("clicked");
    document.getElementById("modal-backdrop").classList.toggle("hidden");
    document.getElementById("delete-modal").classList.toggle("hidden");

    if(deleteOn){
        document.getElementById("delete-img").src = "imgs/garbage-black.png";
        deleteOn = false
        currentOnButton = "";
    }

    else {
        document.getElementById("delete-img").src = "imgs/garbage-white.png";
        deleteOn = true
        changeCurrentOnButton("delete");
    } 
}


/***********************************************************************************
 * If user clicks 'yes' on delete modal, erase canvas
 * *********************************************************************************/
deleteYes.addEventListener('click', function(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    deleteToggle();
})


/***********************************************************************************
 * If user clicks 'no' on delete modal, close modal
 * *********************************************************************************/
deleteNo.addEventListener('click', deleteToggle)


/***********************************************************************************
 * This reroutes when a user clicks on the canvas with "single click action" buttons, 
 * meaning buttons where a user won't be dragging the mouse across the canvas
 * NOTE: Currently only used with button, will be used with eyedropper tool in the future
 * *********************************************************************************/
function canvasSingleClickActions() {
    if (bucketOn) {
        currentColor = getPixelColorFromCoordinates(pixelX, pixelY);

        if (currentColor == pixelColor)
            return

        bucketFill(currentColor, pixelX, pixelY);
    }
}


//add button functinality
penButton.addEventListener('click', penToggle)
eraserButton.addEventListener('click', eraserToggle)
bucketButton.addEventListener('click', bucketToggle)
deleteButton.addEventListener('click', deleteToggle)

canvas.addEventListener('click', canvasSingleClickActions);
canvas.addEventListener('contextmenu', canvasSingleClickActions);


//change left and right colors on input
leftColorPicker.oninput = function() {
    leftColor = this.value;
}


rightColorPicker.oninput = function() {
    rightColor = this.value;
}


/***********************************************************************************
 * Swaps the left and right color swatches
 * *********************************************************************************/
colorSwapperBtn.addEventListener('click', function(){
    tempColor = leftColor;
    leftColor = rightColor;
    rightColor = tempColor;

    //change color picker colors
    leftColorPicker.value = leftColor;
    rightColorPicker.value = rightColor;
})


/***********************************************************************************
 * Random color button functionality
 * *********************************************************************************/
randomColorBtn.addEventListener('click', function(){
    
    var hexDigits = "0123456789ABCDEF";
    var randomColor = '#';
    
    // generate hex digits for random color
    for (let i = 0; i < 6; i++)
        randomColor += hexDigits[(Math.floor(Math.random() * 16))];

        leftColorPicker.value = randomColor;
        leftColor = randomColor;
})


/***********************************************************************************
 * when user clicks 'OK' on grid size, update canvas pixel dimensions
 * *********************************************************************************/
gridSizeButton.addEventListener('click', function(){
    var gridOptions = document.getElementsByName("grid-size");

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


/***********************************************************************************
 * Toggle mousePressed bool when user clicks down
 * *********************************************************************************/
window.onmousedown = function(mouse) {
    mousePressed = true;
    if (mouse.which === 1)
        pixelColor = leftColor;
    else if (mouse.which === 3)
        pixelColor = rightColor;
}


/***********************************************************************************
 * Toggle mousePressed bool when user releases mouse
 * *********************************************************************************/
window.onmouseup = function() {
    mousePressed = false;
}


/***********************************************************************************
 * Update mouse position as it moves
 * *********************************************************************************/
window.onmousemove = function (event) {
    
    //get canvas in relation to viewport, see documentation:
    //(https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
    let rect = canvas.getBoundingClientRect();

    //set mouse (x, y) coordinates based on canvas, not viewport
    var mouseX = (event.clientX - rect.left);
    var mouseY = (event.clientY - rect.top);

    //set current pixel coordinates based on canvas size
    pixelX = Math.floor((mouseX / pixelLength)) * pixelLength
    pixelY = Math.floor((mouseY / pixelLength)) * pixelLength
}


/***********************************************************************************
 * Drawing loop for click and drag buttons, such as drawing/erasing
 * *********************************************************************************/
function draw() {

    if (mousePressed && (penOn || eraserOn)) {
        c.beginPath();
        c.fillStyle = pixelColor;

        if(eraserOn)
            c.clearRect(pixelX, pixelY, pixelLength, pixelLength);

        else {
            c.fillRect(pixelX, pixelY, pixelLength, pixelLength);
            c.fill();
        }
    }

    //update canvas
    window.requestAnimationFrame(draw);
}


draw();