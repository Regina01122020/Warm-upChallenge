const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 8080

// TO USE THE EJS TEMPLATE ENGINE
app.set('view engine', 'ejs')
// FOR PARSING THE URL ENCODED DATA 
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE FOR PARSING JSON OBJECTS
app.use(bodyParser.urlencoded({extended: true}))

// IMPORT THE DB SCHEMA
const schema = require('./model/schema.js')

// CONNECTING TO THE DATABASE 
mongoose.connect('mongodb://localhost/warmupDB', 
{ useNewUrlParser: true, useUnifiedTopology: true },
    // GIVES AN ERROR IF NOT CONNECTED TO THE DB
    function(err, database) { 
    if (err) { 
    throw err;
    }  
    // LOG OUT THIS MESSAGE IF CONNECTION IS SUCCESSFUL
    console.log("Connection made to database.")
    }
) 

// THE ROUTE TO THE "index.ejs" FILE
app.get('/', function(req, res){
    res.render('index')
})

// POST REQUEST TO POST THE FORM 
app.post('/home', function(req, res) {
    console.log("Post route hit")
    console.log(req.body)
// CREATES THE STUDENT OBJECT
studentObject = {
    Name: req.body.Name,
    Gender: req.body.Gender,
    Age: req.body.Age,
    Course: req.body.Course
}
// ADD THE STUDENT TO THE DB
studentToAdd = new schema(studentObject)  
// SAVES THE STUDENT DATA FORM
studentToAdd.save() 
    .then(function(student) {
        console.log("Student Details Saved!")
        console.log(student)
        res.send(student)
    })
    // DISPLAYS AN ERROR MESSAGE IF THERE'S AN ERROR
    .catch(function(err) {
        console.log(err)
    })
}) 

// SERVER LISTENING AT THIS PORT
app.listen(port, function(){
    console.log(`Express App running at http://localhost:${port}`)
})