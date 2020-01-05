import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import App from "./App";
import updateDB from "./helpers/uploadToDb";
import SmileIcon from "./assets/smile.svg";

function ChatApp() {
  const [status, setStatus] = useState("idle");

  async function handleEnd({ steps, values }) {
    console.log(steps);
    console.log(values);
    const r = await updateDB(values);
    console.log(r);
    setStatus("done");
  }
  if (status === "done") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh"
        }}
      >
        <img src={SmileIcon} alt="smile" />
        <h2>Registration successful</h2>
      </div>
    );
  } else
    return (
      <ChatBot
        handleEnd={handleEnd}
        steps={[
          {
            id: "1",
            message: "What is your name?",
            trigger: "2"
          },
          {
            id: "2",
            user: true,
            trigger: "3"
          },
          { id: "3", message: "Phone Number ?", trigger: "4" },
          {
            id: "4",
            user: true,
            trigger: "5"
          },
          {
            id: "5",
            component: <App prev={`previousValue`} />,
            waitAction: true,
            end: true
          }
        ]}
      />
    );
}

export default ChatApp;
