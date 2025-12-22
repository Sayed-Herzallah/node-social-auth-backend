const express = require('express');
const morgan = require('morgan');
const errormiddle= require('./middlewares/errhandler.middleware');


const authroute= require('./routes/outh.route');
const postroute = require('./routes/post.route');

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use('/auth',authroute);
app.use('/posts',postroute);

app.use(errormiddle.errmiddleware);


module.exports=app