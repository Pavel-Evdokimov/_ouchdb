const assert = require("assert");
const got = require("got");
const {
  parseGotResponseFromCouchDB,
  parseGotPutResponseFromCouchDB
} = require("../lib");
const url = "http://admin:admin@localhost:5984/_users/org.couchdb.user";
const user = { name: "test", password: "123456", roles: [], type: "user" };
const userUrl = () => `${url}:${user.name}`;

/**
 * Берем весь трафик в Fiddler.
 * На случай проблем разбить стекло и разкомментировать код
 */
// const tunnel = require("tunnel");
// let proxy = tunnel.httpOverHttp({
//   proxy: {
//     host: "localhost",
//     port: 8888
//   }
// });

describe("users", function() {
  it("create new user", async function() {
    let putResponse, parsedPutResponse;
    try {
      putResponse = await got.put(userUrl(), {
        json: true,
        body: user
      });
      parsedPutResponse = parseGotPutResponseFromCouchDB(putResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedPutResponse.ok);
  });

  it("delete test user", async function() {
    let headResponse, parsedHeadResponse;
    try {
      headResponse = await got.head(userUrl());
      parsedHeadResponse = parseGotResponseFromCouchDB(headResponse);
    } catch (error) {
      assert.fail(error);
    }
    let deleteResponse, parsedDeleteResponse;
    try {
      deleteResponse = await got.delete(userUrl(), {
        headers: { "If-Match": parsedHeadResponse.etag }
      });
      parsedDeleteResponse = parseGotResponseFromCouchDB(deleteResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedDeleteResponse.ok);
  });
});
