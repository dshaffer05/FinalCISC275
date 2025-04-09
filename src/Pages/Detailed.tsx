//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Detailed.css'
import './Questions.txt'

export function Detailed(){

    let questionList: string[] = [];
    fetch('./Questions.txt')
        .then(response => response.text())
        .then(data => {
            questionList = data.split('\n'); // Split the file content into an array
        })
        
    let questionNumbers: number[] = [] //array of question numbers to be generated


    function pickQuestion(): string{
        let question = Math.floor(Math.random() * 30) + 1 //random number between 1-10
        if (questionNumbers.includes(question)){ //if the question is already in the array, pick a new one
            return pickQuestion()
        }
        questionNumbers.push(question) //add the question number to the array
        return questionList[question-1] //return the question at the index of the random number
    }



    let questions: JSX.Element[] = [] //array of questions to be generated
    let length = 10 //length of the questionnaire
    function generateQuestions(){
        for (let i = 0; i < length; i++){
            questions.push(<Row className='Question' key={i}>
                <h2 className='Question'>Question {i+1}</h2>
                <h5 className='Question'>{pickQuestion()}</h5>
                <Row>
                    <ButtonGroup className='Button-Group'>
                        <Button className='Answer'>1</Button>
                        <Button className='Answer'>2</Button>
                        <Button className='Answer'>3</Button>
                        <Button className='Answer'>4</Button>
                        <Button className='Answer'>5</Button>
                        <Button className='Answer'>6</Button>
                        <Button className='Answer'>7</Button>
                        <Button className='Answer'>8</Button>
                        <Button className='Answer'>9</Button>
                        <Button className='Answer'>10</Button>
                    </ButtonGroup>
                </Row>
            </Row>)
        }
    }



    function Submitted(){
        alert("You have submitted the questionnaire. Thank you!");
    }

    generateQuestions() //call the function to generate the questions

    return <div className='Detailed'>
        <div className='Detailed-top'>
        <div>
            <Link to='/'><Button className='Home-button'>Back To Home</Button></Link>
            <Button className='Submit-button' onClick={Submitted}>Submit Questionnaire</Button>
        </div>
        
        <div className='Detailed-Header'>
            <h1 className='Header'>Welcome to the Detailed Questionnaire</h1>
            <p> Please answer the following questions on a scale from 1-10 with 1 being the lowest and 10 being the highest. Press Submit when you are complete to see your results.</p>
        </div>
        </div>

        <div className='Questionnaire'>
        <div className='Detailed-questionnaire'>
            <Col className='Questions'>
                {questions}
            </Col>
        </div>
        </div>
    </div>
}