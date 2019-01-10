
function editUserStoryCookieHelper(userStoryId) {
    var cookieString = "toEdit=" + userStoryId.toString();
    document.cookie = cookieString;
}

