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

