import React, { useState } from 'react';
import './App.css';
import { Button, Col, Form, Row } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      <header className="Home-header">
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
            <Button className='Simple-Button'>
              Start Simple Questionnaire
            </Button>
          </Col>
          <Col className='Detailed-Questionnaire'>
            <h1 className='Detailed-Header'>
              Detailed Questionnaire
            </h1>
            <div className='Detailed-Text'>
              This is a detailed questionnaire that will ask you a few questions and give you a response based on your answers.
            </div>
            <Button className='Detailed-Button'>
              Start Detailed Questionnaire
            </Button>
          </Col>
        </Row>
        <Col className='Question-Rater'>
          <h1 className='Rater-Header'>
            Question Rater
          </h1>
          <div className='Rater-Text'>
            This is a question rater that will allow you to rate our questions and improve our quiz.
          </div>
          <Button className='Rater-Button'>
            Start Question Rater
          </Button>
        </Col>
      </div>
      <Form className='API-Key-Form'>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        <div>Andrew Shaffer</div>
      </Form>
      <div>Jacob Hudson</div>
      <b>
        <Button>New Button</Button></b>
    </div>
  );
}

export default App;
