class SoundsLibrary {
    constructor() {
        this.sounds = [];
        this.initDummySounds();
    }
    initDummySounds() {
        this.sounds.push({
            key: 'a',
            src: 'audio/clap.wav',
        });
        this.sounds.push({
            key: 's',
            src: 'audio/wierd.wav',
        });
    }
}
class DrumKitApplication {
    constructor(recordChannelsAmount = 4) {
        this.recordChannels = [];
        this.initRecordChannels(recordChannelsAmount);
        this.initDrumKitSounds();
        this.initDrumKitKeyboardListeners();
        this.initChannelUIButtons();
        this.initKeysUIButtons();
    }
    initRecordChannels(amount) {
        for (let i = 0; i < amount; i++) {
            this.recordChannels.push({
                recordedSounds: [],
                isRecording: false,
                recordingStart: new Date(),
            });
        }
    }
    initDrumKitSounds() {
        this.sounds = new SoundsLibrary().sounds;
    }
    initDrumKitKeyboardListeners() {
        this.sounds.forEach((sound) => {
            document.addEventListener('keyup', (e) => {
                if (e.key == sound.key) {
                    this.playSound(sound);
                }
            });
        });
    }
    playSound(sound, withRecord = true) {
        const soundKeyBtn = document.getElementById(`s_${sound.key}`);
        soundKeyBtn.classList.add('btn-dark');
        soundKeyBtn.classList.add('text-white');
        setTimeout(() => {
            soundKeyBtn.classList.remove('btn-dark');
            soundKeyBtn.classList.remove('text-white');
        }, 100);
        new Audio(sound.src).play();
        if (withRecord)
            this.toRecording(sound);
    }
    toRecording(sound) {
        this.recordChannels.forEach((rc) => {
            if (rc.isRecording) {
                rc.recordedSounds.push({
                    sound,
                    timeOffset: new Date().getTime() - rc.recordingStart.getTime(),
                });
            }
        });
    }
    initChannelUIButtons() {
        const channelButtonsBox = document.querySelector('.record-channels');
        const playChannelButtonsBox = document.querySelector('.play-channels');
        this.recordChannels.forEach((_, index) => {
            // Record buttons
            const channelRecordButton = document.createElement('button');
            channelRecordButton.classList.add('record-channel-button');
            channelRecordButton.classList.add('btn');
            channelRecordButton.classList.add('btn-lg');
            channelRecordButton.classList.add('btn-primary');
            channelRecordButton.classList.add('me-2');
            channelRecordButton.innerHTML = `${index + 1}`;
            channelRecordButton.addEventListener('click', () => {
                this.toggleRecording(index);
            });
            channelButtonsBox.appendChild(channelRecordButton);
            // Play buttons
            const playRecordButton = document.createElement('button');
            playRecordButton.classList.add('play-channel-button');
            playRecordButton.classList.add('btn');
            playRecordButton.classList.add('btn-lg');
            playRecordButton.classList.add('btn-primary');
            playRecordButton.classList.add('me-2');
            playRecordButton.innerHTML = `${index + 1}`;
            playRecordButton.addEventListener('click', () => {
                this.playRecording(index);
            });
            playChannelButtonsBox.appendChild(playRecordButton);
        });
    }
    initKeysUIButtons() {
        const soundKeyBox = document.querySelector('.sound-keys');
        this.sounds.forEach((s) => {
            const soundButton = document.createElement('button');
            soundButton.innerHTML = `${s.key}`;
            soundButton.classList.add('btn');
            soundButton.classList.add('btn-lg');
            soundButton.classList.add('btn-outline-dark');
            soundButton.classList.add('me-2');
            soundButton.classList.add('p-5');
            soundButton.id = `s_${s.key}`;
            soundButton.addEventListener('click', () => {
                this.playSound(s);
            });
            soundKeyBox.appendChild(soundButton);
        });
    }
    toggleRecordChannelButtonClasses(recordChannelIndex) {
        const channelButtons = document.querySelectorAll('.record-channel-button');
        channelButtons[recordChannelIndex].classList.toggle('btn-primary');
        channelButtons[recordChannelIndex].classList.toggle('btn-danger');
    }
    toggleRecording(recordChannelIndex) {
        this.toggleRecordChannelButtonClasses(recordChannelIndex);
        if (!this.recordChannels[recordChannelIndex].isRecording)
            this.recordChannels[recordChannelIndex].recordedSounds = [];
        this.recordChannels[recordChannelIndex].isRecording = !this.recordChannels[recordChannelIndex].isRecording;
        this.recordChannels[recordChannelIndex].recordingStart = new Date();
    }
    playRecording(recordChannelIndex) {
        if (!this.recordChannels[recordChannelIndex].isRecording) {
            this.recordChannels[recordChannelIndex].recordedSounds.forEach((s) => {
                setTimeout(() => {
                    this.playSound(s.sound, false);
                }, s.timeOffset);
            });
        }
    }
}
const drumApp = new DrumKitApplication();
