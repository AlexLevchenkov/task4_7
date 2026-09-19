import dotenv from 'dotenv';
import path from "node:path";
import express, { Application, Request, Response } from 'express';
import { authRoutes, calendarsRoutes, eventsRoutes } from './routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/calendars', calendarsRoutes);
app.use('/events', eventsRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
