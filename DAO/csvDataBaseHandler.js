
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

function editUserStory(id, title, story, criteria, value, estimation, status) {
   const storyArray = readDataFromDataBaseFile();

   const parametersMap = helper.createParametersMapForEditedUserStory(id, title, story, criteria,
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
   helper.saveNewJsonToDataBaseFile(newJsonDataBase);
}

const Story = require('../model/story');
const fs = require('fs');
const helper = require("./csvDAOhelper");
module.exports.readDataFromDataBaseFile = readDataFromDataBaseFile;
module.exports.saveNewRecordToDataBaseFile = saveNewRecordToDataBaseFile;
module.exports.editUserStory = editUserStory;