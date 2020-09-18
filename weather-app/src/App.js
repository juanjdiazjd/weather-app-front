import React, {useState, useEffect} from 'react';
import './App.css';
import Loader from 'react-loader-spinner'

import WeatherSearch from '../src/Components/WeatherSearch'
import WeatherCard from '../src/Components/WeatherCard'

import { Container, Row, Col } from 'react-bootstrap';
const axios = require('axios').default;

const url_api = "http://localhost:9100"


function App() {
 

  const [location, setLocation] = useState(null);
  const [weatherDataList, setweatherDataList] = useState([]);
  const [positionCard, setPositionCard] = useState(null);
  // const weatherDataList = [ <WeatherCard location={location}></WeatherCard>]

  useEffect(()=>{
    
    massiveData("",false) },[])


  //http requests

  //Funcion que le pasas una ciudad, y te devuelve: datos de localizacion, el clima actual, y datos del clima de 5 días posteriores.
  const massiveData = (city,isSearch) => {

    let one = url_api +"/v1/location";
  let two = ""
  let three =""
  if(!city){ 
    two = url_api +"/v1/current";
    three =   url_api +"/v1/forecast";
  }else{
     two = url_api +"/v1/current/"+city;
    three=  url_api + "/v1/forecast/"+city;
  }


const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
const allData = []

axios
  .all([!isSearch ? requestOne : null, requestTwo, requestThree])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responesThree = responses[2];

      allData.push(!isSearch ? responseOne.data : null, responseTwo.data, responesThree.data)
      // console.log(allData);
      if(!isSearch){setLocation(allData)}else{
        console.log(allData)
      setweatherDataList([... weatherDataList,<WeatherCard location={allData} isSearch={true} close={true}  deleteCity={deleteCity}></WeatherCard>]);
      setPositionCard(weatherDataList.length+1)
     
      }
      
    })
  )
  .catch(errors => {
    console.error(errors);
  });
  }
  const deleteCity   = () =>{
    setweatherDataList([...weatherDataList  ,[weatherDataList.splice(positionCard)]])
    console.log("weatherDataList.length: ", weatherDataList.length)
    if(weatherDataList.length == 0){setweatherDataList([])}

  }
  const submitCity   = (city) =>{
    console.log(city)
    
    if (weatherDataList.length == 5 ) {
    setweatherDataList([<h1 style={{color:'red'}}>No se puede agregar más de cinco ubicaciones, por favor elimine alguna.</h1>,...weatherDataList])
    }

    else if (weatherDataList.length  < 6 && city) {
      massiveData(city,true)
    }

  }

 
  return (

   
    <div className="App">
      
      {!location
      ?
      <Container>
      <Loader style={{marginTop:'20%'}}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100} visible={true}
      
   />
   <p>Cargando...</p>
   </Container>
      
      : <Container>
      <Row className="justify-content-md-center">
        <Col > <h1 className="title">
          Weather App
          </h1></Col>
      </Row>
      <Row>
        <Col>
       <WeatherCard location={location}  isSearch={false}></WeatherCard>
    <WeatherSearch submitCity={submitCity}></WeatherSearch>
    </Col>
      </Row>
      <br></br>
      <Row>
        {weatherDataList}
       </Row>
    </Container>
    }
 
    </div>
     
  );
}

export default App;
