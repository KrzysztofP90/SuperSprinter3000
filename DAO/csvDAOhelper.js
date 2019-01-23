

function createParametersMapForNewUserStory(title,userStory,criteria,value,estimation) {
    const map = createParametersMapWithoutIdAndStatus(title,userStory,criteria,value,estimation);
    map.set("id", countOfUserStory);
    map.set("status", "planning");
    return map;
 }
 
 
 function createParametersMapWithoutIdAndStatus(title,userStory,criteria,value,estimation) {
    const map = new Map();
    map.set("title", title);
    map.set("story", userStory);
    map.set("criteria", criteria);
    map.set("value", value);
    map.set("estimation", estimation);
    return map;
 }
 
 function createParametersMapForEditedUserStory(id, title, story, criteria, value, estimation, status) {
    const map = createParametersMapWithoutIdAndStatus(title, story, criteria, value, estimation);
    map.set("id", id);
    map.set("status", status);
    return map;
 }



 module.exports.createParametersMapForNewUserStory = createParametersMapForNewUserStory;