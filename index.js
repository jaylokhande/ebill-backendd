var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const userRouter = require('./user');
app.use('/user',userRouter);

app.listen(3000,console.log("your server start on port 3000"));  // 192.168.1.8