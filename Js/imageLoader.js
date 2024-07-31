
/* class Imageloader to load all image before the game start */
class imageLoader{
    constructor() {
        this.lstPaths = [];
        this.lstImages= [];
        this.callBack = null;
        this.loadedImgCount = 0;
    }
    /* add function to add img with path of the img as parameter*/
    add(pPathImage) {
        /* add the img path to the list of img path(lstPaths) */
        this.lstPaths.push(pPathImage);
    }
    /* function to count loaded img */
    getTotalImg(){
        return this.lstPaths.length;
    }
    /* function to count total loaded img */
    getTotalImgLoaded(){
        return this.loadedImgCount;
    }
    getListImg(){
        return this.lstImages;
    }

    /* to get the % of loaded img */
    getLoadedRatio(){
        return this.loadedImgCount / this.getTotalImg();
    }

    /* callback function to check if added img is load */
    start(pcallBack) {
        this.callBack = pcallBack;
        this.lstPaths.forEach(path => {
            let img = new Image();
            img.onload = this.imgLoaded.bind(this);
            img.src = path;
            this.lstImages[path] = img;
        })
    }
    imgLoaded(e){
        this.loadedImgCount++;
        console.log("img loaded",e.target.currentSrc)
        if (this.loadedImgCount == this.lstPaths.length) {
            console.log("Everything has been loaded !");
            this.callBack();
        }
    }

    /* functin to retrieve specific img from the imgloader */
    getImg(pPath) {
        return this.lstImages[pPath];
    }

}