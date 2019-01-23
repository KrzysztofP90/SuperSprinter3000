
function setRoutes(app) {

    const cookieParser=require("cookie-parser");
    app.use(cookieParser());
    const csvDBhandler = require('../DAO/csvDataBaseHandler');
    

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


    app.get('/add', function(req, res) {
        res.render('add');
    });
    
    
    app.post('/added', function(req, res) {
        csvDBhandler.saveNewRecordToDataBaseFile(req.body.storyTitle, req.body.userStory, req.body.criteria, 
        req.body.value,req.body.estimation, req.body.status);
        res.render('added');
    })

    
    app.get('/edit', function(req, res) {
        const cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
        const numberOfStoryToEdit = routesHelper.parseCookieToEdit(cookie);
        const storyArray = csvDBhandler.readDataFromDataBaseFile();
        editingStoryObject = storyArray[numberOfStoryToEdit-1];
    
        res.render('edit', {editingStoryObject});
    })
    
    
    app.post('/edited', function(req, res) {
      
        const cookie = JSON.stringify(cookieParser.JSONCookies(req.cookies));
        const numberOfStoryToEdit = routesHelper.parseCookieToEdit(cookie);
        res.clearCookie("toEdit");
        csvDBhandler.editUserStory(numberOfStoryToEdit, req.body.storyTitle, req.body.userStory, req.body.criteria, 
        req.body.value,req.body.estimation, req.body.status);
        res.render('edited');
    
    })
}

routesHelper = require('./routesHelper');
module.exports.setRoutes = setRoutes;