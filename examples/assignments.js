const url = "http://z14-0774-opndfb.vesta.ru:5984";
const nano = require('nano')(url);
const db = nano.db.use('assignments');
const feed = db.follow({since: "now", view: "user/current", include_docs: true});

feed.on('change', (change) => {
  console.log("change: ", change);
})
.on('error', (err) => {
    console.log(err);
});

feed.follow();