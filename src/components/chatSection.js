import React, { useState } from 'react';
import { Form, InputGroup, Button } from "react-bootstrap";
import { useChats } from "./../contexts/chatsProvider"

export default function ChatSection() {

const [text, setText] = useState('');
const { sendMessage, selectedChat } = useChats();

function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
        selectedChat.recipientIds.map( recipient => recipient.id ), 
        text
    )
    setText('');
}

    return (
        <div className= "d-flex flex-column flex-grow-1">
            <div className= "flex-grow-1 overflow-auto">
                <div className= "d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedChat.messages.map( (message,index) => {
                        return (
                            <div key= {index} className= {`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : '' }`}>
                                <div className= {`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border' }`}>
                                    {message.text}
                                </div>
                                <div className= {`text-muted small ${message.fromMe ? 'text-right' : '' }` }>
                                    { message.fromMe ? 'you' : message.senderName }
                                </div>
                            </div> 
                        )
                    })}
                </div>
            </div>
            <Form onSubmit= {handleSubmit}>
                <Form.Group className= "m-2">
                    <InputGroup>
                        <Form.Control
                            as= "textarea" 
                            required
                            value= {text}
                            onChange= {e => setText(e.target.value)}
                            style= {{ height: "75px", resize: 'none' }}
                        />
                        <InputGroup.Append>
                            <Button className= "p-3" type= "submit" >Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
