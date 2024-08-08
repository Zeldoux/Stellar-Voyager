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
        this.lstSounds= {};
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

    start(pcallBack) {
        this.callBack = pcallBack;
        this.lstPaths.forEach(path => {
            let music = new Sound(path);
            music.sound.oncanplaythrough = this.soundLoaded.bind(this);
            this.lstSounds[path] = music;  // Ensure each path is correctly mapped to its Sound object
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
        console.log("Requested path:", pPath); // To see what path is being requested
        console.log("Available sounds:", this.lstSounds); // To see what's stored in lstSounds
        return this.lstSounds[pPath];
    }
    playSound(pPath){
        let sound = this.getSound(pPath);
        if (sound) {
            sound.play();
            console.log("Music started:", pPath);
        } else {
            console.error("Sound not found:", pPath);
        }
    }
    stopSound(pPath){
        let sound = this.getSound(pPath);
        if (sound) {
            sound.stop();
        } else {
            console.error("Sound not found:", pPath);
        }
    }
    stopAllSound(){
        
        for (let sound in this.lstSounds){
            this.stopSound(sound);
        }
    }
}
  