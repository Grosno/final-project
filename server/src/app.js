import express from 'express'
import context from 'request-context'
import { v4 as generateUUID } from 'uuid'
import routes from './routes/index.js';
import status from '../constants/status.js';
import mongoose from 'mongoose';
import {MONGOOSE_URI} from "../config/serverConfig.js";

mongoose.connect(MONGOOSE_URI)
  .then(() => console.log('DB CONNECTED'))
  .catch(console.error)

const app = express();

app.use(express.json())
app.use(context.middleware('request'))
app.use((req, res, next) => {
  context.set('uuid', generateUUID())
  res.type('text/plain')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.use('/api', routes)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(status.SERVER_ERROR).send(err.toString())
  next()
})

export default app;
