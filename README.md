# Peasel

Peasel is a website that utilizes HTML's canvas tag to display a blank canvas that allows the user to create pixel art. 

The website is currently hosted on Render here: https://peasel.onrender.com/

To run the program locally:
* Download code
* In terminal, run `npm install` to download dependencies
* In terminal, run `npm start` to start the server
* In browser, go to  `localhost:3000`

## Current functionality:

* Grid-size: The user can initially choose from a 16x16, 32x32, or 64x64 grid.
  
![image](https://github.com/s-egge/peasel/assets/102624422/4361655b-a354-4243-be81-1495c6a86d2d)

* Pen: The user can draw using either left or right mouse button based on the color they wish to use. Drawing can be done using a single click or drag-and-draw.

![image](https://github.com/s-egge/peasel/assets/102624422/49481149-8dd6-4c04-98d1-fbe6ca4bd667)

* Eraser: Erasing can be done with drag-and-draw or a single click.
* Paint Bucket: The user can use the left or right mouse button to fill with the preferred color.
  
![image](https://github.com/s-egge/peasel/assets/102624422/199b5e8e-f56c-4392-bae2-1fea7e793eb6)
![image](https://github.com/s-egge/peasel/assets/102624422/b1ad8160-4271-4f30-aa76-d5a7a1ea93a3)

* Delete: Erases the entire canvas to start over. Asks the user if they are sure they want to erase the canvas before doing so.

![image](https://github.com/s-egge/peasel/assets/102624422/d958a5f2-9e92-4e30-882c-240cbb5a8333)

* Eyedropper: Replaces the left-mouse color with the color that is clicked on.
* Color Swatches: A left and right color swatch for changing left/right mouse colors.
* Random-color: The dice icon when clicked will generate a random color for the left-mouse color-swatch.
* Swap-colors: This swaps the left and right colors.
* Zoom: The canvas can be zoomed in and out via the scroll wheel on the mouse or touchpad

![image](https://github.com/s-egge/peasel/assets/102624422/10e7a613-31b0-4e79-a5f9-ede7e5f78735)
![image](https://github.com/s-egge/peasel/assets/102624422/3e8ce9da-2f6d-4cf2-9a5a-3b3ccb5d98dd)


## Future functionality:

* Grid-size: Will change the size of the grid after initial entry.
* Save: Will save the pixel-art as a download.
* Drag Canvas: Drag the canvas around to help when zooming in.
* Zoom Buttons: Zoom in/out using buttons.

## Icons:

All icons are from [SVG Repo](https://www.svgrepo.com/)

[Pencil SVG](https://www.svgrepo.com/svg/335241/pencil)

[Eraser SVG](https://www.svgrepo.com/svg/525862/eraser)

[Fill SVG](https://www.svgrepo.com/svg/412208/fill)

[Resize SVG](https://www.svgrepo.com/svg/379587/resize-alt)

[Delete SVG](https://www.svgrepo.com/svg/488148/delete)

[Save SVG](https://www.svgrepo.com/svg/509215/save-alt)

[Eyedropper SVG](https://www.svgrepo.com/svg/313906/eye-dropper-solid)

[Dice SVG](https://www.svgrepo.com/svg/326602/dice-outline)

[Swap SVG](https://www.svgrepo.com/svg/521871/switch)
