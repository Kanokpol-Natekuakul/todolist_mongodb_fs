import express from 'express';
import bodyParser from 'body-parser';
import {router as todorouter} from './modules/todo/todo.controller.js';   
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(todorouter);
app.listen(3030, async() => {
  console.log("http://localhost:3030");
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb+srv://todo:todo123@cluster0.ywio5p9.mongodb.net/");});