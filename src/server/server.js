// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
// app.use(express.static('website'));
app.use(express.static('dist'));


// Setup Server
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = app.listen(port, listening);
function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
}

//get route
app.get('/retrieve', getData);

function getData (req, res){
    res.send(projectData);
}

//POST route
app.post('/add', postData)

function postData(req, res){
    projectData = req.body;
    res.send({message: "post received"})
    console.log(req);
}