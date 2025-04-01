import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Simple.css'
import { Link } from 'react-router-dom';
export function Simple(){
    return <div className='Simple'>Welcome to Simple Questions!<div><Link to='/'><Button>Back To Home</Button></Link></div></div>
}