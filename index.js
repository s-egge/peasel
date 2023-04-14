var penButton = document.getElementById("pen")

// canvas set-up
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d')
canvas.height = window.innerHeight * 0.8
canvas.width = canvas.height

//add pen button click functinality
penButton.addEventListener('click', function() {
    penButton.classList.toggle("clicked");
})


// pixel dimensions will start 16x16, add option to change size later
var dimensions = 16
var pixelLength = canvas.width / 16
var pixelColor = "#000000" //start with black, changeable later
var pixelX = 0
var pixelY = 0

//mouse variables
var mousePressed = false

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