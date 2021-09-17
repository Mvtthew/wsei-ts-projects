import WeatherApi from './WeatherApi';

export default class UI {
	inputEl: HTMLInputElement;
	buttonEl: HTMLButtonElement;
	weatherApi: WeatherApi;

	constructor(weatherApi: WeatherApi) {
		this.weatherApi = weatherApi;
		this.inputEl = document.getElementById('city-input') as HTMLInputElement;
		this.initInput();
		this.buttonEl = document.getElementById('get-weather-button') as HTMLInputElement;
		this.initButton();
	}

	private initInput() {
		this.inputEl.addEventListener('keyup', (e) => {
			this.weatherApi.city = (e.target as HTMLInputElement).value;
		});
	}

	private initButton() {
		this.buttonEl.addEventListener('click', () => {
			this.weatherApi.getWeather().then(() => {
				this.renderData();
			});
		});
	}

	public renderData() {
		const data = this.weatherApi.data;
		document.getElementById('city-name').innerHTML = data.name;
		document.getElementById('temp').innerHTML = data.main.temp.toFixed(1) + '°C';
		document.getElementById('text').innerHTML = data.weather[0].main;
		document.getElementById('visibility').innerHTML = 'Visibility: ' + data.visibility.toString() + 'm';
		document.getElementById('min').innerHTML = 'min ' + data.main.temp_min.toString() + '°C';
		document.getElementById('max').innerHTML = 'max ' + data.main.temp_max.toString() + '°C';
	}
}
