import React from 'react';
import Sidebar from "./Sidebar";
import { useChats } from "./../contexts/chatsProvider";
import ChatSection from "./chatSection"

export default function Dashboard( {Id} ) {

const { selectedChat } = useChats();

    return (
        <div className= "d-flex" style= { {height: "100vh"} }>
            <Sidebar Id= {Id} />
            { selectedChat && <ChatSection /> }
        </div>
    )
}
