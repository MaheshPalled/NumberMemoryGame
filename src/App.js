import React, { Component } from 'react';
import {
  Jumbotron, Modal, ModalBody, ModalHeader, Form,
  FormGroup, Label, Input, Button
} from 'reactstrap';
import './App.css';
import CardCreator from "./Component/CardCreator";
import Thankyou from './Component/Thankyou';
import { BrowserRouter, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      userName: ''
    }
    this.handleModal = this.handleModal.bind(this);
  }


  handleModal(event) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      userName: this.userName.value
    })
  }

  render() {
    const profile = this.state.userName;
    const HomePage = () => {
      return (
        <div>
          <Modal isOpen={this.state.modalOpen} toggle={this.handleModal}>
            <ModalHeader toggle={this.handleModal}>Enter player name</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleModal}>
                <FormGroup>
                  <Label htmlFor="username">Player Name</Label>
                  <Input type="text" id="username" name="username"
                    innerRef={input => this.userName = input} />
                </FormGroup>
                <Link to={{
                  pathname: '/game',
                  state: {
                    playerName: { profile }
                  }
                }}>
                  <Button type="submit" value="submit" color="primary" onClick={this.handleModal}>Continue.!!</Button>
                </Link>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Jumbotron>
          <div className="container">
            <h4>Welcome to the Online memory game {this.state.userName}</h4>
          </div>
        </Jumbotron>
        <BrowserRouter>
          <div className="App">
            <Route path='/' exact component={HomePage} />
            <Route path='/game' exact component={CardCreator} />
            <Route path='/thankyou' exact component={Thankyou} />
          </div>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}


export default App;
