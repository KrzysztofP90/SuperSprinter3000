function readDataFromDataBaseFile() {
   var fs = require('fs');
   // var csv = require("fast-csv");
   // var stream = fs.createReadStream("DataBase/db.csv");
   
   // var csvStream = csv()
   // .on("data", function(data){
   //      console.log(data);
   // })
   // .on("end", function(){
   //      console.log("done");
   // });
   // content = stream.pipe(csvStream);
   // console.log(content + " dsadasfasfas");

   var jsonStringArray = fs.readFileSync('DataBase/db.txt').toString().split("$");
   var objectsArray = [];
   for (let i = 0; i < jsonStringArray.length; i++) {
      objectsArray.push(JSON.parse(jsonStringArray[i]));
   }
   return objectsArray;
}


var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static('/styles'));

app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', function (req, res) {
   var arrayOfRecordsToTable = readDataFromDataBaseFile();
   res.render('index', {arrayOfRecordsToTable});
})

var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
})

