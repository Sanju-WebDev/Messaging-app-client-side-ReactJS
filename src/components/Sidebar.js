import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import MyChats from "./MyChats";
import MyContacts from "./MyContacts";
import NewChatModal from "./NewChatModal";
import NewContactModal from "./NewContactModal";

const chatsEventKey = 'Chats';
const contactsEventKey = 'Contacts';

export default function Sidebar( { Id } ) {

const [activeKey, setActiveKey] = useState(chatsEventKey);
const chatsOpen = activeKey === chatsEventKey;
const [modalOpen, setModalOpen] = useState(false);

function closeModal() {
    setModalOpen(false);
}

    return (
        <div style= {{width: "25vw"}} className= "d-flex flex-column">
            <Tab.Container activeKey= {activeKey} onSelect= {setActiveKey}> 
                <Nav variant= "tabs" className= "justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey= {chatsEventKey}>
                            Chats
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey= {contactsEventKey}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className= "border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey= {chatsEventKey}>
                        <MyChats/>
                    </Tab.Pane>
                    <Tab.Pane eventKey= {contactsEventKey}>
                        <MyContacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div className= "p-2 border-top border-right small">
                    your ID: <span className= "text-muted">{Id}</span>
                </div>
                <Button className= "rounded-0" onClick= { () => setModalOpen(true) }>
                    New {chatsOpen ? 'Chat' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show= {modalOpen} onHide= {closeModal}>
                {chatsOpen ? <NewChatModal closeModal= {closeModal} /> : <NewContactModal closeModal= {closeModal}/>}
            </Modal> 
        </div>
    )
}
