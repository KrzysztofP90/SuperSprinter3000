function readDataFromCSV() {

}


var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static('/styles'));

app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', function (req, res) {
   res.render('index');
})

var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
})