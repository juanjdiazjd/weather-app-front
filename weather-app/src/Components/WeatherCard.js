/* eslint-disable */
import moment from 'moment'
import React from 'react'
import {  Row, Col } from 'react-bootstrap';


const WeatherCard = props =>{
  
    console.log(props)

    const parseWind = (wind) =>{
        return parseInt(wind*3.6)
    }
const parseDate = (date)  => {
    return moment(date).format('dddd').substring(0,3)
}





    return (
        <div class="card">
            {props.close ? <button onClick={props.deleteCity} style={{width: '38px',marginLeft: '80%',position: 'absolute',marginTop:'-5%',borderRadius:0}} type="button" class="btn btn-danger">X</button> : null}
            <Row>
            <Col><h2 style={{textAlign:'left'}}>{!props.isSearch ? props.location[0].city : props.location[1].locationData.city}</h2></Col>
        </Row>
        <Row>
            <Col><h5 style={{textAlign:'left'}}>{!props.isSearch ?  props.location[0].regionName : ""}</h5></Col>
        </Row>
        <Row>
            <Col><p style={{textAlign:'left'}}>{!props.isSearch ?  props.location[0].country :props.location[1].locationData.country}</p></Col>
        </Row> 
       
        
            <Row>
        <Col>{props.location[1].weatherData.weather[0].description}<span>Wind {parseWind(props.location[1].weatherData.wind.speed)}km/h</span>
                
        <span class="dot">•</span> <span> Humidity {props.location[1].weatherData.main.humidity} %</span></Col>
            </Row>
           
            
            <Row>
                <Col>  <div class="sky">
                <div class="sun"></div>
                {props.location[1].weatherData.weather[0].description == 'clear sky' ? null:  <div class="cloud">
                    <div class="circle-small"></div>
                    <div class="circle-tall"></div>
                    <div class="circle-medium"></div>
                </div>}
               
            </div></Col>
    <Col><h1 style={{fontSize: '65px',top: '23%'}}>{parseInt(props.location[1].weatherData.main.temp)}°</h1></Col>
            </Row>
            
          <br></br>
            <table>
                <tr>
                    {   props.location[2].forecastData.map(element => {
      
            return <td>{parseDate(element.dt_txt)}</td>
        })}
                </tr>
                <tr>
                {   props.location[2].forecastData.map(element => {
      
      return <td>{parseInt(element.max)}°</td>
  })}

                </tr>
                <tr>
                {   props.location[2].forecastData.map(element => {
      
      return <td>{parseInt(element.min)}°</td>
  })}

              
                </tr>
            </table>
        </div>
       
    )


}

    
  


export default WeatherCard;