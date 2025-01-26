import React, { useRef } from 'react'
import './Weather.css'
import { useState ,useEffect } from 'react'
import { FaSearch ,FaTint, FaWind } from 'react-icons/fa'
import sun  from '../assets/sun.svg'
import rain from "../assets/rain.svg"
import cloud from '../assets/cloud.svg'


function Weather() {

  
  const inputRef =useRef();
  const [weatherData , setweatherData]= useState(false);

  const allIcons = {
    "01d":sun,
    "01n": sun,
    "02d": cloud,
    "04d":cloud,
    "09d": rain,
    "010d": rain,
    "01n": sun,
    "02n": cloud,
    "04n": cloud,
    "04n": cloud,
    "09n": rain,
    "10n": rain,
  }
 const search = async (city)=>{
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city }&unit=metric&appid=e6eccb052bb7b60405137a9296249a35`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon=allIcons[data.weather[0]. icon] || cloud
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location:data.name,
        icon:icon
      })
    } catch (error) {
       
    }

 }

 useEffect(()=>{
    search("")
 },[])
  return (
     <div className='bgImage' >
    <div className='weather'>
        
       <div className='searchbar'>
        
        <input ref={inputRef}type='text' placeholder='Enter location' />
        <button className='searchbar' onClick={()=>search(inputRef.current.value)}>
          
          <FaSearch></FaSearch>
          </button> 
        
       </div>
       <img src={weatherData.icon} alt='' className='weathericon' ></img>
       <p className='temp'>{weatherData.temperature}°c</p>
       <p className='location'>{weatherData.location}</p> 

       <div className='weatherdata'>
        <div className='col'>
          <span className='icons'><FaTint className='i'style={{ fontSize: 30 }} ></FaTint></span>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
        </div>

        <div className='col'>
          <span className='icons'><FaWind className='i'style={{ fontSize: 30 }} ></FaWind></span>
          <div>
            <p>{weatherData.windSpeed}Km/hr</p>
            <span>Wind speed</span>
            </div>
        </div>
        </div>
      </div>

      
    </div>
   </div>
  )
}


export default Weather
