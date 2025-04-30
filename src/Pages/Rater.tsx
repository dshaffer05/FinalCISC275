"use server";
import { Button, Form} from 'react-bootstrap';
import './Rater.css'
import './RaterQuestion.css'
import './ProgBar.css'
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import OpenAI from "openai";
import "./StoreQuestions";
import { StoreQuestions } from './StoreQuestions';
interface ratedQuestion{
    index: number
    name: string
    score: number
    keep: boolean
    answered: boolean
    reason: string
}
//let questions: string[] = ["Question 1","Question 2","Question 3","Question 4","Question 5","Question 6","Question 7"];
let API = "";
let keyData = localStorage.getItem("MYKEY");
if(keyData !== null){
    API = JSON.parse(keyData);
}
console.log("API key is: "+API);
export function Rater(){
    console.log("help");
    const client = new OpenAI(
        {apiKey:API, dangerouslyAllowBrowser:true}
    );
    let detailedQuestions: string[] = [...StoreQuestions.getQuestionsAnswered()];
let ratedQuestions: ratedQuestion[] = detailedQuestions.map((question:string, indexes: number)=> ({index: indexes, name: question, score: 6, keep: true, answered: false, reason: ""}))
console.log("length! "+ratedQuestions.length);
//let ratedQuestions: ratedQuestion[] = [{index: 1, name:"Question 1",score:6,keep:true,answered:false, reason:""},{index: 2,name:"Question 2",score:6,keep:true,answered:false, reason:""},{index: 3,name:"Question 3",score:6,keep:true,answered:false, reason:""},{index: 4,name:"Question 4",score:6,keep:true,answered:false, reason:""},{index: 5,name:"Question 5",score:6,keep:true,answered:false, reason:""},{index: 6,name:"Question 6",score:6,keep:true,answered:false, reason:""},{index: 7,name:"Question 7",score:6,keep:true,answered:false, reason:""}];
let progress: boolean[] = ratedQuestions.map((question: ratedQuestion) => question.answered);
let options: string[] = ["Very Bad","Bad","Ok","Good","Very Good"];
    //const reducer = (accumulator: number, question: boolean) => (question === true) ? accumulator++: accumulator;
    const [progressAmount, setProgressAmount] = useState<boolean[]>([...progress]);
    const [amountAnswered, setAmountAnswered] = useState<number>(0);
    const [questions, setQuestions] = useState<ratedQuestion[]>([...ratedQuestions]);
    const handleRadio = (index: number, event: React.MouseEvent<HTMLInputElement>) => {
        let tempQuestions = [...questions];
        if(event.currentTarget.value === "Very Good"){
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
    async function changeQuestions(){
        console.log("successfully entered function");
        console.log("API key is: "+API);
        let tempQuestions = [...questions];
        for(let i = 0; i < tempQuestions.length; i++){
            if(tempQuestions[i].score === 1 || tempQuestions[i].score === 2){
                const completion2 = await client.chat.completions.create({
                    model: "gpt-4.1",
                    messages: [
                        {
                            role: "user",
                            content: "This is the current question: "+tempQuestions[i].name+". The following reason is given as potential improvement for the current question: "+tempQuestions[i].reason+", if the reason is related to improving the current question and does not say anything offensive or innapropriate, create a new question based on the criteria. If not, make the output \""+tempQuestions[i].name+"\". Make the output "+tempQuestions[i].name+" if the reason has anything to do with slurs, anything policial, innopropriate words or reproductive elements. If there is no reason, make your own question. If you produce a new question, make your output just the new question."/*"If the advice given later in the prompt has nothing to do with improving the current question, then ignore it and keep the same question. if not, create new questions based on the following criteria: "+tempQuestions[i].reason+", make your output just the new question",*/
                        },
                    ],
                });
                if(completion2.choices[0].message.content !== null)
                {tempQuestions[i].name = completion2.choices[0].message.content;}
                console.log("question "+tempQuestions[i].index+" is a bad question");
                console.log("new output: "+completion2.choices[0].message.content);
            }
            else {
                if(tempQuestions[i].reason){
                    console.log("question "+tempQuestions[i].index+"has a reason");
                    const completion3 = await client.chat.completions.create({
                        model: "gpt-4.1",
                        messages: [
                            {
                                role: "user",
                                content: "This is the current question: "+tempQuestions[i].name+". The following reason is given as potential improvement for the current question: "+tempQuestions[i].reason+", if the reason is related to improving the current question, improve the current question based on the criteria. If not, make the output \""+tempQuestions[i].name+"\". Make the output "+tempQuestions[i].name+" if the reason has anything to do with slurs, anything policial, innopropriate words or reproductive elements. If there is no reason, make your own question. If you make changes to the original question, make your output just the new question."
                            },
                        ],
                    });
                    if(completion3.choices[0].message.content !== null)
                        {tempQuestions[i].name = completion3.choices[0].message.content;}
                }
            }
            tempQuestions[i].reason = "";
            tempQuestions[i].score = 6;

        }
        setQuestions([...tempQuestions]);
        let tempText: string[] = tempQuestions.map((question: ratedQuestion)=> question.name);
        StoreQuestions.setQuestionsAnswered([...tempText]);
    }

    return <div className='Rater'><div className='Header'><h1>Welcome to the Question Rater!!</h1><div>{questions.length === 0 ? <h2>You have no questions to rate right now.</h2> : ''}</div><div><Link to='/'><Button>Back To Home</Button></Link></div>
    <div>{ questions.length !== 0 ? <div className="progressbar">
            <div style={{
                height:"100%",
                width: `${amountAnswered}%`,
                backgroundColor: "blue",
                transition: "width 0.5s"
            }}>{amountAnswered}%</div>
            {/* <span className="progress">{amountAnswered}%</span> */}
        </div>: ""}</div>
    </div>
    <div>{questions.map((rateQuestion:ratedQuestion, indexes: number)=> (
        <div className='RaterQuestion'><div className="Description">{rateQuestion.name}{/*, Score: {rateQuestion.score}*/}</div>
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
    <div>{/*Reason is: {rateQuestion.reason}*/}</div>
        </div>
    ))}</div>
    <div>{ questions.length !==0 ? <Link to='/'><Button disabled={questions.length === 0} onClick={changeQuestions}>Finish Survey</Button></Link>: ""}</div>
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