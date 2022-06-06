const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const diaryRoute = require('./routes/diary');
const goalRoute = require('./routes/goal');
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/diary', diaryRoute);
app.use('/api/goal', goalRoute);

app.listen(process.env.PORT, () =>
  console.log(`server running at ${process.env.PORT}`)
);
