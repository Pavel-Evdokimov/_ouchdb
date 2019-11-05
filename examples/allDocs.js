const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
PouchDB.plugin(require("pouchdb-mapreduce"));

const url = "http://localhost:5984/";
const db = new PouchDB(`${url}`, {
  auth: { username: "allown@mail.ru", password: "123456" }
});

(async () => {
  try {
    let r = await db.allDocs();
    console.log(r);
  } catch (error) {
    console.log(error);
  }
})();
