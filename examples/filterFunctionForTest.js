const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}test`, {
  auth: { username: "admin", password: "admin" }
});

const filterDoc = {
  _id: "_design/app",
  _rev: "1-76e66df8371fbcda0b13d7aa405b3207",
  filters: {
    user: function(doc, req) {
      if (doc.userName != req.userCtx.name) {
        return false;
      }
      return true;
    }.toString()
  }
};

db.put(filterDoc)
  .then(val => {
    console.log(val);
  })
  .catch(err => {
    console.log(err);
  });
