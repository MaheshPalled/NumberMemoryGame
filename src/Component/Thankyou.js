import React, { Component } from 'react';
import { Row, Button} from 'reactstrap';
import { Link } from "react-router-dom";

export default function Thankyou(props) {

    return (
        <div className="container">
            <div className="container">
            <h1 className="Row"> Thank you :  plyaer name</h1>
            <h1 className="Row"> You did make it till level 1, which is awesome..!</h1>
            <h1 className="Row"> See you soon..! </h1>
            </div>

            <Link to="/">
                <Row>
                    <Button> Restart</Button>
                </Row>
            </Link>
        </div>

    );

}