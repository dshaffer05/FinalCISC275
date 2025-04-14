//import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
import "./ProgBar.css"
export function changeProgress(answered: boolean[]){
    const sum = answered.reduce((accumulator, question) => (question === true) ? accumulator++: accumulator+=0, 0);
    return sum;
    
}
export function ProgBar({answered,}:{answered:boolean[];}){
    /*const [progress, setProgress] = useState<boolean[]>({...answered});
    const [filled, setFilled] = useState<number>(0);
    const [running, isRunning] = useState<boolean>(false);

    function editFunction(){
        //let total: number | null;
        if(progress)
        {
            const sum = answered.reduce((accumulator, question) => (question === true) ? accumulator++: accumulator+=0, 0);
        setFilled(sum);}
    }
    return <div>
        <div className="progressbar" onChange={editFunction}>
            <div style={{
                height:"100%",
                width: `${filled}%`,
                backgroundColor: "blue",
                transition: "width 0.5s"
            }}></div>
            <span className="progress">{filled}%</span>
        </div>
    </div>*/
}