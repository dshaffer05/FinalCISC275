/*import { Button } from "react-bootstrap";
import { StoreQuestions } from "./StoreQuestions"
import { useState } from "react";
import "./Results.css";
import OpenAI from "openai";
import { Link } from "react-router-dom";*/
export function Results({API}: {API:string;}){
    /*const client = new OpenAI(
        {apiKey:API, dangerouslyAllowBrowser:true}
    );
    const [detailed, setDetailed] = useState<string[]>([...StoreQuestions.getDetailed()]);
    const [detailedAnswers, setDetailedAnswers] = useState<number[]>([...StoreQuestions.getDetailedAnswers()]);
    function getResultString(){
        console.log("got into function!!");
        let result: string = "";
        for(let i = 0; i < detailed.length; i++){
            if(detailedAnswers[i] !== -1){
                result+=""+detailed[i]+": 10\n";
            }
        }
        //setResults(result);
        //console.log("Results are now: "+results);
        return result;
    }
    const [results, setResults] = useState<string>(getResultString());
    const [job, setJob] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    async function createJob(){
        setDetailed(detailed);
        setDetailedAnswers(detailedAnswers);
        setResults(results);
        console.log("made into function");
        const completion2 = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: "Use the following answered to questions on a scale of 1-10: "+results+", find a career that would most likely conform to these results and make your output just the name of that job"
                },
            ],
        });
        const newJob = completion2.choices[0].message.content ?? "";
        setJob(newJob);
        console.log("job is: "+job);
        const completion3 = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: "make your output a description of this job: "+newJob+", just make the output the description",
                    },
            ],
        });
        const newDescription = completion3.choices[0].message.content ?? "";
        setDescription(newDescription);
        //await createDescription(newJob);
        
    }
    //createJob()
    async function createDescription(jobName: string){
        console.log("the job: "+jobName);
        const completion3 = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: "make your output a description of this job: "+jobName,
                    },
            ],
        });
        if(completion3.choices[0].message.content !== null){
            //return ""+completion2.choices[0].message.content;
            setDescription(completion3.choices[0].message.content);
        }
        else{
            //return "";
            setDescription("");
        }
    }*/
    //createDescription();
    //const [job, setJob] = useState<string>("");

    return <div className="Results"> {/*<h1>{job}</h1><div>{description}</div><Button onClick={ async () => { await createJob(); }}>Click for Results</Button><Link to="/"><Button>Back to Homepage</Button></Link>*/}</div>
}