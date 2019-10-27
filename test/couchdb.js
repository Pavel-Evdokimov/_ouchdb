const assert = require("assert");
const got = require("got");
const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const DB_TEST = "test";
const DOCUMENT = { _id: "test1" };
const {
  parseGotPutResponseFromCouchDB,
  parseGotPutSecurity
} = require("../lib/helpers");
const couchUrl = "http://admin:admin@localhost:5984";
const usersUrl = `${couchUrl}/_users/org.couchdb.user`;
const sessionUrl = `${couchUrl}/_session`;
const securityUrl = `${couchUrl}/${DB_TEST}/_security`;
const user = { name: "test", password: "123456", roles: [], type: "user" };
const testUserUrl = `${usersUrl}:${user.name}`;
const securityObject = {
  admins: {
    names: ["admin"]
  },
  members: {
    roles: ["testRole"]
  }
};

/**
 * Проверим, что couchdb установлена и развёрнута
 */
describe("couchdb is connected", function() {
  it("couchdb info", async function() {
    const result = await got.get("http://localhost:5984");
    assert.ok(result.statusMessage === "OK");
  });

  it("db info", async function() {
    let testDB = new PouchDB(`http://admin:admin@localhost:5984/${DB_TEST}`);
    const dbInfo = await testDB.info();
    assert.equal(dbInfo.db_name, DB_TEST);
  });

  /**
   * @description Из-за этого бд больше не будет публичной
   */
  it("put security admin to test db", async function() {
    let putResponse, parsedSecurity;
    try {
      putResponse = await got.put(securityUrl, {
        json: true,
        body: securityObject
      });
      parsedSecurity = parseGotPutSecurity(putResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedSecurity.ok);
  });

  it("create test user", async function() {
    let putResponse, parsedPutResponse;
    try {
      putResponse = await got.put(testUserUrl, {
        json: true,
        body: user
      });
      parsedPutResponse = parseGotPutResponseFromCouchDB(putResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedPutResponse.ok);
  });

  it("shoult reject attempt to read document", async function() {
    let testDB = new PouchDB(`${couchUrl}/${DB_TEST}`, {
      auth: { username: "test", password: "123456" }
    });
    await assert.rejects(testDB.get(DOCUMENT._id), "wtmessage?");
  });

  it("create document", async function() {
    let testDB = new PouchDB(`http://admin:admin@localhost:5984/${DB_TEST}`);
    let res;
    try {
      res = await testDB.put(DOCUMENT);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(res.ok);
  });

  it("read document", async function() {
    let testDB = new PouchDB(`http://admin:admin@localhost:5984/${DB_TEST}`);
    let res;
    try {
      res = await testDB.get(DOCUMENT["_id"], { revs: true, revs_info: true });
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(res._id === DOCUMENT["_id"]);
  });

  it("update document", async function() {
    assert.ok(false);
  });

  it("delet document", async function() {
    let testDB = new PouchDB(`http://admin:admin@localhost:5984/${DB_TEST}`);
    let res, document;
    try {
      document = await testDB.get(DOCUMENT._id);
      res = await testDB.remove(document);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(res.ok);
  });

  it.skip("delete db", async function() {
    const reuslt = await testDB.destroy();
  });
});
