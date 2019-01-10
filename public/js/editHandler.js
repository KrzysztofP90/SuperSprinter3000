
function editUserStory(userStoryId) {
    var cookieString = "toEdit=" + userStoryId.toString();
    document.cookie = cookieString;
}
