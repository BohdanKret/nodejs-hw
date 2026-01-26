import 'dotenv/config';
import express from "express";
import cors from 'cors';
// import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
// import { Note } from './models/notes.js';
import { notFoundHandler } from './middlelware/notFoundHandler.js';
import { errorHandler } from './middlelware/errorHandler.js';
import notesRouters from './routes/notesRouters.js';
import { logger } from './middlelware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
await connectMongoDB();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(notesRouters);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});