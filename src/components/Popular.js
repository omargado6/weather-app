import React, { useEffect, useState } from 'react';
import 'daisyui/dist/full.css';

import cairo from "../img/image/cairo.jpg"
import tokyo from "../img/image/tokyo.jpg"
import london from "../img/image/london.jpg"
import makkah from "../img/image/MAKKAH.jpg"
import nyc from "../img/image/NYC.webp"
import roma from "../img/image/roma.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';


function Popular() {
    const cities = [
        { id: 1, name: "Cairo", img: cairo },
        { id: 2, name: "Makka", img: makkah },
        { id: 3, name: "Roma", img: roma },
        { id: 4, name: "New York", img: nyc },
        { id: 5, name: "London", img: london },
        { id: 6, name: "Tokyo", img: tokyo },
    ];
    const APIkEY = `3aac1ecd6bc3c3e157f55a0917ce0056`;
    const [weather, setweather] = useState([]);
    useEffect(() => {
        const fetchWeather = async () => {
            const citydata = cities.map((city) => {
                const APIk = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${APIkEY}&units=metric`;
                return fetch(APIk).then((res) => res.json())
            });
            try {
                const weatherResult = await Promise.all(citydata);
                const weatherImages = weatherResult.map((we, ind) => ({
                    ...we,
                    img: cities[ind].img,
                    name: cities[ind].name,
                    id: cities[ind].id,
                }))
                setweather(weatherImages);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            pagination={{
                clickable: true,
            }}
            className="w-full max-w-screen-2xl"
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 60
                },
                1199: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },

            }}>
            {weather.map((city) => (
                <SwiperSlide className="mb-7" key={city.id}>
                    <div className="card mx-auto shadow-xl image-full w-96 h-64 max-sm:w-72" >
                        <figure className='h-64' ><img src={city.img} alt={city.name} className="w-96" /></figure>
                        <div className="card-body ">
                            <p className=" text-center text-3xl text-white">{city.name}</p>
                            <p className="text-5xl text-white">{city.main.temp.toFixed(0)}°c </p>
                            <p className="text-2xl text-white">{city.weather[0].main}</p>
                            <p className="text-white text-xl"> H: {city.main.temp_max.toFixed(0)}°c | <span className="px-3 max-sm:px-0 "> L : {city.main.temp_min.toFixed(0)}°c</span></p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Popular;