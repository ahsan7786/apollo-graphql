const { DataSource } = require("apollo-datasource");
const sessions = require("../data/sessions.json");
const _ = require("lodash");
class SessionAPI extends DataSource {
  constructor() {
    super();
  }
  initialize(config) {}
  getSessions() {
    return sessions;
  }
  getSessionById(ID) {
    const data = _.filter(sessions, { id: parseInt(ID) });
    return data[0];
  }
  addNewSession(input) {
    input.id = 1221;
    sessions.push(input);
    return input;
  }
}

module.exports = SessionAPI;
