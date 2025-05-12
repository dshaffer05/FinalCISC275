import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { StringModel } from './StringModel';

const app = express();
const PORT = 3001;

mongoose.connect('your_mongo_connection_string_here');

app.use(cors());
app.use(bodyParser.json());

app.post('/save', async (req, res) => {
  try {
    const { content } = req.body;
    const savedDoc = await new StringModel({ content }).save();
    res.status(200).json(savedDoc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
