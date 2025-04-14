//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from "react";
import './Detailed.css'

export function Detailed(){

    let questionList: string[] = [];

    const [text, setText] = useState(""); // init with an empty string

    async function fetchQuestions() {
        try {
            const response = await fetch(`./Questions.txt`);
            const data = await response.text();
            setText(data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchQuestions();
    questionList = text.split('\n'); // Split the file content into an array
    
    questionList = questionList.filter((question) => question.trim() !== ""); // Filter out empty lines
    questionList = questionList.map((question) => question.trim()); // Trim whitespace from each question


    let usedQuestions: string[] = [] //array of used questions to be generated
    function pickQuestion(): string{
        let question = Math.floor(Math.random() * questionList.length) 
        let questionText = questionList[question] //get the question at the random number
        questionList.splice(question, 1) //remove the question from the list so it won't be repeated
        usedQuestions.push(questionText) //add the question to the used questions list
        return questionText //return the question at the index of the random number
    }

    

    let questions: JSX.Element[] = [] //array of questions to be generated
    let length = 30 //length of the questionnaire
    function generateQuestions(){
        for (let i = 0; i < length; i++){
            questions.push(<Row className='Question' key={i}>
                <h2 className='Question'>Question {i+1}</h2>
                <h5 className='Question'>{pickQuestion()}</h5>
                <Row>
                    <ButtonGroup className='Button-Group'>
                        <Button variant='outline-primary' className='Answer'>1</Button>
                        <Button variant='outline-primary' className='Answer'>2</Button>
                        <Button variant='outline-primary' className='Answer'>3</Button>
                        <Button variant='outline-primary' className='Answer'>4</Button>
                        <Button variant='outline-primary' className='Answer'>5</Button>
                        <Button variant='outline-primary' className='Answer'>6</Button>
                        <Button variant='outline-primary' className='Answer'>7</Button>
                        <Button variant='outline-primary' className='Answer'>8</Button>
                        <Button variant='outline-primary' className='Answer'>9</Button>
                        <Button variant='outline-primary' className='Answer'>10</Button>
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