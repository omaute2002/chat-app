import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";
// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// OPEN AI Configuration

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

// ROUTES SECTION
// So to hit this route perfectly to routes present in routes folder
// the HTTP request should like follow
// http://localhost:1337/openai/text
// this will use the middleware that we have created in ROUTES folder
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);

// app.get("/", (req, res) => {

//   try{
//     res.json({message: "Great going"}).status();}catch(err){
//       console.log(err);
//     }

// })

/* Server Setup*/

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Listing on the PORT http://localhost:${PORT}`);
});
