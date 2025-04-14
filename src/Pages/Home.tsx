//import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'

export function Home(){
    return <div className='Home'><header className="Home-header">
    <h1>
      The Career Helpi
    </h1>
  </header>
  <div className='Questionnaire-Selection'>
    <Row>
      <Col className='Simple-Questionnaire'>
        <h1 className='Simple-Header'>
          Simple Questionnaire
        </h1>
        <div className='Simple-Text'>
          This is a simple questionnaire that will ask you a few questions and give you a response based on your answers.
        </div>
        <Link to='/Simple'><Button className='Simple-Button'>Start Simple Questionnaire</Button></Link>
      </Col>
      <Col className='Detailed-Questionnaire'>
        <h1 className='Detailed-Header'>
          Detailed Questionnaire
        </h1>
        <div className='Detailed-Text'>
          This is a detailed questionnaire that will ask you a few questions and give you a response based on your answers.
        </div>
        <Link to='/Detailed'><Button className='Detailed-Button'>Start Detailed Questionnaire</Button></Link>
      </Col>
    </Row>
    <Col className='Question-Rater'>
      <h1 className='Rater-Header'>
        Question Rater
      </h1>
      <div className='Rater-Text'>
        This is a question rater that will allow you to rate our questions and improve our quiz.
      </div>
      <Link to='/Rater'><Button className='Rater-Button'>Start Question Rater</Button></Link>
    </Col>
  </div>
    <div>Andrew Shaffer</div>
  <div>Jacob Hudson</div>
  <div>
          <a href="../liam-greenhalgh.html">
          <p>Liam Greenhalgh</p>
          </a>
        </div>
  </div>
}