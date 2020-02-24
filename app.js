if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT;


//Router
const mainRoute = require('./routes');

//errHandler
const errHandler = require('./middlewares/errHandler');
// let mongoUri = 'mongodb://localhost/test12';
let mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Welcome to mongoDb`);
});


app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(mainRoute);
app.use(errHandler);


app.listen(PORT, () => console.log(`Server started on ${PORT}`));


