// https://www.w3schools.com/graphics/game_sound.asp
function sound(pSrc, pVol = 1){ // function to create a sound from a src with a volume 
  this.sound = document.createElement("audio");
  this.sound.src = pSrc;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = pVol;
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.currentTime = 0;
    this.stop();
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}


/* function to generate a random number based on maximum minimum */
function rnd(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
/* simple function to draw a circle (meant to be used for particle effect) */
function drawCircle(pCtx,pX,pY,pR){
    pCtx.beginPath();
    pCtx.strokeStyle = "white";
    pCtx.arc(pX,pY,pR,0, 2 * Math.PI);
    pCtx.fillstyle = "white";
    pCtx.fill();
    pCtx.stroke();
}


// use of love2d.org wiki general math function in lua convertion into js
function space(x1,y1,x2,y2){
  
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) ; // pythagore theorem 
}

function checkCollision(o1, o2) {// use of love2d.org wiki boundingBox lua convertion into js for colision detection
    if (o1.x < o2.x + o2.width &&
      o1.x + o1.width > o2.x && 
      o1.y < o2.y + o2.height && 
      o1.height + o1.y > o2.y) {
        return true;
      }
      else return false;
}



/* old method for keypressed and key released in the player.js */
 /* method to handle when a key is pressed (true) */
 // keyPush(t) {
    /*prevent default behavior of pressing a key */
    //t.preventDefault();
    /* check if event pressed key (t.code) return ArrowRight */
   // if (t.code == "ArrowRight") {
     //   this.keyRight = true; // if so set keyRight bool value to true */ 
    //}
    //if (t.code == "ArrowLeft") {
     //   this.keyLeft = true;
    //}
    //if (t.code == "ArrowUp") {
    //    this.keyUp = true;
    //}
    //if (t.code == "ArrowDown") {
      //  this.keyDown = true;
    //}
//}
/* method to handle when key is relief (false) */
//keyRelief(t) {
    /* prevent default behavior of relief pressed key */
  //  t.preventDefault();
    /* if the event.code return arrowRight we set keyRight to false */
    //if (t.code == "ArrowRight") {
      //  this.keyRight = false; // set to false mean key is not pressed anymore 
    //}
    //if (t.code == "ArrowLeft") {
      //  this.keyLeft = false;
    //}
    //if (t.code == "ArrowUp") {
      //  this.keyUp = false;
    //}
    //if (t.code == "ArrowDown") {
      //  this.keyDown = false;
    //}
//}

