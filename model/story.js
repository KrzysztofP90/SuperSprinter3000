class Story {

constructor(parameters) {
    this.id = parameters.get("id");
    this.title = parameters.get("title");
    this.story = parameters.get("story");
    this.criteria = parameters.get("criteria");
    this.value = parameters.get("value");
    this.estimation = parameters.get("estimation");
    this.status = parameters.get("status");
 }

}
module.exports = Story;