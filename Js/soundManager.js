// https://www.w3schools.com/graphics/game_sound.asp
class Sound {
    constructor(pSrc, pVol = 1, pLoop = false) {
        this.sound = document.createElement("audio");
        this.sound.src = pSrc;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.volume = pVol;
        this.sound.loop = pLoop;
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.currentTime = 0;
        this.stop();
        this.sound.play();
    }

    stop() {
        this.sound.pause();
    }
    setVolume(pVol){
        this.sound.volume = pVol;
    }
}

class SoundManager{
    constructor(){
        this.lstPaths = [];
        this.lstSounds= [];
        this.callBack = null;
        this.loadedSoundCount = 0;
    }
    addSound(pPathSound){
        this.lstPaths.push(pPathSound)
        // Debugging: Print added path
        console.log("Sound added:", pPathSound);

    }
    getTotalSounds() {
        return this.lstPaths.length;
    }

    getTotalSoundsLoaded() {
        return this.loadedSoundCount;
    }

    getLoadedRatio() {
        return this.loadedSoundCount / this.getTotalSounds();
    }

    start(pCallBack) {
        this.callBack = pCallBack;
        this.loadedSoundCount = 0; // Make sure to reset this here
        this.lstPaths.forEach(path => {
            let music = new Sound(path);
                console.log("Creating sound for path:", path);
    console.log("Current lstSounds state:", this.lstSounds);
            console.log(this.lstPaths);
            music.sound.oncanplaythrough = () => this.soundLoaded(path);
            this.lstSounds[path] = music;
            console.log("oncanplaythrough listener set for:", path);
        });
    }

    soundLoaded(path) {
        this.loadedSoundCount++;
        console.log("Sound loaded:", path);
        if (this.loadedSoundCount == this.lstPaths.length) {
            console.log("Everything has been loaded!");
            if (this.callBack) this.callBack();
        }
    }
    getSound(pPath) {
        console.log("sound returned from getsound :" ,this.lstSounds)
        return this.lstSounds[pPath];
    }
    playSound(pPath){
        let sound = this.lstSounds[pPath];
        if (sound) {
            sound.play();
            console.log("Music started:", pPath);
        } else {
            console.error("Sound not found:", pPath);
        }
    }
    stopSound(pPath){
        let sound = this.lstSounds[pPath];
        if (sound) {
            sound.stop();
        } else {
            console.error("Sound not found:", pPath);
        }
    }
    stopAllSound(){
        for (let sound in this.lstPaths){
            this.stopSound(sound);
        }
    }
}
  