import UI from './UI';
import WeatherApi from './WeatherApi';

const weather = new WeatherApi();

const ui = new UI(weather);
weather.getWeather().then(() => {
	ui.renderData();
});
