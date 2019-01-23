
function readDataFromDataBaseFile() {
    const jsonStringArray = fs.readFileSync('./DataBase/db.txt').toString().split("$");
    const objectsArray = [];
    for (let i = 0; i < jsonStringArray.length; i++) {
       objectsArray.push(JSON.parse(jsonStringArray[i]));
    }
    countOfUserStory = objectsArray.length;
    return objectsArray;
 }

 function saveNewRecordToDataBaseFile(title,userStory,criteria,value,estimation) {
   countOfUserStory ++;
   const parametersMap = helper.createParametersMapForNewUserStory(title,userStory,criteria,value,estimation);
   const newStory = new Story(parametersMap);
   // const newStoryJson = "$" + JSON.stringify(newStory);
   const newStoryJson = `$${JSON.stringify(newStory)}`;
   fs.appendFile('./DataBase/db.txt', newStoryJson, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
}

const Story = require('../model/story');
const fs = require('fs');
const helper = require("./csvDAOhelper");
module.exports.readDataFromDataBaseFile = readDataFromDataBaseFile;
module.exports.saveNewRecordToDataBaseFile = saveNewRecordToDataBaseFile;