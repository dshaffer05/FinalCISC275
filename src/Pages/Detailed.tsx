//import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState,} from "react";
import './Detailed.css'

export function Detailed() {
    const LENGTH = 1; // Number of questions to display


    const [text, setText] = useState(""); // Initialize with an empty string
    const [questions, setQuestions] = useState<string[]>([]); // Store question texts
    const [selectedVariants, setSelectedVariants] = useState<number[]>(Array(LENGTH).fill(-1)); // Track selected button index for each question (-1 means none selected)
    const [submittable, setSubmittable] = useState(false); // Track if the questionnaire is complete
    const [popupVisible, setPopupVisible] = useState(false); // Track if the popup is visible
    const [progressString, setProgressString] = useState("0%"); // Initialize progress string

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
    
        // Calculate progress immediately
        const progress = newVariants.filter((value) => value !== -1).length;
        const progressPercentage = ((progress / LENGTH) * 100).toFixed(2); // Calculate progress percentage
        setProgressString(`${progressPercentage}%`); // Update progressString state
        setSubmittable(progress === LENGTH); // Update submittable state
    }

    function Submitted() {
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
            {popupVisible && (
                <div className="popup-container">
                        {popupVisible && (
                            <div className="popup">
                                <h2>Pop-up Content</h2>
                                <p>This is the content of the pop-up window.</p>
                            </div>
                        )}
                </div>)}
        </div>
    );
}