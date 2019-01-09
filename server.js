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
   this.status = "In progress";
   
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


var express = require('express');
var app = express();


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
   var arrayOfRecordsToTable = readDataFromDataBaseFile();
   res.render('index', {arrayOfRecordsToTable});
});


app.get('/add', function(req, res) {
   res.render('add');
});


app.post('/added', function(req, res) {
   saveNewRecordToDataBaseFile(req.body.storyTitle, req.body.userStory, req.body.criteria, 
      req.body.value,req.body.estimation);
   res.render('added');
})

var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});

var id = 0;
const fs = require('fs');

