const assert = require("assert");
const got = require("got");
const {
  parseGotResponseFromCouchDB,
  parseGotPutResponseFromCouchDB,
  parseGotPostSessionFromCouchDB
} = require("../lib/helpers");
const couchUrl = "http://admin:admin@localhost:5984";
const usersUrl = `${couchUrl}/_users/org.couchdb.user`;
const sessionUrl = `${couchUrl}/_session`;
const user = {
  name: "allown@mail.ru",
  password: "123456",
  roles: [],
  type: "user"
};
const testUserUrl = `${usersUrl}:${user.name}`;

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
  it.skip("create new user", async function() {
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

  it("authenticate user test", async function() {
    let postResponse, parsedPostResponse;
    try {
      postResponse = await got.post(sessionUrl, {
        json: true,
        body: {
          name: user.name,
          password: user.password
        }
      });
      parsedPostResponse = parseGotPostSessionFromCouchDB(postResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedPostResponse.ok);
  });

  it("delete test user", async function() {
    let headResponse, parsedHeadResponse;
    JSON.stringify;
    try {
      headResponse = await got.head(testUserUrl);
      parsedHeadResponse = parseGotResponseFromCouchDB(headResponse);
    } catch (error) {
      assert.fail(error);
    }
    let deleteResponse, parsedDeleteResponse;
    try {
      deleteResponse = await got.delete(testUserUrl, {
        headers: { "If-Match": parsedHeadResponse.etag }
      });
      parsedDeleteResponse = parseGotResponseFromCouchDB(deleteResponse);
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(parsedDeleteResponse.ok);
  });
});
