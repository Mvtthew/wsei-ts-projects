interface AudioSound {
	src: string;
	key: string;
}

interface AudioRecordedSound {
	sound: AudioSound;
	timeOffset: number;
}

interface AudioRecordChannel {
	recordedSounds: AudioRecordedSound[];
	isRecording: boolean;
	recordingStart: Date;
}

class SoundsLibrary {
	sounds: AudioSound[];

	constructor() {
		this.sounds = [];
		this.initDummySounds();
	}

	private initDummySounds() {
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
	sounds: AudioSound[];
	recordChannels: AudioRecordChannel[];

	constructor(recordChannelsAmount = 4) {
		this.recordChannels = [];
		this.initRecordChannels(recordChannelsAmount);
		this.initDrumKitSounds();
		this.initDrumKitKeyboardListeners();
		this.initChannelUIButtons();
		this.initKeysUIButtons();
	}

	private initRecordChannels(amount: number) {
		for (let i = 0; i < amount; i++) {
			this.recordChannels.push({
				recordedSounds: [],
				isRecording: false,
				recordingStart: new Date(),
			});
		}
	}

	private initDrumKitSounds() {
		this.sounds = new SoundsLibrary().sounds;
	}

	private initDrumKitKeyboardListeners() {
		this.sounds.forEach((sound) => {
			document.addEventListener('keyup', (e) => {
				if (e.key == sound.key) {
					this.playSound(sound);
				}
			});
		});
	}

	private playSound(sound: AudioSound, withRecord = true) {
		const soundKeyBtn = document.getElementById(`s_${sound.key}`);
		soundKeyBtn.classList.add('btn-dark');
		soundKeyBtn.classList.add('text-white');
		setTimeout(() => {
			soundKeyBtn.classList.remove('btn-dark');
			soundKeyBtn.classList.remove('text-white');
		}, 100);
		new Audio(sound.src).play();
		if (withRecord) this.toRecording(sound);
	}

	private toRecording(sound: AudioSound) {
		this.recordChannels.forEach((rc) => {
			if (rc.isRecording) {
				rc.recordedSounds.push({
					sound,
					timeOffset: new Date().getTime() - rc.recordingStart.getTime(),
				});
			}
		});
	}

	private initChannelUIButtons() {
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

	private initKeysUIButtons() {
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

	private toggleRecordChannelButtonClasses(recordChannelIndex: number) {
		const channelButtons = document.querySelectorAll('.record-channel-button');
		channelButtons[recordChannelIndex].classList.toggle('btn-primary');
		channelButtons[recordChannelIndex].classList.toggle('btn-danger');
	}

	public toggleRecording(recordChannelIndex: number) {
		this.toggleRecordChannelButtonClasses(recordChannelIndex);
		if (!this.recordChannels[recordChannelIndex].isRecording) this.recordChannels[recordChannelIndex].recordedSounds = [];
		this.recordChannels[recordChannelIndex].isRecording = !this.recordChannels[recordChannelIndex].isRecording;
		this.recordChannels[recordChannelIndex].recordingStart = new Date();
	}

	public playRecording(recordChannelIndex: number) {
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
