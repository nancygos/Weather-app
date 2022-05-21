import React, { useEffect, useState } from 'react'

function Home() {
  const [state, setState] = useState([]);   // API data
  const [city , setCity] = useState("Samalkha");   //Search bar

  // Time
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  // console.log(date);

  useEffect(() => {
    const getData = async()=>{
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=069f0437cd300f3ea1f338375b7932f6`;
        const ans = await fetch(url);
        const result = await ans.json();
        // console.log(result);
  
        setState(result.main);
      }
      catch(err){
        console.log(err);
      }

    }
    
    getData();
  }, [city]);
  
  let greet = ' ';
  if({hour} >= 12) greet = 'pm';
  else greet = 'am';

  return (
    <>
        <nav>
          <div className="navbar-container">
              <div className="logo">WeatherApp</div>
              <input type="search" name="search" id="search" placeholder='Search Place....'  onChange={ (e) => { setCity(e.target.value) } } />
          </div>
        </nav>
        
        {!state ? ( <p>No data Found</p> ) : 
                
          <div className="home-container">
              <div className="box">
                <div className="degree">{(state.temp -273.17).toFixed(2)} &#8451; </div>
                <div className="time">{hour}:{minute} {greet} </div>
                {/* <div className="condition">{state.weather.description}</div> */}
                <div className="time">Min : {(state.temp_min -273.15).toFixed(2)} &#8451; | Max : {(state.temp_max - 273.15).toFixed(2)} &#8451;</div>
                <div className="humidity">Humidity : {state.humidity}</div>
                <div className="pressure">Pressure: {state.pressure}</div>
                <div className="place">Place : {city}</div>
              </div>
          </div>   
        }
    </>
  )
}

export default Home