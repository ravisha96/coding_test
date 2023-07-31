import 'dotenv/config';
import cors from 'cors';
import express from "express";

import routes from './routes/tasks.js';
import { connect } from "./db/connection.js";

const app = express();

app.use(cors());

app.use(express.static('./public/build'))

app.use(express.json());

app.use('/api/v1/tasks', routes);

const initializeServer = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () =>
      console.log(`server is listening on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

initializeServer()