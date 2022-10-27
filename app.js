const express = require("express")
const app=express();
var bodyParser = require('body-parser');
const sequelize = require('./server/Database/connection')
const funcRoute = require('./server/Routes/functionRoute')
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

sequelize.sync().then(()=>{
    console.log('Connection has been established successfully.');
})

app.use('/',funcRoute)
app.listen(3000,()=>{
    console.log("server started");
})