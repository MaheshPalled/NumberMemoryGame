import React, { Component } from 'react';
import { Row, Button} from 'reactstrap';
import { Link } from "react-router-dom";

export default function Thankyou(props) {
        let myLevel = (props.location.state.level);
        console.log ("object created "+myLevel);
    return (    
        <div className="container">
            <div className="container" id="cardContainer">
            <h1 className="Row"> Thank you ..! </h1>
            <h1 className="Row"> You did make it till <mark> level# {myLevel} </mark>, which is awesome..!</h1>
            <h1 className="Row"> See you soon..! </h1>
            <br>
            </br>
            </div>
            <Link to="/">
                <Row>
                    <Button> RESTART </Button>
                </Row>
            </Link>
        </div>

    );

}   