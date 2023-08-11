import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";
import { dot } from "node:test/reporters";
// import { prependOnceListener } from "node:process";

dotenv.config();

const router = express();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    // console.log("req-body", req.body);

    // console.log("text", text);
    // console.log("activeChatId", activeChatId);

    // This is going to make an API call the OPENAI for us
    // we have to submit the properties related chats

    //this is the response that we get from the openai
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
        { role: "user", content: text }, // message that user will send
      ],
    });

    // console.log("response data", response.data);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      } 
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/code", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    // console.log("req-body", req.body);

    // console.log("text", text);
    // console.log("activeChatId", activeChatId);

    // This is going to make an API call the OPENAI for us
    // we have to submit the properties related chats

    //this is the response that we get from the openai
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant coder who responds with only code and no explanations.",
        },
        { role: "user", content: text }, // message that user will send
      ],
    });

    // console.log("response data", response.data);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      } 
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/assist", async (req, res) => {
  try {
    const { text } = req.body;
    // console.log("req-body", req.body);

    // console.log("text", text);
    // console.log("activeChatId", activeChatId);

    // This is going to make an API call the OPENAI for us
    // we have to submit the properties related chats

    //this is the response that we get from the openai
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that servers only complete user's thoughts or sentences",
        },
        { role: "user", content: `Finish my thought:${text}` }, // message that user will send
      ],
    });

    // console.log("response data", response.data);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      } 
    );

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
