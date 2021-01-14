import React, { useRef } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contactsProvider";

export default function NewContactModal( { closeModal } ) {

const nameRef = useRef();
const idRef = useRef();
const { createContact } = useContacts();
 
function handleSubmit(e) {
    e.preventDefault();
    createContact(nameRef.current.value, idRef.current.value);
    closeModal();
}
    return (
        <div>
            <Modal.Header closeButton>
                <h4>Create Contact</h4>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit= {handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Enter Name
                        </Form.Label>
                        <Form.Control type= "text" ref= {nameRef} required>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Enter ID
                        </Form.Label>
                        <Form.Control type= "text" ref= {idRef} required>
                        </Form.Control>
                    </Form.Group>
                    <Button type= "submit">
                        Add Contact
                    </Button>
                </Form>
            </Modal.Body>
        </div>
    )
}
