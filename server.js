const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static('/styles'));

app.set('views', './views');
app.set('view engine', 'pug');

routesSetter = require("./routes/routesSetter");
routesSetter.setRoutes(app);

const server = app.listen(8000, function () {
   const host = server.address().address;
   const port = server.address().port;
   
   console.log("Start listening at http://%s:%s", host, port)
});
