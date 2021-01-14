import React, { useContext, useState } from 'react'
import useLocalStorage from "./../hooks/useLocalStorage";
import { useContacts } from "./contactsProvider"

const ChatsContext = React.createContext();

export function useChats() {
    return useContext(ChatsContext);
}

export function ChatsProvider( { id, children } ) {

const { contacts } = useContacts();
const [chats, setChats] = useLocalStorage('chats', []);
const [selectedChatIndex, setSelectedChatIndex] = useState(0);

function createChat(recipientIds) {
    setChats(prevChat => {
        return [...prevChat, {recipientIds, messages: []}]
    })
}
function addMessageToChat( { recipientIds, text, sender } ) {
    setChats( prevChats => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newChats = prevChats.map( chat => {
            if(arrayEquality(chat.recipientIds, recipientIds)) {
                madeChange = true;
                return {
                    ...chat, 
                    messages: [...chat.messages, newMessage]
                }
            }
            return chat
        })
        if (madeChange) {
            return newChats
        } else {
            return [...prevChats, { recipientIds, message: [newMessage] }]
        }
    })
}
function sendMessage( recipientIds, text ) {
    addMessageToChat( { recipientIds, text, sender: id } );
}

const formattedChats = chats.map( (chat, index) => {
    const recipientIds = chat.recipientIds.map( recipientId => {
        const contact = contacts.find(contact => {
            return contact.id === recipientId
        })
        const name = ( contact && contact.name )|| recipientId;
        return { id: recipientId, name }
    })

    const messages = chat.messages.map( message => {
        const contact = contacts.find(contact => {
            return contact.id === message.sender
        })
        const name = ( contact && contact.name )|| message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedChatIndex;
    return { ...chats, messages, recipientIds, selected }
})

const value = {
    chats: formattedChats, 
    selectedChat: formattedChats[selectedChatIndex], 
    selectChatIndex: setSelectedChatIndex, 
    sendMessage, 
    createChat
}

    return (
        <ChatsContext.Provider value= { value }>
            {children}
        </ChatsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if(a.length !== b.length) {
        return false
    } else {
        a.sort();
        b.sort();

        return a.every((element, index) => {
            return element === b[index]
        } )
    }
}
