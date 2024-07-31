
/* create variable of canvas from html */
let canvas = document.getElementById("canvas");
let CanvasWidth = canvas.width;
let CanvasHeight = canvas.height;
let ctx = canvas.getContext("2d");


/* create interval variable */
let interval;
let fps = 0;

let lastUpdate = 0 //(old version) Date.now(); // get actual timestamp in ms 



/* run function that run 60 time per sec update / draw function */
function run(time) { // use time parameter as it is given in js documentation and seems more stable than Date.now()
    requestAnimationFrame(run); // we request again after init request so it request it infinitly (in loop)
    /* calculate time spent (delta time ) since the last update */
    let dt = (time - lastUpdate) / 1000; // differences between lastupdate timestamp and nowupdate timestamp is converted into sec .
    /* fix FPS limit wanted */
    if (dt < (1 /60) - 0.001) { // 0.001 is to add a tolerance margin otherwise fpslimit will not be accurate 
        return;
    }
    fps = 1 / dt;
    /* update last update for the next iteration */
    lastUpdate = time;
    update(dt); // update function launched 60 time per sec 
    ctx.clearRect(0,0,canvas.width,canvas.height) // remove screen 60 time per sec to refresh 
    draw(ctx); // draw function launched 60 time per sec 
    FPSdisplay();
}


/* init function to start run function 60 time per seconde (1000/60 = 16ms) */
function init() {
    ctx.imageSmoothingEnabled = false; /* remove blurry effect on every internet explorer */
    ctx.msImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'high';
    load(); // we start load function each time we init the game 
    /* change setinterval into requestAnimationFrame(); since it seems more stable and optimized for process time */
    /* we use the setInterval function to run() each 16 ms ( 1000 / 60 ) */
    requestAnimationFrame(run);
}
function FPSdisplay() {
    ctx.fillStyle = "White";
    ctx.font = "normal 16pt arial";

    ctx.fillText(Math.floor(fps),20,20)
    ctx.fillTex
}
init();