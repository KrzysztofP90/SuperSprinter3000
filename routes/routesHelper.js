
function parseCookieToEdit(cookie) {
    let numberOfStoryToedit = cookie.split(':')[1];
    const length = numberOfStoryToedit.length;
    numberOfStoryToedit = numberOfStoryToedit.substring(1, length-2);
    return numberOfStoryToedit;
 }

 module.exports.parseCookieToEdit = parseCookieToEdit;