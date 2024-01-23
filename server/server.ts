import express from "express";
require('dotenv').config();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
// @ts-ignore
import { connectDB, db } from './db';
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');
// @ts-ignore
import router from './routes';
import { CLIENT_URL } from "./constants";
const app = express();

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
