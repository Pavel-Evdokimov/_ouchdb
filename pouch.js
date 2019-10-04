// custom builds with no LevelDB dep https://pouchdb.com/custom.html
// npm install pouchdb-core
// npm install pouchdb-adapter-http

const PouchDB = require('pouchdb-core');
const url = require('./db');
PouchDB.plugin(require('pouchdb-adapter-http'));
const db = new PouchDB(`${url}couch`);
const level = process.argv[2];
console.log(level);

const changesParams = {
    since: "now",
    live: true,
    filter: "country/level",
    query_params: { level: level }
}

let changes = db.changes(changesParams);

changes.on("change", (change) => {
    console.log(change);
});

changes.on("error", (error) => {
    console.log(error);
});
