var SoundsLibrary = /** @class */ (function () {
    function SoundsLibrary() {
        this.sounds = [];
        this.initDummySounds();
    }
    SoundsLibrary.prototype.initDummySounds = function () {
        this.sounds.push({
            key: 'a',
            src: 'audio/clap.wav'
        });
        this.sounds.push({
            key: 's',
            src: 'audio/wierd.wav'
        });
        this.sounds.push({
            key: 'd',
            src: 'audio/FX2.wav'
        });
        this.sounds.push({
            key: 'f',
            src: 'audio/FX16.wav'
        });
    };
    return SoundsLibrary;
}());
var DrumKitApplication = /** @class */ (function () {
    function DrumKitApplication(recordChannelsAmount) {
        if (recordChannelsAmount === void 0) { recordChannelsAmount = 4; }
        this.recordChannels = [];
        this.initRecordChannels(recordChannelsAmount);
        this.initDrumKitSounds();
        this.initDrumKitKeyboardListeners();
        this.initChannelUIButtons();
        this.initKeysUIButtons();
    }
    DrumKitApplication.prototype.initRecordChannels = function (amount) {
        for (var i = 0; i < amount; i++) {
            this.recordChannels.push({
                recordedSounds: [],
                isRecording: false,
                recordingStart: new Date()
            });
        }
    };
    DrumKitApplication.prototype.initDrumKitSounds = function () {
        this.sounds = new SoundsLibrary().sounds;
    };
    DrumKitApplication.prototype.initDrumKitKeyboardListeners = function () {
        var _this = this;
        this.sounds.forEach(function (sound) {
            document.addEventListener('keyup', function (e) {
                if (e.key == sound.key) {
                    _this.playSound(sound);
                }
            });
        });
    };
    DrumKitApplication.prototype.playSound = function (sound, withRecord) {
        if (withRecord === void 0) { withRecord = true; }
        var soundKeyBtn = document.getElementById("s_" + sound.key);
        soundKeyBtn.classList.add('btn-dark');
        soundKeyBtn.classList.add('text-white');
        setTimeout(function () {
            soundKeyBtn.classList.remove('btn-dark');
            soundKeyBtn.classList.remove('text-white');
        }, 100);
        new Audio(sound.src).play();
        if (withRecord)
            this.toRecording(sound);
    };
    DrumKitApplication.prototype.toRecording = function (sound) {
        this.recordChannels.forEach(function (rc) {
            if (rc.isRecording) {
                rc.recordedSounds.push({
                    sound: sound,
                    timeOffset: new Date().getTime() - rc.recordingStart.getTime()
                });
            }
        });
    };
    DrumKitApplication.prototype.initChannelUIButtons = function () {
        var _this = this;
        var channelButtonsBox = document.querySelector('.record-channels');
        var playChannelButtonsBox = document.querySelector('.play-channels');
        this.recordChannels.forEach(function (_, index) {
            // Record buttons
            var channelRecordButton = document.createElement('button');
            channelRecordButton.classList.add('record-channel-button');
            channelRecordButton.classList.add('btn');
            channelRecordButton.classList.add('btn-lg');
            channelRecordButton.classList.add('btn-primary');
            channelRecordButton.classList.add('me-2');
            channelRecordButton.innerHTML = "" + (index + 1);
            channelRecordButton.addEventListener('click', function () {
                _this.toggleRecording(index);
            });
            channelButtonsBox.appendChild(channelRecordButton);
            // Play buttons
            var playRecordButton = document.createElement('button');
            playRecordButton.classList.add('play-channel-button');
            playRecordButton.classList.add('btn');
            playRecordButton.classList.add('btn-lg');
            playRecordButton.classList.add('btn-primary');
            playRecordButton.classList.add('me-2');
            playRecordButton.innerHTML = "" + (index + 1);
            playRecordButton.addEventListener('click', function () {
                _this.playRecording(index);
            });
            playChannelButtonsBox.appendChild(playRecordButton);
        });
    };
    DrumKitApplication.prototype.initKeysUIButtons = function () {
        var _this = this;
        var soundKeyBox = document.querySelector('.sound-keys');
        this.sounds.forEach(function (s) {
            var soundButton = document.createElement('button');
            soundButton.innerHTML = "" + s.key;
            soundButton.classList.add('btn');
            soundButton.classList.add('btn-lg');
            soundButton.classList.add('btn-outline-dark');
            soundButton.classList.add('me-2');
            soundButton.classList.add('p-5');
            soundButton.id = "s_" + s.key;
            soundButton.addEventListener('click', function () {
                _this.playSound(s);
            });
            soundKeyBox.appendChild(soundButton);
        });
    };
    DrumKitApplication.prototype.toggleRecordChannelButtonClasses = function (recordChannelIndex) {
        var channelButtons = document.querySelectorAll('.record-channel-button');
        channelButtons[recordChannelIndex].classList.toggle('btn-primary');
        channelButtons[recordChannelIndex].classList.toggle('btn-danger');
    };
    DrumKitApplication.prototype.toggleRecording = function (recordChannelIndex) {
        this.toggleRecordChannelButtonClasses(recordChannelIndex);
        if (!this.recordChannels[recordChannelIndex].isRecording)
            this.recordChannels[recordChannelIndex].recordedSounds = [];
        this.recordChannels[recordChannelIndex].isRecording = !this.recordChannels[recordChannelIndex].isRecording;
        this.recordChannels[recordChannelIndex].recordingStart = new Date();
    };
    DrumKitApplication.prototype.playRecording = function (recordChannelIndex) {
        var _this = this;
        if (!this.recordChannels[recordChannelIndex].isRecording) {
            this.recordChannels[recordChannelIndex].recordedSounds.forEach(function (s) {
                setTimeout(function () {
                    _this.playSound(s.sound, false);
                }, s.timeOffset);
            });
        }
    };
    return DrumKitApplication;
}());
var drumApp = new DrumKitApplication();
