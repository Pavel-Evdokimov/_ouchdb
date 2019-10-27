const assert = require("assert");
const got = require("got");
const tunnel = require("tunnel");
const url = "http://admin:admin@localhost:5984/_users/org.couchdb.user";
const user = { name: "test", password: "123456", roles: [], type: "user" };
const userUrl = () => `${url}:${user.name}`;
let userRevision = "";

/**
 * Берем весь трафик в Fiddler
 */
let proxy = tunnel.httpOverHttp({
  proxy: {
    host: "localhost",
    port: 8888
  }
});

describe("users", function() {
  it("create new user", async function() {
    let result;
    try {
      result = await got.put(userUrl(), {
        json: true,
        body: user,
        agent: proxy
      });
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(result.statusMessage === "OK");
  });

  /**
   * Получим версию документа для пользователя
   */
  it("get information about test user", async function() {
    let result;
    try {
      result = await got.head(userUrl(), { agent: proxy });
    } catch (error) {
      assert.fail(error);
    }
    userRevision = result.headers["etag"];
    assert.ok(result.statusMessage === "OK");
  });

  it("delete test user", async function() {
    let result;
    try {
      result = await got
        .delete(userUrl(), {
          agent: proxy,
          headers: { "If-None-Match": userRevision }
        })
    } catch (error) {
      assert.fail(error);
    }
    assert.ok(result.ok);
  });
});
