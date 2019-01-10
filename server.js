function readDataFromDataBaseFile() {
   var jsonStringArray = fs.readFileSync('DataBase/db.txt').toString().split("$");
   var objectsArray = [];
   for (let i = 0; i < jsonStringArray.length; i++) {
      objectsArray.push(JSON.parse(jsonStringArray[i]));
   }
   countOfUserStory = objectsArray.length;
   return objectsArray;
}


function Story(parameters) {
   this.id = parameters.get("id");
   this.title = parameters.get("title");
   this.story = parameters.get("story");
   this.criteria = parameters.get("criteria");
   this.value = parameters.get("value");
   this.estimation = parameters.get("estimation");
   this.status = parameters.get("status");
}


function saveNewRecordToDataBaseFile(title,userStory,criteria,value,estimation) {
   countOfUserStory ++;
   var parametersMap = createParametersMapForNewUserStory(title,userStory,criteria,value,estimation);
   var newStory = new Story(parametersMap);
   var newStoryJson = "$" + JSON.stringify(newStory);
   fs.appendFile('DataBase/db.txt', newStoryJson, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
}


function createParametersMapForNewUserStory(title,userStory,criteria,value,estimation) {
   var map = createParametersMapWithoutIdAndStatus(title,userStory,criteria,value,estimation);
   map.set("id", countOfUserStory);
   map.set("status", "planning");
   return map;
}


function createParametersMapWithoutIdAndStatus(title,userStory,criteria,value,estimation) {
   var map = new Map();
   map.set("title", title);
   map.set("story", userStory);
   map.set("criteria", criteria);
   map.set("value", value);
   map.set("estimation", estimation);
   return map;
}

function createParametersMapForEditedUserStory(id, title, story, criteria, value, estimation, status) {
   var map = createParametersMapWithoutIdAndStatus(title, story, criteria, value, estimation);
   map.set("id", id);
   map.set("status", status);
   return map;
}


function parseCookieToEdit(cookie) {
   var numberOfStoryToedit = cookie.split(':')[1];
   var length = numberOfStoryToedit.length;
   numberOfStoryToedit = numberOfStoryToedit.substring(1, length-2);
   return numberOfStoryToedit;
}


function editUserStory(id, title, story, criteria, value, estimation, status) {
   var storyArray = readDataFromDataBaseFile();

   var parametersMap = createParametersMapForEditedUserStory(id, title, story, criteria,
       value, estimation, status);

   var editedStory = new Story(parametersMap);
   storyArray[id-1] = editedStory;
   var newJsonDataBase = "";
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


var express = require('express');
var app = express();

var cookies = require('cookies');
const cookieParser=require("cookie-parser");
app.use(cookieParser());


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/public'));
app.use(express.static('/styles'));

app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', function (req, res) {

   var cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));

   if (cookie == '{}') {
      console.log('Cookies: ', req.cookies);
     
      var arrayOfRecordsToTable = readDataFromDataBaseFile();
      res.render('index', {arrayOfRecordsToTable});
   }
   else {
      console.log('Cookies: ', req.cookies);
      res.redirect('/edit');
   }
});




app.get('/add', function(req, res) {
   res.render('add');
});


app.post('/added', function(req, res) {
   saveNewRecordToDataBaseFile(req.body.storyTitle, req.body.userStory, req.body.criteria, 
      req.body.value,req.body.estimation, req.body.status);
   res.render('added');
})

app.get('/edit', function(req, res) {

   res.render('edit');
})


app.post('/edited', function(req, res) {
   var cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
   var numberOfStoryToEdit = parseCookieToEdit(cookie);
   res.clearCookie("toEdit");
   editUserStory(numberOfStoryToEdit, req.body.storyTitle, req.body.userStory, req.body.criteria, 
      req.body.value,req.body.estimation, req.body.status);
   res.render('edited');

})


var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});



var countOfUserStory = 0;
const fs = require('fs');



