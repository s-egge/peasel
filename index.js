var gridSizeButton = document.getElementById("grid-size-button");
var penButton = document.getElementById("pen");
var deleteButton = document.getElementById("delete");
var deleteYes = document.getElementById("delete-yes");
var deleteNo = document.getElementById("delete-no");

// canvas set-up
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

// pixel variables
var gridSize = 0
var pixelLength = 0
var pixelColor = "#000000" //start with black, changeable later
var pixelX = 0
var pixelY = 0

//mouse variables
var mousePressed = false

//add pen button click functinality
penButton.addEventListener('click', function() {
    penButton.classList.toggle("clicked");
})

//add delete button functinality
deleteButton.addEventListener('click', function(){
    deleteButton.classList.toggle("clicked");
    document.getElementById("modal-backdrop").classList.toggle("hidden");
    document.getElementById("delete-modal").classList.toggle("hidden");
})

//if user clicks yes, erase the whole canvas and close modals
deleteYes.addEventListener('click', function(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    deleteButton.classList.toggle("clicked");
    document.getElementById("modal-backdrop").classList.toggle("hidden");
    document.getElementById("delete-modal").classList.toggle("hidden");
})

//if user clicks no, close the modals
deleteNo.addEventListener('click', function(){
    deleteButton.classList.toggle("clicked");
    document.getElementById("modal-backdrop").classList.toggle("hidden");
    document.getElementById("delete-modal").classList.toggle("hidden");
})

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
    penButton.classList.toggle("clicked");
})

//toggle mousePressed bool when user clicks down
window.onmousedown = function() {
    mousePressed = true;
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
    if (mousePressed && penButton.classList.contains("clicked")) {
        c.beginPath();
        c.fillStyle = pixelColor;
        c.fillRect(pixelX, pixelY, pixelLength, pixelLength);
        c.fill();
    }

    //update canvas
    window.requestAnimationFrame(draw);
}

draw();