

function parseCookieToEdit(cookie) {
   let numberOfStoryToedit = cookie.split(':')[1];
   const length = numberOfStoryToedit.length;
   numberOfStoryToedit = numberOfStoryToedit.substring(1, length-2);
   return numberOfStoryToedit;
}


function editUserStory(id, title, story, criteria, value, estimation, status) {
   const storyArray = csvDBhandler.readDataFromDataBaseFile();

   const parametersMap = createParametersMapForEditedUserStory(id, title, story, criteria,
       value, estimation, status);

   const editedStory = new Story(parametersMap);
   storyArray[id-1] = editedStory;
   let newJsonDataBase = "";
   for (let i = 0; i < storyArray.length; i++) {
      newJsonDataBase += JSON.stringify(storyArray[i]);
      if (i < storyArray.length - 1) {
         newJsonDataBase += "$";
      }
   }  
   saveNewJsonToDataBaseFile(newJsonDataBase);
}


function saveNewJsonToDataBaseFile(newJson) {
   fs.writeFile('DataBase/db.txt', newJson, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
}


/// prepare express
const express = require('express');
const app = express();


/// import model
const Story = require('./model/story');

//import db handler

const csvDBhandler = require('./DAO/csvDataBaseHandler');


/// prepare cookie handling
const cookies = require('cookies');
const cookieParser=require("cookie-parser");
app.use(cookieParser());

/// prepare body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());


// prepare static files handling
app.use(express.static(__dirname + '/public'));
app.use(express.static('/styles'));


//prepare templates
app.set('views', './views');
app.set('view engine', 'pug');


// support variables
let countOfUserStory = 0;
const fs = require('fs');


/// set main route

app.get('/', function (req, res) {

   const cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));

   if (cookie == '{}') {
      console.log('Cookies: ', req.cookies);
     
      const arrayOfRecordsToTable = csvDBhandler.readDataFromDataBaseFile();
      res.render('index', {arrayOfRecordsToTable});
   }
   else {
      console.log('Cookies: ', req.cookies);
      res.redirect('/edit');
   }
});


/// set add and added routes

app.get('/add', function(req, res) {
   res.render('add');
});


app.post('/added', function(req, res) {
   csvDBhandler.saveNewRecordToDataBaseFile(req.body.storyTitle, req.body.userStory, req.body.criteria, 
      req.body.value,req.body.estimation, req.body.status);
   res.render('added');
})


/// set edit and edited routes

app.get('/edit', function(req, res) {
   const cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
   const numberOfStoryToEdit = parseCookieToEdit(cookie);
   const storyArray = csvDBhandler.readDataFromDataBaseFile();
   editingStoryObject = storyArray[numberOfStoryToEdit-1];

   res.render('edit', {editingStoryObject});
})


app.post('/edited', function(req, res) {
   const cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
   const numberOfStoryToEdit = parseCookieToEdit(cookie);
   res.clearCookie("toEdit");
   editUserStory(numberOfStoryToEdit, req.body.storyTitle, req.body.userStory, req.body.criteria, 
      req.body.value,req.body.estimation, req.body.status);
   res.render('edited');

})



/// start server

const server = app.listen(8000, function () {
   const host = server.address().address;
   const port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});
