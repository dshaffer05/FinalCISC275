//import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Detailed.css'

export function Detailed(){
    return <div className='Detailed'>Welcome to Detailed Questions!<div><Link to='/'><Button>Back To Home</Button></Link></div></div>
}