// npm install pouchdb-mapreduce

const PouchDB = require('pouchdb-core');
PouchDB.plugin(require('pouchdb-adapter-http'));
PouchDB.plugin(require('pouchdb-mapreduce'));

const url = 'http://z14-0774-opndfb.vesta.ru:5984/';
const db = new PouchDB(`${url}couch`, { auth: { username: 'admin', password: 'admin' } });

const view = function (doc) {
    emit(doc.name);
}

const ddoc = {
    _id: '_design/my_index',
    views: {
        by_name2: {
            map: view.toString()
        }
    }
};

db.put(ddoc).then(() => {
    console.log("success");
}).catch(err => {
    console.log(err);
});