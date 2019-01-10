function readDataFromDataBaseFile() {
   var jsonStringArray = fs.readFileSync('DataBase/db.txt').toString().split("$");
   var objectsArray = [];
   for (let i = 0; i < jsonStringArray.length; i++) {
      objectsArray.push(JSON.parse(jsonStringArray[i]));
   }
   id = objectsArray.length;
   return objectsArray;
}

function Story(title,userStory,criteria,value,estimation) {
   this.id = id;
   this.title = title;
   this.story = userStory;
   this.criteria = criteria;
   this.value = value;
   this.estimation = estimation;
   this.status = "planning";
}

function saveNewRecordToDataBaseFile(title,userStory,criteria,value,estimation) {
   id ++;
   var newStory = new Story(title,userStory,criteria,value,estimation);
   var newStoryJson = "$" + JSON.stringify(newStory);
   fs.appendFile('DataBase/db.txt', newStoryJson, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
}


function parseCookieToEdit(cookie) {
   var numberOfStoryToedit = cookie.split(':')[1];
   var length = numberOfStoryToedit.length;
   numberOfStoryToedit = numberOfStoryToedit.substring(1, length-2);
   return numberOfStoryToedit;
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
      req.body.value,req.body.estimation);
   res.render('added');
})

app.get('/edit', function(req, res) {

   res.render('edit');
})


app.post('/edited', function(req, res) {
   var cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
   var numberOfStoryToEdit = parseCookieToEdit(cookie);
   res.clearCookie("toEdit");
   res.render('edited');

})


var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});



var id = 0;
const fs = require('fs');



