import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Rater.css'
import { Link } from 'react-router-dom';
export function Rater(){
    return <div className='Rater'>Welcome to the Question Rater!<div><Link to='/'><Button>Back To Home</Button></Link></div></div>
}