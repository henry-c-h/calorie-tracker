const express = require('express');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const diaryRoute = require('./routes/diary');
const goalRoute = require('./routes/goal');
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 7001;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'));

app.use(compression());
app.use(helmet());
// to parse the json in the request body into a js object req.body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.use('/api/diary', diaryRoute);
app.use('/api/goal', goalRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`server running at ${PORT}`));
