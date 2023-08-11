// This is the autoComplete feature with the help of the OpenAi 
// User should type something and stop for a while to get the API request
// because we dont want to send the request at each change in input box


import React from "react";
import MessageFormUI from "./MessageFormUI";
import { useState, useEffect } from "react";
import { usePostAiAssistMutation } from "@/state/api";

// In React.js, debouncing is often employed to control how often certain event handlers are executed. 
// It helps to prevent excessive or unnecessary function calls, which can reduce unnecessary re-renders and improve the 
// overall efficiency of the application.


function useDebounce(value, delay){
    const[debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay) // setTimeout function is used to add the delay
        // to the particular function that we pass in as the argument


        return () => {
            clearTimeout(handler); // to clear the timeout
        }
    }, [value, delay]); 
}


// Rendering the same Component MessageFormUI in to this AI form
// in this we will make API call send text to the server
function AiAssist({ props, activeChat }) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation(); // fetching from the backend
    const[appendText, setAppendText] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }




  // handle submit function
  async function handleSubmit() {
    // attacment, sender username, activechat id, text, are needed properties
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)} + 00:00`);

    // to pass the attachments
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachment: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form); // passing this information in onSubmit props to chat server
    
    
   

    setMessage(""); //after sending the message clearing the message state variable
    setAttachment(""); // attachement as well
  }

  const debouncedValue = useDebounce(message,1000); // going to send the message variable
  // every 1000 second

  useEffect(() => {
      if(debouncedValue) {
          const form = { text: message};
          triggerAssist(form);
      }
  }, [debouncedValue]); // eslint-disable-line


  // Now one function to handle that whenever the suggestion appears
  // when we hit tab or enter the suggested text will appear in the 
  // form input box automatically

  const handleKeyDown = (e) => {
      // handle enter and tab 
      if(e.keyCode === 9 || e.keyCode ===13){ 
          // enter is represented with 9 
          // and tab is represented with 13
          e.preventDefault();

          setMessage(`${message} ${appendText}`)
        //append and  change the input box and 
      }
      setAppendText(""); 
  }

  useEffect(() => {
    if(resultAssist.data?.text){
        setAppendText(resultAssist.data?.text);
    }
  },[resultAssist]) // eslint-disable-line

  return (
    <>
      <MessageFormUI
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        appendText = {appendText}
        handleKeyDown = {handleKeyDown}
      />
    </>
  );
}

export default AiAssist;
