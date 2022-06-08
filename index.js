const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const diaryRoute = require('./routes/diary');
const goalRoute = require('./routes/goal');
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'));

// to parse the json in the request body into a js object req.body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/api/diary', diaryRoute);
app.use('/api/goal', goalRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT, () =>
  console.log(`server running at ${process.env.PORT}`)
);
