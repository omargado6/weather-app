import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import image from "../img/pexels-took-a-snap-20768044.jpg";
import Popular from './Popular';

function Hero() {
    const cities = [
        'Cairo', 'Alexandria', 'Lagos', 'Abuja', 'Johannesburg', 'Cape Town', 'Nairobi', 'Mombasa', 'Casablanca', 'Marrakech',
        'Tokyo', 'Osaka', 'Beijing', 'Shanghai', 'Mumbai', 'New Delhi', 'Bangkok', 'Chiang Mai', 'Dubai', 'Abu Dhabi',
        'London', 'Manchester', 'Paris', 'Lyon', 'Berlin', 'Munich', 'Rome', 'Milan', 'Madrid', 'Barcelona',
        'New York', 'Los Angeles', 'Toronto', 'Vancouver', 'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Córdoba', 'Mexico City', 'Guadalajara',
        'Amsterdam', 'Rotterdam', 'Brussels', 'Antwerp', 'Vienna', 'Salzburg', 'Prague', 'Brno', 'Warsaw', 'Krakow', 'Budapest', 'Debrecen', 'Stockholm',
        'Gothenburg', 'Oslo', 'Bergen', 'Copenhagen', 'Aarhus', 'Helsinki', 'Espoo', 'Athens', 'Thessaloniki', 'Lisbon', 'Porto', 'Dublin', 'Cork', 'Zurich',
        'Geneva', 'Moscow', 'Saint Petersburg', 'Istanbul', 'Ankara', 'Kiev', 'Lviv'
    ];
    const API = `3aac1ecd6bc3c3e157f55a0917ce0056`;
    const [city, setCity] = useState('london');
    const [weatherinfo, setWeatherinfo] = useState([]);
    const [url, setUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${API}&units=metric`);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const res = await axios(url);
                setWeatherinfo(res.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [url])

    return (
        <div className="hero min-h-screen font-serif" style={{ backgroundImage: `url(${image})` }}>
            <div className="hero-overlay bg-opacity-10" style={{ opacity: 1 }}></div>
            <div className="text-center grid grid-cols-4 justify-center items-center h-screen min-w-full">
                <div className="card shadow-xl col-span-4 mx-auto w-7/12 max-sm:w-4/6 max-h-min pt-5" style={{ backgroundColor: "rgb(33 38 36 / 90%)" }}>
                    <div className="search-slide w-fit max-sm:w-3/4 mx-auto ">
                        <form
                            onSubmit={e => {
                                setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
                                e.preventDefault();
                            }}
                        >
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow max-sm:w-10"
                                    placeholder="search..."
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    list="cities-datalist"
                                />
                                <datalist id="cities-datalist" className="">
                                    {cities.map((cityName, index) => (
                                        <option key={index} value={cityName} />
                                    ))}
                                </datalist>
                                <button type='submit' onClick={() => setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                </button>
                            </label>
                        </form>
                    </div>
                    {isError && <div>something error...</div>}
                    {isLoading ? <div>
                        <span className="loading loading-ring loading-xs"></span>
                        <span className="loading loading-ring loading-sm"></span>
                        <span className="loading loading-ring loading-md"></span>
                        <span className="loading loading-ring loading-lg"></span>
                    </div> :
                        <>
                            {weatherinfo && (
                                <div className="card-body text-neutral-300">
                                    <div className="card-title text-center space-x-5">
                                        <p className="text-4xl font-bold p-2 max-md:text-3xl  max-sm:p-0 ">{weatherinfo?.main?.temp ? weatherinfo.main.temp.toFixed(0) : ''} °C {weatherinfo?.weather?.[0]?.icon && (<img className="max-sm:hidden" src={`http://openweathermap.org/img/wn/${weatherinfo.weather[0].icon}@2x.png`} alt="Weather Icon" />)}</p>
                                        <p className="text-4xl font-bold p-2 max-md:text-2xl max-sm:text-xl max-sm:p-0 ">{weatherinfo?.name}</p>
                                    </div>
                                    <p className="text-start text-2xl tracking-wider max-sm:text-xl">Weather : {weatherinfo?.weather?.[0]?.main}</p>
                                    <p className="text-start text-2xl tracking-wider max-sm:text-xl">Humidity : {weatherinfo?.main?.humidity}%  <span className="px-2 max-lg:px-0 max-lg:block ">Wind speed : {weatherinfo?.wind?.speed}</span></p>
                                    <p className="text-start text-2xl max-sm:text-xl">  H: {weatherinfo?.main?.temp_max ? weatherinfo.main.temp_max.toFixed(0) : ''}°c <span className="px-3 max-sm:px-0 "> L : {weatherinfo?.main?.temp_min ? weatherinfo.main.temp_min.toFixed(0) : ''}°c</span></p>
                                </div>
                            )}
                            {!weatherinfo && <p className="text-center">Loading weather data...</p>}
                        </>}
                </div>
                <div className="col-span-4 justify-center">
                    <Popular />
                </div>
            </div>
        </div >
    );
}

export default Hero;
