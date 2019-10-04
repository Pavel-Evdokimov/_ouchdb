const url = require('./db');
const nano = require('nano')(url);
const db = nano.db.use('couch');
const feed = db.follow({since: "now"});

feed.on('change', (change) => {
  console.log("change: ", change);
});

feed.follow();