import React from "react";
import MessageFormUI from "./MessageFormUI";
import { useState } from "react";
import { usePostAiTextMutation } from "@/state/api";

// Rendering the same Component MessageFormUI in to this AI form
// in this we will make API call send text to the server
function Ai({ props, activeChat }) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();


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
    
    
    trigger(form); // this will send post request to server that will go to openai using API
// after that we have to fetch the inforamtion from the chatbot and again make the post request
// that will appear in the chat as of the chat bot has summited the handleSUbmit function to chat engine

    setMessage(""); //after sending the message clearing the message state variable
    setAttachment(""); // attachement as well
  }
  return (
    <>
      <MessageFormUI
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Ai;
