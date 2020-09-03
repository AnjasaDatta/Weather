import React, { useState } from 'react';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '53e074229265bc8c460e3079cff4c29b';

const App = () => {
  var monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var daysArr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var date = new Date();
  var day = daysArr[date.getDay()];
  var dayno = date.getDate();
  var month = monthArr[date.getMonth()];
  var year = date.getFullYear();
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [country, setCountry] = useState('');
  const finalURL = `${URL}/?q=${search},${country}&appid=${apiKey}`;
  function handleSubmit(e) {
    e.preventDefault();
    console.log('aa');
    fetch(finalURL)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setSearch('');
        setCountry('');
      })
      .catch(err => console.log(err));
  }
  function handleChange(e) {
    if (e.target.name === 'search') setSearch(e.target.value);
    else if (e.target.name === 'country') setCountry(e.target.value);
  }
  return (
    <div
      className={
        weather.main !== undefined
          ? Math.round(weather.main.temp - 273.15) > 15
            ? 'warm'
            : 'cold'
          : 'cold'
      }
    >
      <main>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className='search'
            type='text'
            placeholder='Enter the City Name....'
            name='search'
            value={search}
          />
          <br />
          <br />
          <input
            onChange={handleChange}
            className='search'
            type='text'
            placeholder='Enter the Country Code....'
            name='country'
            value={country}
          />
          <br />
          <br />
          <button className='submit' type='submit'>
            Submit
          </button>
        </form>
        {weather.main !== undefined ? (
          <div>
            <p className='City'>
              {weather.name},{weather.sys.country}
            </p>
            <p className='date'>
              {day} {dayno} {month} {year}
            </p>
            <p className='temp'>{Math.round(weather.main.temp - 273.15)} °C</p>
            <p>{weather.weather[0].main}</p>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
};

export default App;
