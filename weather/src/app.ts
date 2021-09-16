import axios from "axios";
import config from "./config/config";
import IWeatherData from "./types/IWeatherData";

class App {

    appElement: HTMLDivElement;
    weatherInputElement: HTMLInputElement;
    searchWeatherButtonElement: HTMLButtonElement;
    weatherData: IWeatherData;

    constructor() {
        this.init();
    }

    private init(): void {
        this.appElement = document.getElementById('app') as HTMLDivElement;
        this.weatherInputElement = this.appElement.querySelector('#weather-input') as HTMLInputElement;
        this.searchWeatherButtonElement = this.appElement.querySelector('#search-weather') as HTMLButtonElement;

        this.initSearchButton();
    }

    private initSearchButton(): void {
        this.searchWeatherButtonElement.addEventListener('click', () => {
            this.getWeatherForInput();
        });
    }

    private async getWeatherForInput(): Promise<void> {
        const cityName: string = this.weatherInputElement.value;
        const res = await axios.get(`${config.apiUrl}?q=${cityName}${config.apiKey}&units=metric`);
        this.weatherData = res.data as IWeatherData;
        this.renderWeatherData();
        this.renderClouds();
    }

    private renderWeatherData(): void {
        this.appElement.querySelector('#weather-min-max').innerHTML = `Min: ${this.weatherData.main.temp_min}°C / Max: ${this.weatherData.main.temp_max}°C`;
        this.appElement.querySelector('#weather-main').innerHTML = `${this.weatherData.main.temp}°C`;
        this.appElement.querySelector('#weather-desc').innerHTML = this.weatherData.weather[0].main;
        this.appElement.querySelector('#weather-desc-small').innerHTML = this.weatherData.weather[0].description;
    }

    private renderClouds(): void {
        for(let i = 0; i < 50; i++) {
            const icon = Math.random() + 1 >= this.weatherData.clouds.all / 100 + 1 ? 'bx-wind' : ' bx-cloud';
            const animationTime: number = 10/this.weatherData.wind.speed;
            this.appElement.querySelector('#weather-box').innerHTML +=
                `<i class="bx ${icon} position-absolute text-dark animate-cloud" style="margin-left: ${Math.floor(Math.random() * 20)}rem; top: ${Math.floor(Math.random() * 90)}%; animation-delay: ${Math
                    .random()*animationTime}s; animation-duration: ${animationTime}s"></i>`;
        }
    }
}

new App();