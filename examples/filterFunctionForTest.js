const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "https://couchdb.ml/api/";
const db = new PouchDB(`${url}test`, {
  auth: { username: "admin", password: "admin" }
});

const filterDoc = {
  _id: "_design/app",
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
