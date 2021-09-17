interface WeatherItem {
	description: string;
	icon: string;
	id: number;
	main: string;
}

interface WeatherData {
	name: string;
	visibility: number;
	clouds: {
		all: number;
	};
	main: {
		feels_like: number;
		humidity: number;
		pressure: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	weather: WeatherItem[];
}
export default class WeatherApi {
	private apiKey: string = 'f054371b11ebe3fa19fbcb60969b8b97';
	public city: string = '';
	data: WeatherData;

	constructor() {
		this.city = 'Krakow';
	}

	public async getWeather() {
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}&units=metric`;
		const res = await fetch(url);
		const data = await res.json();
		this.data = data;
	}
}
