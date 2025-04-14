import { Button, Form} from 'react-bootstrap';
import './Rater.css'
import './RaterQuestion.css'
import './ProgBar.css'
import { Link } from 'react-router-dom';
import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
//import { ProgBar } from './ProgBar';
//import { RaterQuestion } from './RaterQuestion';

//let options: string[] = ["Very Good", "Good","Okay","Bad","Very Bad"];
interface ratedQuestion{
    index: number
    name: string
    score: number
    keep: boolean
    answered: boolean
    reason: string
}
//let questions: string[] = ["Question 1","Question 2","Question 3","Question 4","Question 5","Question 6","Question 7"];
let ratedQuestions: ratedQuestion[] = [{index: 1, name:"Question 1",score:6,keep:true,answered:false, reason:""},{index: 2,name:"Question 2",score:6,keep:true,answered:false, reason:""},{index: 3,name:"Question 3",score:6,keep:true,answered:false, reason:""},{index: 4,name:"Question 4",score:6,keep:true,answered:false, reason:""},{index: 5,name:"Question 5",score:6,keep:true,answered:false, reason:""},{index: 6,name:"Question 6",score:6,keep:true,answered:false, reason:""},{index: 7,name:"Question 7",score:6,keep:true,answered:false, reason:""}];
let progress: boolean[] = ratedQuestions.map((question: ratedQuestion) => question.answered);
let options: string[] = ["Very Bad","Bad","Ok","Good","Very Good"];
export function Rater(){
    //const reducer = (accumulator: number, question: boolean) => (question === true) ? accumulator++: accumulator;
    const [progressAmount, setProgressAmount] = useState<boolean[]>([...progress]);
    const [amountAnswered, setAmountAnswered] = useState<number>(0);
    const [questions, setQuestions] = useState<ratedQuestion[]>([...ratedQuestions]);
    const handleRadio = (index: number, event: React.MouseEvent<HTMLInputElement>) => {
        let tempQuestions = [...questions];
        if(event.currentTarget.value === "Very Good"){
            console.log("so good");
            tempQuestions[index].score = 5;
            tempQuestions[index].keep = true;
        }
        else if(event.currentTarget.value === "Good"){
            tempQuestions[index].score = 4;
            tempQuestions[index].keep = true;
        }
        else if(event.currentTarget.value === "Ok"){
            tempQuestions[index].score = 3;
            tempQuestions[index].keep = true;
        }
        else if(event.currentTarget.value === "Bad"){
            tempQuestions[index].score = 2;
            tempQuestions[index].keep = false;
        }
        else if(event.currentTarget.value === "Very Bad"){
            tempQuestions[index].score = 1;
            tempQuestions[index].keep = false;
        }

        let allProgress = [...progressAmount];
        allProgress[index] = true;
        let sum: number = allProgress.reduce((accumulator: number, question: boolean) => (question === true) ? ++accumulator: accumulator, 0);

        setQuestions(tempQuestions);
        setProgressAmount(allProgress);
        setAmountAnswered(Math.floor(+(sum / allProgress.length * 100)));
    };
    const changeReason = (index: number, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        let tempQuestions = [...questions];
        tempQuestions[index].reason = event.target.value;
        setQuestions(tempQuestions);
        //setReason(event.target.value);
    };

    return <div className='Rater'><div className='Header'><h1>Welcome to the Question Rater!!</h1><div><Link to='/'><Button>Back To Home</Button></Link></div>
    <div className="progressbar">
            <div style={{
                height:"100%",
                width: `${amountAnswered}%`,
                backgroundColor: "blue",
                transition: "width 0.5s"
            }}>{amountAnswered}%</div>
            {/* <span className="progress">{amountAnswered}%</span> */}
        </div>
    </div>
    <div>{questions.map((rateQuestion:ratedQuestion, indexes: number)=> (
        <div className='RaterQuestion'><div className="Description">{rateQuestion.name}, Score: {rateQuestion.score}</div>
        {options.map((option:string, index:number)=> (<Form.Check
         inline
         onClick={(event) => handleRadio(indexes, event)}
         key={indexes}
         id={option}
         type="radio"
         name={`option_${indexes}`}
         label={option}
         value={option}
        />))}
        <Form.Group controlId="feekbackArea"><Form.Control
    as="textarea"
    rows={3}
    onChange={(event) => changeReason(indexes, event)}
    placeholder="Insert any feedback you have about the question (optional)" className="TextBar"
    />
    </Form.Group>
    <div>Reason is: {rateQuestion.reason}</div>
        </div>
    ))}</div>
    <Link to='/'><Button>Finish Survey</Button></Link>
    </div>
}
/*<div onChange={() => {changeProgress();}}>{ratedQuestions.map((rateQuestion: ratedQuestion) => <RaterQuestion 
    key={rateQuestion.index}
    index={rateQuestion.index}
    question={rateQuestion.name} 
    isKept={rateQuestion.keep} 
    score={rateQuestion.score} 
    answered={rateQuestion.answered}

    ></RaterQuestion>)}</div>*/