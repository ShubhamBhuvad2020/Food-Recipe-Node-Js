const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

// config env file
dotenv.config({path:"config.env"});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb Connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}));
// app.use(bodyparser.json());

// express bodyparse
// app.use(express.urlencoded({extended:false}));

// set view engine
app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/',require('./server/routes/router'));

// call localhost
app.listen(PORT,()=>{console.log(`Server running at port http://localhost:${PORT}`)});
