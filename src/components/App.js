import React from "react";
import './../App.css';
import Login from "./login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/contactsProvider";
import { ChatsProvider } from "../contexts/chatsProvider";


function App() {

const [Id, setId] = useLocalStorage('Id');

const dashboard = (
  <ContactsProvider>
    <ChatsProvider id= {Id} >
      <Dashboard Id= {Id} />
    </ChatsProvider>
  </ContactsProvider>
)

  return (
    <div className="App">
      {Id ? dashboard : <Login setId={setId} />}
      
    </div>
  );
}

export default App;
