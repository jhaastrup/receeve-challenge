import express, { Application } from "express";
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import EventController from "./controllers/eventController";

dotenv.config();

const app: Application = express();

app.use(express.json());


app.post('/', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.post('/event', EventController);

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
} else {
  exports.handler = serverless(app);
}