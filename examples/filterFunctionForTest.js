const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}test`, {
  auth: { username: "admin", password: "admin" }
});

const filterDoc = {
  _id: "_design/app",
  _rev: "3-3bcfec463f785ccf8930d5addd17c307",
  filters: {
    user: function(doc, req) {
      if (
        doc.userName != req.userCtx.name &&
        doc.shareWith != req.userCtx.name
      ) {
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
