import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWidgetConfig } from '../../redux/dashboardSlice';

const Clock = ({ id, config }) => {
    const [time, setTime] = useState(new Date());
    const dispatch = useDispatch();
    const { timezone = 'Europe/Paris' } = config;

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = () => {
        return time.toLocaleTimeString('fr-FR', { timeZone: timezone });
    };

    const changeTimezone = (e) => {
        dispatch(updateWidgetConfig({
            id,
            config: { timezone: e.target.value },
        }));
    };

    return (
        <div className="clock-widget">
            <div className="time-display">{formatTime()}</div>
            <div className="widget-settings">
                <select value={timezone} onChange={changeTimezone}>
                    <option value="Europe/Paris">Paris</option>
                    <option value="America/New_York">New York</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                    <option value="Australia/Sydney">Sydney</option>
                </select>
            </div>
        </div>
    );
};

export default Clock;