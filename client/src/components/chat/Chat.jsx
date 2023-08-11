import React from "react";

import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customeHeader/Header";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";

function Chat({ user, secret }) {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    // this will grab the project from the environment variable
    user, // user
    secret // its password
  );
  return (
    <>
      <div style={{ flexBasis: "100%" }}>
        <MultiChatSocket {...chatProps} />

        {/* //Customization how the chat looks */}
        <MultiChatWindow
          {...chatProps}
          style={{ height: "100vh" }}
          renderChatHeader={(chat) => <Header chat={chat} />}
          renderMessageForm={(props) => {
            // Depending upon the chat
            // we going to render a normal message form
            // or a AI message
            // we are distinguishing based upon the title
            if (chatProps.chat?.title.startsWith("AiChat_")) {
              return <Ai props={props} activeChat={chatProps.chat} />;
            }

            // if the title starts with AiCode then render thi s input field
            if (chatProps.chat?.title.startsWith("AiCode_")) {
              return <AiCode props={props} activeChat={chatProps.chat} />;
            }

            if (chatProps.chat?.title.startsWith("AiAssist_")) {
              return <AiAssist props={props} activeChat={chatProps.chat} />;
            }

            return (
              <StandardMessageForm props={props} activeChat={chatProps.chat} />
            );
          }}
        />
      </div>
    </>
  );
}

export default Chat;
