import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f5d8af55b91d0cae848fc3ddaf9e9072`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  let contentLoacation;

  if (data.weather && data.weather[0].description) 
  {
    if (data.weather[0].description === 'light rain') {
      contentLoacation = <div className='img-location-rain'></div>
    }
    else if (data.weather[0].description === 'clear sky') {
      contentLoacation = <div className='img-sky-clear'></div>
    }
    else {
      contentLoacation = <div className='img-location-drizzle'></div>
    }
  }
  
  
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <div className='temperature'>
                <div className='img-clouds'></div>
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              </div>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
            <div className='temperature'>
              <div className='img-humidity'></div>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
              <p>Humidity</p>
            </div>
            <div className="wind">
            <div className='temperature'>
              <div className='img-wind'></div>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App;
