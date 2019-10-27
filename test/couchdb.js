const assert = require("assert");
const got = require("got");
const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const testDB = new PouchDB("http://admin:admin@localhost:5984/test");

/**
 * Проверим, что couchdb установлена и развёрнута
 */
describe("couchdb is connected", function() {
  it("couchdb info", async function() {
    const result = await got.get("http://localhost:5984");
    assert.ok(result.statusMessage === "OK");
  });

  it("create test db", async function() {
    const dbInfo = await testDB.info();
    assert.equal(dbInfo.db_name, "test");
  });

  it("delete db", async function() {
    const reuslt = await testDB.destroy();
  });
});
