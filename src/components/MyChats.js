import React from 'react'
import { ListGroup } from "react-bootstrap";
import { useChats } from "./../contexts/chatsProvider";

export default function MyContacts() {

const { chats, selectChatIndex } = useChats();

    return (
        <ListGroup variant= "flush">
            { chats.map( (chat, index) => (
                <ListGroup.Item 
                    key= { index }
                    action 
                    onClick = {() => selectChatIndex(index)}
                    active= {chat.selected}
                > 
                    { chat.recipientIds.map( recipientId => recipientId.name ).join(', ') }
                </ListGroup.Item> 
            ) ) }
        </ListGroup>
    )
}
