import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col } from 'react-bootstrap';



const WeatherSearch = props =>{

    const [search, setSearch] = useState('');

     const onClick = (event) => {
        event.preventDefault()
        // console.log(search)
        props.submitCity(search);
        
    }
  
return (
<Container>
    <Row>
       <Col>
       <form onSubmit={onClick} class="row">
           <Col md={{ span: 4, offset: 4 }} >   <input  onChange={(event)=>setSearch(event.target.value)} className="form-control" type="text" name="city" id="city" placeholder="Buenos Aires, Argentina" aria-label="Search"></input></Col>
           <><Button type="submit" ><FontAwesomeIcon icon={faSearchPlus}   /></Button>{' '}</>
     
        </form>
       </Col>   
    </Row>
</Container>
);
   
}


export default WeatherSearch;