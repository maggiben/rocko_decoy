import express from "express";
require('dotenv').config();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
const { default: fetch, Headers, Request, Response } = require('node-fetch');
import { connectDB } from './db';
import cors from "cors";


// @ts-ignore
import router from './routes';
import { CLIENT_URL } from "./constants";
const app = express();

// Polyfill fetch, Headers, Request, and Response if they are not already defined
// AWS does not have these globals defined, so we need to polyfill them
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

app.use(cors({
  // @ts-ignore
  origin: (origin: string, callback: any ) => {
    if (!origin || CLIENT_URL || /(^https:\/\/)(([a-z0-9]+[.])*testnet.)?rocko.co$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect Database
connectDB();

/////////////// Define Routes
app.use('/', router);

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
