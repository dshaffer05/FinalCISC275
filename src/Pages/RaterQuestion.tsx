import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './RaterQuestion.css'
export function RaterQuestion({index, question,isKept,score,answered}: {index: number, question: string, isKept: boolean, score:number, answered:boolean;}){
    const [raterQuestion, setRaterQuestion] = useState<string>(question);
    //function RaterQuestion({question,}: {question: string;},{isKept,}: {isKept: boolean;},{score,}: {score:number;})
    const [rateScore, setRateScore] = useState<number>(score);
    const [keep, setKeep] = useState<boolean>(isKept);
    const [reason, setReason] = useState<string>("");
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    function changeScore(event: React.ChangeEvent<HTMLInputElement>) {
        setIsAnswered(true);
        console.log(isAnswered);
        setRaterQuestion(raterQuestion);
        setIsAnswered(true);
        answered = isAnswered;
        if(event.target.value === "Very Good"){
            setRateScore(5);
            score = rateScore;
            setKeep(true);
            isKept = keep;
        }
        else if(event.target.value === "Good"){
            setRateScore(4);
            score = rateScore;
            setKeep(true);
            isKept = keep;
        }
        else if(event.target.value === "Ok"){
            setRateScore(3);
            score = rateScore;
            setKeep(true);
            isKept = keep;
        }
        else if(event.target.value === "Bad"){
            setRateScore(2);
            score = rateScore;
            setKeep(false);
            isKept = keep;
        }
        else if(event.target.value === "Very Bad"){
            setRateScore(1);
            score = rateScore;
            setKeep(false);
            isKept = keep;
        }

    }
    function changeReason(event: React.ChangeEvent<HTMLInputElement>){
        setReason(event.target.value);
    }
    return <div className='RaterQuestion'><div className="Description">{raterQuestion}, Score: {rateScore}</div>
    <Form.Check
        inline
        type="radio"
        name="option_1"
        onChange={changeScore}
        label="Very Bad"
        value="Very Bad"
    />
    <Form.Check
    inline
    type="radio"
    name="option_2"
    onChange={changeScore}
    label="Bad"
    value="Bad"
    />
    <Form.Check
    inline
    type="radio"
    name="option_3"
    onChange={changeScore}
    label="Ok"
    value="Ok"
    />
    <Form.Check
    inline
    type="radio"
    name="option_4"
    onChange={changeScore}
    label="Good"
    value="Good"
    />
    <Form.Check
    inline
    type="radio"
    name="option_5"
    onChange={changeScore}
    label="Very Good"
    value="Very Good"
    />
    <Form.Group controlId="feekbackArea"><Form.Control
    as="textarea"
    rows={3}
    onChange={changeReason}
    placeholder="Insert any feedback you have about the question (optional)" className="TextBar"
    />
    </Form.Group>
    <div>Reason is: {reason}</div>
    </div>
}