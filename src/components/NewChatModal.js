import React, { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "./../contexts/contactsProvider";
import { useChats } from "./../contexts/chatsProvider";


export default function NewChatModal( { closeModal } ) {

const [selectedContactIds, setSelectedContactIds] = useState([]);
const { contacts } = useContacts();
const { createChat } = useChats();

function handleCheckboxChange(contactId) {
    setSelectedContactIds( prevSelectedContactIds => {
        if(selectedContactIds.includes(contactId)) {
            return (
                prevSelectedContactIds.filter(prevId => (prevId !== contactId))
            )
        } else {
            return [...prevSelectedContactIds, contactId]
        }
    })
}
function handleSubmit(e) {
    e.preventDefault();
    createChat(selectedContactIds);
    closeModal();
}

    return (
        <div>
            <Modal.Header closeButton>
                <h4>Create Chat</h4>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit= {handleSubmit}>
                    { contacts.map(contact => (
                        <Form.Group controlId= {contact.id} key= {contact.id}>
                            <Form.Check 
                                type= "checkbox"
                                value= {selectedContactIds.includes(contact.id)}
                                label= {contact.name}
                                onChange= { () => handleCheckboxChange(contact.id) }
                            />
                        </Form.Group>
                    )) }
                    <Button type= "submit">
                        Add Chat
                    </Button>
                </Form>
            </Modal.Body>
        </div>
    )
}
