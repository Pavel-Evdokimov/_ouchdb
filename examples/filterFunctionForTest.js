const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}test`, {
  auth: { username: "admin", password: "admin" }
});

const filterDoc = {
  _id: "_design/app",
  _rev: "9-36cd3068d19f5ea9a48c509674c4558f",
  filters: {
    user: function(doc, req) {
      // If current user is author or recepient or in group of recepients
      if (
        doc.userName != req.userCtx.name &&
        doc.shareWith != req.userCtx.name
      ) {
        if (req.userCtx.roles.indexOf(doc.shareWithGroup) > -1) {
          return true;
        }
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
