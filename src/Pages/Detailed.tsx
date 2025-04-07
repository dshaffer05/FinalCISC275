//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Detailed.css'

export function Detailed(){

    function Submitted(){
        alert("You have submitted the questionnaire. Thank you!");
    }

    return <div className='Detailed'>
        <div className='Detailed-top'>
        <div>
            <Link to='/'><Button className='Home-button'>Back To Home</Button></Link>
            <Button className='Submit-button' onClick={Submitted}>Submit Questionnaire</Button>
        </div>
        
        <div className='Detailed-Header'>
            <h1 className='Header'>Welcome to the Detailed Questionnaire</h1>
            <p> Please answer the following questions and press Submit when you are complete to see your results.</p>
        </div>
        </div>

        <div className='Questionnaire'>
        <div className='Detailed-questionnaire'>
            <Col className='Questions'>
                <Row className='Question-1'>
                    <h2 className='Question'>1. How Gay Are You?</h2>
                    <Row>
                    <ButtonGroup className="Answers">
                        <Button variant='secondary'>One</Button>
                        <Button variant='secondary'>Two</Button>
                        <Button variant='secondary'>Three</Button>
                    </ButtonGroup>
                    </Row>
                </Row>
            </Col>
        </div>
        </div>
    </div>
}