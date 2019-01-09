function readDataFromDataBaseFile() {
   var fs = require('fs');
   var jsonStringArray = fs.readFileSync('DataBase/db.txt').toString().split("$");
   var objectsArray = [];
   for (let i = 0; i < jsonStringArray.length; i++) {
      objectsArray.push(JSON.parse(jsonStringArray[i]));
   }
   return objectsArray;
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
   console.log(req.body.userStory);
   res.render('added');
})

var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});

