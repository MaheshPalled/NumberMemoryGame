import React, {Component} from "react";
import { Button, Row, Col, Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";


let cardContent= [];

class CardCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 3,
            areCardsDislpayed:false,
            delectedCard: '',
            selectedCardPair: [],
            isGameOver:false,
            totalAttempts:0
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
            selectedCardPair:[],
            totalAttempts:0,
            modalDecision:false,
            isGameOver:false
        })
        cardContent= [];
    }

    resetGame() {
        this.setState({
            level: 3,
            areCardsDislpayed:false,
            totalAttempts:0
        })
        cardContent=[];
    }

    gameOver(cardObject){
            this.setState({
                isGameOver:cardObject.every((card)=>card.isMatched===true)
         });
    }

    buildMyCard(){
        let currentLevel = this.state.level;
        let len = (currentLevel * currentLevel);
        let myObject = [];
        console.log("Calling build my card function");
        while (currentLevel > 0){
            let tempValue = Math.floor(Math.random() * len) + 1;
            let randomIndex1 = Math.floor(Math.random() * len); //Find a random index for array
            let randomIndex2 = Math.floor(Math.random() * len); // Find another random index for array

            if (myObject[randomIndex1] === undefined && myObject[randomIndex2] === undefined
                && randomIndex1 !== randomIndex2) {
                let obj1 = {
                    id: randomIndex1,
                    isOpen: false,
                    value: tempValue,
                    isMatched:false
                   }
                let obj2 = {
                    id: randomIndex2,
                    isOpen: false,
                    value: tempValue,
                    isMatched:false
                    }
                myObject[randomIndex1]=obj1;
                myObject[randomIndex2]= obj2;
                currentLevel--;
            }
        }
         cardContent = myObject;
        this.setState({
            areCardsDislpayed:true,
            selectedCardPair:[]
        })
    }

    flipCard(card) {
        let tempCardContent;
        this.setState(previousState => ({
            selectedCardPair: [...previousState.selectedCardPair, card.value],
            totalAttempts:this.state.totalAttempts +1
        }));
        console.log("value  "+this.state.selectedCardPair);
        if (this.state.selectedCardPair.length ===2 ){
            let isMatchedValue = this.state.selectedCardPair.reduce((accum,data) => accum===data?true:false);
            console.log("matching "+isMatchedValue);
                tempCardContent=cardContent.map(mycard=>{
                    if (isMatchedValue && mycard.isOpen && !mycard.isMatched){
                        console.log("inside if condition for card id : "+mycard.id);
                            mycard.isMatched= isMatchedValue;
                            return mycard
                    }
                    else if (mycard.isOpen && !mycard.isMatched){
                        console.log("inside 1st else if condition for card id : "+mycard.id);
                        mycard.isOpen=!mycard.isOpen;
                        return mycard
                    }
                    else if(mycard.id===card.id && !mycard.isMatched){
                        console.log("inside 2nd else if condition for card id : "+mycard.id);
                        mycard.isOpen=!mycard.isOpen;
                        return mycard;
                    }
                    return mycard;
                });
                this.setState({
                    selectedCardPair: [card.value],
                });
            }   

            else {               
                tempCardContent=cardContent.map(mycard=>{
                    if (mycard.id===card.id && !card.isMatched){
                         mycard.isOpen=!mycard.isOpen;
                         return mycard;
                    }
                    return mycard;
                });
            }

       cardContent=tempCardContent.filter(card=>{
           return card!=null;
       });

       this.gameOver(cardContent);

       console.log(" card content : " + JSON.stringify(cardContent));
    }



    render() {
        var showCards = cardContent.map(card => {
            if (card) {
                return (
                    <Card key={cardContent.indexOf(card)} id="memoryCard" onClick={(e) => this.flipCard(card)}>
                        <CreteACard isOpen={card.isOpen} value={card.value} isMatched={card.isMatched}>
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
                        Level: {this.state.level -2}
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
                        <Button onClick={this.buildMyCard} color="primary"> LET'S BEGIN THE LEVEL-{this.state.level-2} GAME > </Button>
                    </Col>
                   
                </Row>
                
                <Row className="container">
                    {showCards}
                </Row>

                <ModalDisplay nextLevel={this.setNextLevel} level={this.state.level-2} 
                numClick={this.state.totalAttempts} modalDecision={this.state.isGameOver}/>
            </div>
        );
    }

}


function CreteACard(props){

    if (!props.isOpen && !props.isMatched){
        return(
            <img src='../../assets/angryBird.gif' alt='Angry bird' width='140px' height='140px'/>
        )
    }

    else if (props.isMatched){
        return(
            <img src='../../assets/matched.gif' alt='Angry bird' width='140px' height='140px'/>
        )
    }
    
    return(
        <div className="container">
            <h1 className="flex-center">{props.value}</h1>
        </div>
        
    )
}



function ModalDisplay(props){
    return(
        <Modal isOpen={props.modalDecision} toggle={props.nextLevel}>
            <ModalHeader> <h1> Congratulations....! </h1></ModalHeader>
            <ModalBody className="container">
                <Row> <h4> Hurraay.....!</h4></Row>
                <Row> <h4>Congratulation. you did solve the level  with  attempts</h4> </Row>
                <Row><h4> Let's lern somemore lo</h4></Row>
                <Row>
                    <Link to="/thankyou">
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