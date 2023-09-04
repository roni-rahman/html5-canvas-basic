const screenshotButton = document.getElementById('screenshotButton');
const screenshotCanvas = document.getElementById('screenshotCanvas');
const ctx = screenshotCanvas.getContext('2d');
const croppedImg = document.getElementById("croppedImg")

let isSelecting = false;
let rect = {};
let startX, startY, endX, endY;

screenshotButton.addEventListener('click', () => {
    captureScreenshot(rect);
});

screenshotCanvas.addEventListener('mousedown', (e) => {
    isSelecting = true;
    lastMouseX = parseInt(e.clientX - screenshotCanvas.offsetLeft)
    lastMouseY = parseInt(e.clientY - screenshotCanvas.offsetTop)
    // startX = e.clientX;
    // startY = e.clientY;
    // console.log("mouse down", startX, startY)
});

screenshotCanvas.addEventListener('mousemove', (e) => {
    mouseX = parseInt(e.clientX - screenshotCanvas.offsetLeft)
    mouseY = parseInt(e.clientY - screenshotCanvas.offsetTop)



    if (isSelecting) {
        ctx.clearRect(0, 0, screenshotCanvas.width, screenshotCanvas.height);
        ctx.beginPath();

        var width = mouseX - lastMouseX;
        var height = mouseY - lastMouseY;
        ctx.rect(lastMouseX, lastMouseY, width, height)
        rect = { x: lastMouseX, y: lastMouseY, width, height }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke()



        // endX = e.clientX;
        // endY = e.clientY;
        // drawSelectionBox();
    }
});

screenshotCanvas.addEventListener('mouseup', () => {
    isSelecting = false;
});

const captureScreenshot = ({ width, height, x, y }) => {
    const cv2 = document.createElement('canvas');
    cv2.width = width;
    cv2.height = height;
    const ctx2 = cv2.getContext('2d');
    console.log("hello")
    ctx2.drawImage(
        screenshotCanvas, // Source element
        x, y, width, height,             // Source coordinates and dimensions
        0, 0, width, height             // Destination coordinates and dimensions
    );
    const dataURI = cv2.toDataURL('image/jpeg');
    croppedImg.src = dataURI;
}


