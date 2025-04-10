import { Button} from 'react-bootstrap';
import './Rater.css'
import './ProgBar.css'
import { Link } from 'react-router-dom';
import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
import { ProgBar } from './ProgBar';
import { RaterQuestion } from './RaterQuestion';

//let options: string[] = ["Very Good", "Good","Okay","Bad","Very Bad"];
interface ratedQuestion{
    name: string
    score: number
    keep: boolean
    answered: boolean
}
//let questions: string[] = ["Question 1","Question 2","Question 3","Question 4","Question 5","Question 6","Question 7"];
let ratedQuestions: ratedQuestion[] = [{name:"Question 1",score:6,keep:true,answered:false},{name:"Question 2",score:6,keep:true,answered:false},{name:"Question 3",score:6,keep:true,answered:false},{name:"Question 4",score:6,keep:true,answered:false},{name:"Question 5",score:6,keep:true,answered:false},{name:"Question 6",score:6,keep:true,answered:false},{name:"Question 7",score:6,keep:true,answered:false}];
let progress: boolean[] = ratedQuestions.map((question: ratedQuestion) => question.answered);
export function Rater(){
    //const reducer = (accumulator: number, question: boolean) => (question === true) ? accumulator++: accumulator;
    const [progressAmount, setProgressAmount] = useState<boolean[]>({...progress});
    const [amountAnswered, setAmountAnswered] = useState<number>(0);
    function changeProgress(){
        let vari: boolean[] = ({...progressAmount});
        let sum = vari.reduce((accumulator, question) => (question === true) ? ++accumulator: accumulator+=0, 0);
        console.log("Sum: "+sum);
        setAmountAnswered(+(sum / vari.length * 100));
    }

    return <div className='Rater'><div className='Header'><h1>Welcome to the Question Rater!!</h1><div><Link to='/'><Button>Back To Home</Button></Link></div>
    <div className="progressbar">
            <div style={{
                height:"100%",
                width: `${amountAnswered}%`,
                backgroundColor: "blue",
                transition: "width 0.5s"
            }}></div>
            <span className="progress">{amountAnswered}%</span>
        </div>
    </div>
    <div onChange={changeProgress}>{ratedQuestions.map((rateQuestion: ratedQuestion) => <RaterQuestion question={rateQuestion.name} isKept={rateQuestion.keep} score={rateQuestion.score} answered={rateQuestion.answered} ></RaterQuestion>)}</div>
    <Link to='/'><Button>Finish Survey</Button></Link>
    </div>
}