import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";

function Login( { setId } ) {

const IDRef= useRef();

function submitHandler(e) {
    e.preventDefault();
    setId(IDRef.current.value);
}
function createNewId() {
    setId(uuidv4());
}

    return (
        <Container className= "align-items-center d-flex" style= { {height:"100vh"} }>
            <Form onSubmit= {submitHandler} className= "w-100">
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type= "text" ref={IDRef} required></Form.Control>
                </Form.Group>
                <Button type= "submit" className= "mr-3">Login</Button>
                <Button onClick= {createNewId} variant= "secondary">create new ID</Button>
            </Form>
        </Container>        
    )
}

export default Login;