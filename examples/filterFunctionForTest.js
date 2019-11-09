const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}test`, {
  auth: { username: "admin", password: "admin" }
});

const filterDoc = {
  _id: "_design/app",
  filters: {
    user: function(doc, req) {
      var body = JSON.parse(req.body);
      body["test"] = "this is test";
      return [body, "ok"];
    }.toString()
  }
};

db.put(designDoc)
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
