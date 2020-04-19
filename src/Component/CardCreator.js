import React, { Component } from "react";
import { Button, Row, Col, Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import {ImagePath} from "../Shared/Image";

let cardContent = [];
let selectImagePath='';

class CardCreator extends Component {
    constructor(props) {
        super(props);
        this.ImageURL=ImagePath;
        this.state = {
            level: 3,
            areCardsDislpayed: false,
            delectedCard: '',
            selectedCardPair: [],
            isGameOver: false,
            totalAttempts: 0,
            selectedCardImage:''
        }
        this.setNextLevel = this.setNextLevel.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.buildMyCard = this.buildMyCard.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }


    setNextLevel() {
        this.setState({
            level: this.state.level + 1,
            selectedCardPair: [],
            totalAttempts: 0,
            modalDecision: false,
            isGameOver: false
        })
        cardContent = [];
    }

    resetGame() {
        this.setState({
            level: 3,
            areCardsDislpayed: false,
            totalAttempts: 0
        })
        cardContent = [];
    }

    gameOver(cardObject) {
        this.setState({
            isGameOver: cardObject.every((card) => card.isMatched === true)
        });
    }


        /*
        ** Following condition will run user clicks on 3rd card.
        */
    buildMyCard() {
        let currentLevel = this.state.level;
        let len = (currentLevel * currentLevel);
        let myObject = [];
        selectImagePath=this.ImageURL[Math.floor(Math.random() * this.ImageURL.length)];


        this.setState({
            areCardsDislpayed: true,
            selectedCardPair: [],
        })
        while (currentLevel > 0) {
            let tempValue = Math.floor(Math.random() * len) + 1;
            let randomIndex1 = Math.floor(Math.random() * len); //Find a random index for array
            let randomIndex2 = Math.floor(Math.random() * len); // Find another random index for array

            if (myObject[randomIndex1] === undefined && myObject[randomIndex2] === undefined
                && randomIndex1 !== randomIndex2) {
                let obj1 = {
                    id: randomIndex1,
                    isOpen: false,
                    value: tempValue,
                    isMatched: false
                }
                let obj2 = {
                    id: randomIndex2,
                    isOpen: false,
                    value: tempValue,
                    isMatched: false
                }
                myObject[randomIndex1] = obj1;
                myObject[randomIndex2] = obj2;
                currentLevel--;
            }
        }


        cardContent = myObject;
        
    }


        /*
        ** Following function will be called when clicks on any card
        */
    flipCard(card) {
               
        let tempCardContent; //Temp object creation.
        this.setState( {
            selectedCardPair: [...this.state.selectedCardPair, card.value],
            totalAttempts: this.state.totalAttempts + 1
        });

        /*
        **Following condition will run user clicks on 3rd card.
        */
        if (this.state.selectedCardPair.length === 2) {
            let isMatchedValue = this.state.selectedCardPair.reduce((accum, data) => accum === data ? true : false);
            tempCardContent = cardContent.map(mycard => {
                if (isMatchedValue && mycard.isOpen && !mycard.isMatched) {
                    mycard.isMatched = isMatchedValue;
                    return mycard
                }
                else if (mycard.isOpen && !mycard.isMatched) {
                    mycard.isOpen = !mycard.isOpen;
                    return mycard
                }
                else if (mycard.id === card.id && !mycard.isMatched) {
                    mycard.isOpen = !mycard.isOpen;
                    return mycard;
                }
                return mycard;
            });
            this.setState({
                selectedCardPair: [card.value],
            });
        }

        /*
        **Following condition will run only when single card is open.
        */
        else {
            tempCardContent = cardContent.map(mycard => {
                if (mycard.id === card.id && !card.isMatched) {
                    mycard.isOpen = !mycard.isOpen;
                    return mycard;
                }
                return mycard;
            });
        }

        /*
        **Filter method used to remove all the null object from Array..
        */
        cardContent = tempCardContent.filter(card => {
            return card != null;
        });
        this.gameOver(cardContent);
    }



    render() {
        var showCards = cardContent.map(card => {
            if (card) {
                return (
                    <Card key={cardContent.indexOf(card)} id="memoryCard" onClick={(e) => this.flipCard(card)}>
                        <CreteACard isOpen={card.isOpen} value={card.value} isMatched={card.isMatched} imagePath={selectImagePath}>
                        </CreteACard>
                    </Card>
                );
            }
            return (
                <div>

                </div>
            );
        }
        );

        return (
            <div className="container">
                <Row top="true" sticky="true" className="container " id="userDetails">
                    <Col>
                        <h4 id="userScore">
                            Number of clicks made: {this.state.totalAttempts}
                        </h4>
                    </Col>

                    <Col>
                        <h4 id="userLevel">
                            Level: {this.state.level - 2}
                        </h4>
                    </Col>
                </Row>
                <Row className="container" id="actionButton">
                    <Col>
                        <Link to='/'>
                            <Button onClick={this.resetGame} color="secondary"> RESTART WITH NEW PLAYER NAME </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Button onClick={this.buildMyCard} color="primary"> LET'S BEGIN THE LEVEL-{this.state.level - 2} GAME > </Button>
                    </Col>

                </Row>

                <Row className="container">
                    {showCards}
                </Row>

                <ModalDisplay nextLevel={this.setNextLevel} level={this.state.level - 2}
                    numClick={this.state.totalAttempts} modalDecision={this.state.isGameOver} 
                    attempts={this.state.totalAttempts} />
            </div>
        );
    }

}


/*
**component which is responsible for creating card component.
*/

function CreteACard(props) {
    //Condition check and display the default gif, when cards were not correct match.
    console.log(" image path "+ props.imagePath);
    if (!props.isOpen && !props.isMatched) {
        return (
            <img src={props.imagePath} alt='unable to display' width='140px' height='140px' />
        )
    }

    //Condition check matched cards and display thumbs-up gif.
    else if (props.isMatched) {
        return (
            <img src='../../assets/matched.gif' alt='Congratulations..!' width='140px' height='140px' />
        )
    }

    return (
        <div className="container">
            <h1 className="flex-center">{props.value}</h1>
        </div>

    )
}

/*
** Following component is responsible for creating congratulation modal when user wins the game.
*/

function ModalDisplay(props) {
    let currentLevel=props.level;
    return (
        <Modal isOpen={props.modalDecision} toggle={props.nextLevel}>
            <ModalHeader> <h1> Congratulations....! </h1></ModalHeader>
            <ModalBody className="container">
                <div className="container" id="congatrulationModalContent">
                    <Row> <h4> Hurraay.....!</h4></Row>
                    <Row> <h4> Congratulation. you did solve the level {props.level}  with {props.attempts} attempts</h4> </Row>
                    <Row><h4>  Would you like to explore next level?</h4></Row>
                </div>
                <Row>
                    <Link to={{
                  pathname: '/thankyou',
                  state: {
                    level: currentLevel
                  }
                }}>
                        <Col>
                            <Button color="secondary">I'M DONE</Button>
                        </Col>
                    </Link>
                    <Col>
                        <Button color="primary" onClick={props.nextLevel}>LET'S TRY NEXT LEVEL</Button>
                    </Col>
                </Row>

            </ModalBody>
        </Modal>
    )
}
export default CardCreator;