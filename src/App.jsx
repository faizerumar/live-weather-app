import { useState } from 'react';
import { fetchWeather, fetchForecast } from './service/weatherService.js';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);
    setSelectedDay(null);

    try {
      const currentWeather = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      
      setWeather(currentWeather);

      const dailyMap = {};
      forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; 
        if (!dailyMap[date] || item.dt_txt.includes("12:00:00")) {
          dailyMap[date] = item;
        }
      });

      // දිනයන් අනුපිළිවෙලට sort කිරීම
      let dailyData = Object.values(dailyMap).sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt));

      setForecast(dailyData);
      
      if (dailyData.length > 0) {
        setSelectedDay(dailyData[0]);
      }
    } catch (err) {
      setError("City not found or API error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (dtTxt) => {
    const date = new Date(dtTxt);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-xl transition-all duration-300 hover:shadow-2xl">
        
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400">
          LIVE WEATHER
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Enter city name (e.g., Colombo)" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow px-5 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 shadow-md"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center bg-red-100 p-3 rounded-xl mb-6 font-medium">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-gray-500 text-center animate-pulse mb-6">
            Fetching weather data...
          </p>
        )}

        {weather && selectedDay && (
          <div>
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-6 rounded-2xl text-white shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="text-sky-100 text-sm mt-1">
                    {formatDate(selectedDay.dt_txt)}
                  </p>
                </div>
                <img 
                  src={getWeatherIcon(selectedDay.weather[0].icon)} 
                  alt={selectedDay.weather[0].description}
                  className="w-16 h-16 -mr-2 drop-shadow-md"
                />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-6xl font-black tracking-tighter">
                    {Math.round(selectedDay.main.temp)}<span className="text-3xl align-top opacity-70">°C</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold capitalize">
                    {selectedDay.weather[0].description}
                  </p>
                  <p className="text-xs text-sky-100 mt-1">
                    Feels like: {Math.round(selectedDay.main.feels_like)}°C | Wind: {selectedDay.wind.speed} m/s
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-sky-300/40 text-center">
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                  <p className="text-xs text-sky-100">Humidity</p>
                  <p className="text-lg font-bold">{selectedDay.main.humidity}%</p>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                  <p className="text-xs text-sky-100">Pressure</p>
                  <p className="text-lg font-bold">{selectedDay.main.pressure} hPa</p>
                </div>
              </div>
            </div>
            
            {forecast.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Select a Day (Weekly Outlook)
                </h3>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                  {forecast.map((day, index) => {
                    const isSelected = selectedDay.dt_txt === day.dt_txt;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDay(day)}
                        className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <span className="text-xs font-semibold mb-1">
                          {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <img 
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                          alt="icon" 
                          className="w-9 h-9 my-0.5"
                        />
                        <span className="text-xs sm:text-sm font-bold">
                          {Math.round(day.main.temp)}°C
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;