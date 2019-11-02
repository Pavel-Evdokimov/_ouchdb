const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}beacons`, {
  auth: { username: "admin", password: "admin" }
});

const designDoc = {
  _id: "_design/app",
  updates: {
    beacon: function(doc, req) {
      var body = JSON.parse(req.body);
      body["_id"] = req.uuid;
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
