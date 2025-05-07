//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState,} from "react";
import './Detailed.css'
import OpenAI from 'openai';
import { StoreQuestions } from './StoreQuestions';

let API = "";
let keyData = localStorage.getItem("MYKEY"); // Default to an empty string if not found
if (keyData !== null) {
    API = JSON.parse(keyData); // Parse the string to get the actual key
}
console.log("Key from local storage: " + API); // Log the key for debugging

const openai = new OpenAI({
    apiKey: API, // Replace with your actual API key
    dangerouslyAllowBrowser:(true), // Enable browser usage (not recommended for production)
  });

  


export function Detailed() {
    const LENGTH = 10; // Number of questions to display

    const [text, setText] = useState(""); // Initialize with an empty string
    const [questions, setQuestions] = useState<string[]>([]); // Store question texts
    const [selectedVariants, setSelectedVariants] = useState<number[]>(Array(LENGTH).fill(-1)); // Track selected button index for each question (-1 means none selected)
    const [submittable, setSubmittable] = useState(false); // Track if the questionnaire is complete
    const [popupVisible, setPopupVisible] = useState(false); // Track if the popup is visible
    const [progressString, setProgressString] = useState("0%"); // Initialize progress string
    const [loading, setLoading] = useState(false); // Track loading state

    const [chatGPTResponse1, setChatGPTResponse1] = useState<string | null>(null); // State to store ChatGPT response
    const [chatGPTResponse2, setChatGPTResponse2] = useState<string | null>(null); // State to store ChatGPT response
    const [chatGPTResponse3, setChatGPTResponse3] = useState<string | null>(null); // State to store ChatGPT response
    const [chatGPTExplain1, setChatGPTExplain1] = useState<string | null>(null); // State to store ChatGPT response
    const [chatGPTExplain2, setChatGPTExplain2] = useState<string | null>(null); // State to store ChatGPT response
    const [chatGPTExplain3, setChatGPTExplain3] = useState<string | null>(null); // State to store ChatGPT response



    async function fetchQuestions() {
        try {
            const response = await fetch(`./Questions.txt`);
            const data = await response.text();
            setText(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []); // Fetch questions only once when the component mounts

    useEffect(() => {
        const questionList = text
            .split("\n")
            .filter((q) => q.trim() !== "")
            .map((q) => q.trim());
        const shuffledQuestions = shuffleArray(questionList); // Shuffle the questions
        setQuestions(shuffledQuestions.slice(0, LENGTH)); // Store the first 30 shuffled questions
    }, [LENGTH, text]); // Update questions only when `text` changes

    function shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function handleButtonClick(questionIndex: number, buttonIndex: number) {
        const newVariants = [...selectedVariants];
        newVariants[questionIndex] = buttonIndex + 1; // Store the selected button value (1-10)
        setSelectedVariants(newVariants);

        //console.log("all answers: "+selectedVariants);
        // Calculate progress immediately
        const progress = newVariants.filter((value) => value !== -1).length;
        const progressPercentage = ((progress / LENGTH) * 100).toFixed(2); // Calculate progress percentage
        setProgressString(`${progressPercentage}%`); // Update progressString state
        setSubmittable(progress === LENGTH); // Update submittable state
        StoreQuestions.addQuestionsAnswered(questions[questionIndex]);
    }

    async function Submitted() {
        setLoading(true); // Set loading state to true
        let prompt = "You are a career counselor. Based on the following answers, provide only 1 possible career paths. No explaining your choices, just give the answers:\n\n";
        for (let i = 0; i < LENGTH; i++) {
            prompt += `Question ${i + 1}: ${questions[i]}\nAnswer: ${selectedVariants[i]}\n\n`;
        }
        console.log(prompt);
        console.log(keyData);
        let response = await openai.responses.create({
            model: "gpt-4.1",
            input: prompt,
        });
        setChatGPTResponse1(response.output_text); // Ensure response.text is a string
        response = await openai.responses.create({
            model: "gpt-4.1",
            input: "give me a 3 sentence explaination for the following career path:\n\n" + chatGPTResponse1 + "\n using the prompt: \n" + prompt,
        });
        setChatGPTExplain1(response.output_text); // Ensure response.text is a string
        response = await openai.responses.create({
            model: "gpt-4.1",
            input: "give me a possible career path based on the following answers:\n\n" + prompt + "\n\n your answer must be different than " + chatGPTResponse1 + "\n\n",
        });
        setChatGPTResponse2(response.output_text); // Ensure response.text is a string
        response = await openai.responses.create({
            model: "gpt-4.1",
            input: "give me a 3 sentence explaination for the following career path:\n\n" + chatGPTResponse2 + "\n using the prompt: \n" + prompt,
        });
        setChatGPTExplain2(response.output_text); // Ensure response.text is a string
        response = await openai.responses.create({
            model: "gpt-4.1",
            input: "give me a possible career path based on the following answers:\n\n" + prompt + "\n\n your answer must be different than " + chatGPTResponse1 + " and " + chatGPTResponse2 + "\n\n",
        });
        setChatGPTResponse3(response.output_text); // Ensure response.text is a string
        response = await openai.responses.create({
            model: "gpt-4.1",
            input: "give me a 3 sentence explaination for the following career path:\n\n" + chatGPTResponse3 + "\n using the prompt: \n" + prompt,
        });
        setChatGPTExplain3(response.output_text); // Ensure response.text is a string
        
        setLoading(false); // Set loading state to false
        setPopupVisible(true); // Show the popup
    }

    

    return (
        <div className="Detailed">
            <div className="Detailed-top">
                <div>
                    <Link to="/">
                        <Button className="Home-button">Back To Home</Button>
                    </Link>
                    <Button className="Submit-button" onClick={Submitted} disabled={!submittable}>
                        Submit Questionnaire
                    </Button>
                </div>
    
                <div className="Detailed-Header">
                    <h1 className="Header">Welcome to the Detailed Questionnaire</h1>
                    <p>
                        Please answer the following questions on a scale from 1-10 with 1 being the
                        lowest and 10 being the highest. Press Submit when you are complete to see
                        your results.
                    </p>
                </div>
                <div className="progress-border">
                    <div
                        className="progress-bar"
                        style={{ width: progressString }} // Dynamically set the width
                    ></div>
                </div>
            </div>
    
            <div className="Questionnaire">
                <div className="Detailed-questionnaire">
                    <Col className="Questions">
                        {questions.map((question, i) => (
                            <Row className="Question" key={i}>
                                <h2 className="Question">Question {i + 1}</h2>
                                <h5 className="Question">{question}</h5>
                                <Row>
                                    <ButtonGroup className="Button-Group" id={(i + 1).toString()}>
                                        {[...Array(10)].map((_, idx) => (
                                            <Button
                                                key={idx}
                                                variant={
                                                    selectedVariants[i] === idx + 1
                                                        ? "primary"
                                                        : "outline-primary"
                                                } // Highlight selected button
                                                className="Answer"
                                                id={idx.toString()}
                                                onClick={() => handleButtonClick(i, idx)} // Pass question index and button index
                                            >
                                                {idx + 1}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Row>
                            </Row>
                        ))}
                    </Col>
                </div>
            </div>
            {(popupVisible || loading)  && (
                <div className="popup-container">
                    {loading && <div className="loading">Loading...</div>}
                        {popupVisible && (
                            <div className="popup">
                                <h2>Your Results:</h2>
                                <Row>
                                    <Col className='Answer 1'>
                                        <p>{chatGPTResponse1}</p>
                                        <p>Explaination:</p>
                                        <p>{chatGPTExplain1}</p>
                                    </Col>
                                    <Col className='Answer 2'>
                                        <p><p>{chatGPTResponse2}</p>
                                        <p>Explaination:</p>
                                        <p>{chatGPTExplain2}</p></p>
                                    </Col>
                                    <Col className='Answer 3'>
                                        <p><p>{chatGPTResponse3}</p>
                                        <p>Explaination:</p>
                                        <p>{chatGPTExplain3}</p></p>
                                    </Col>
                                </Row>
                            </div>
                        )}
                </div>)}
        </div>
    );
}
