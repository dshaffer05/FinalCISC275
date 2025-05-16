//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState,} from "react";
import './Detailed.css'
import OpenAI from 'openai';
import { StoreQuestions } from './StoreQuestions'

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
    const LENGTH = 30; // Number of questions to display

    const [text, setText] = useState(""); // Initialize with an empty string
    const [questions, setQuestions] = useState<string[]>(shuffleArray([...StoreQuestions.getDetailed()]).slice(0,LENGTH)); // Store question texts
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
        //StoreQuestions.setDetailed(text.split("\n").filter((q) => q.trim() !== "").map((q) => q.trim()));
        console.log("here?");
        setText(StoreQuestions.getDetailed().join("\n"));
        console.log("detailed: "+StoreQuestions.getDetailed().length);
    }, []); // Fetch questions only once when the component mounts

    useEffect(() => {
        /*const questionList = text
            .split("\n")
            .filter((q) => q.trim() !== "")
            .map((q) => q.trim());*/
            //const questionList = StoreQuestions.getDetailed();
        /*const shuffledQuestions = shuffleArray(questionList); // Shuffle the questions
        setQuestions(shuffledQuestions.slice(0, LENGTH)); // Store the first 30 shuffled questions
        StoreQuestions.setDetailed(shuffledQuestions);*/
        //const shuffledQuestions = shuffleArray(questions);
        //setQuestions(shuffledQuestions.slice(0, LENGTH));
        //setQuestions(shuffleArray(StoreQuestions.getDetailed().slice(0,LENGTH)))
        console.log("length: "+StoreQuestions.getDetailed().length);
        /*for(let i = 0; i < StoreQuestions.getDetailed().length; i++){
            console.log(i+": "+StoreQuestions.getDetailed()[i]);
        }*/
    }, [LENGTH, text]); // Update questions only when `text` changes

    function shuffleArray(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function handleButtonClick(questionIndex: number, buttonIndex: number) {
        setQuestions([...questions]);
        const newVariants = [...selectedVariants];
        newVariants[questionIndex] = buttonIndex + 1; // Store the selected button value (1-10)
        setSelectedVariants(newVariants);

        //console.log("all answers: "+selectedVariants);
        // Calculate progress immediately
        const progress = newVariants.filter((value) => value !== -1).length;
        const progressPercentage = ((progress / LENGTH) * 100).toFixed(2); // Calculate progress percentage
        setProgressString(`${progressPercentage}%`); // Update progressString state
        setSubmittable(progress === LENGTH); // Update submittable state
        if(!StoreQuestions.getQuestionsAnswered().includes(questions[questionIndex])){
            StoreQuestions.addQuestionsAnswered(questions[questionIndex]);
        }
    }

    async function Submitted() {
        setLoading(true); // Set loading state to true
        let prompt = "You are a career counselor. Based on the following answers to a career quiz, \n\n";
        for (let i = 0; i < LENGTH; i++) {
            prompt += `Question ${i + 1}: ${questions[i]}\nAnswer: ${selectedVariants[i]}\n\n`;
        }
        console.log(prompt);
        console.log(keyData);
        /*let response = await openai.responses.create({
            model: "gpt-4.1",
            input: prompt,
        });*/
        try {
            // First response
            let response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "provide only 1 possible career paths. No explaining your choice, just give the answer",
            });
            const response1 = response.output_text; // Store the first response
            setChatGPTResponse1(response1);
    
            // Second response
            response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "give me a 2 sentence explanation for why the following career path aligns with my answers: " + response1,
            });
            const explanation1 = response.output_text; // Store the first explanation
            setChatGPTExplain1(explanation1);
    
            // Third response
            response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "provide only 1 possible career paths. No explaining your choice, just give the answer. Your answer must be different than " + response1,
            });
            const response2 = response.output_text; // Store the second response
            setChatGPTResponse2(response2);
    
            // Fourth response
            response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "give me a 2 sentence explanation for why the following career path aligns with my answers: " + response2,
            });
            const explanation2 = response.output_text; // Store the second explanation
            setChatGPTExplain2(explanation2);
    
            // Fifth response
            response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "provide only 1 possible career paths. No explaining your choice, just give the answer. Your answer must be different than " + response1 + " and " + response2,
            });
            const response3 = response.output_text; // Store the third response
            setChatGPTResponse3(response3);
    
            // Sixth response
            response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt + "give me a 2 sentence explanation for why the following career path aligns with my answers: " + response3,
            });
            const explanation3 = response.output_text; // Store the third explanation
            setChatGPTExplain3(explanation3);
    
        } catch (error) {
            console.error("Error with OpenAI API:", error);
        }
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
