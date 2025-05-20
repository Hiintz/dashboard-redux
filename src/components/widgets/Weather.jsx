import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWidgetConfig } from '../../redux/dashboardSlice';

const Weather = ({ id, config }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { city = 'Paris' } = config;

    // TODO : utiliser une vraie API
    // Ici, simulation d'une API pour l'exemple
    useEffect(() => {
        setLoading(true);
        // Simulation d'une requête API
        setTimeout(() => {
            const fakeWeatherData = {
                temperature: Math.floor(Math.random() * 30) + 5, // Entre 5 et 35 degrés
                condition: ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Orageux'][Math.floor(Math.random() * 4)],
                humidity: Math.floor(Math.random() * 60) + 40, // Entre 40% et 100%
            };
            setWeather(fakeWeatherData);
            setLoading(false);
        }, 1000);
    }, [city]);

    const changeCity = (e) => {
        dispatch(updateWidgetConfig({
            id,
            config: { city: e.target.value },
        }));
    };

    if (loading) {
        return <div className="loading">Chargement de la météo...</div>;
    }

    return (
        <div className="weather-widget">
            <div className="city-name">{city}</div>
            <div className="weather-info">
                <div className="temperature">{weather.temperature}°C</div>
                <div className="condition">{weather.condition}</div>
                <div className="humidity">Humidité: {weather.humidity}%</div>
            </div>
            <div className="widget-settings">
                <select value={city} onChange={changeCity}>
                    <option value="Paris">Paris</option>
                    <option value="Londres">Londres</option>
                    <option value="Berlin">Berlin</option>
                    <option value="New York">New York</option>
                </select>
            </div>
        </div>
    );
};

export default Weather;