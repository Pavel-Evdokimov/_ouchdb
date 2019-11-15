const got = require("got");
const url = process.env.db || "http://admin:admin@localhost:5984";
const returnObject = ({
  statusCode,
  statusMessage,
  body,
  headers: { etag },
  ...rest
}) => {
  return { statusCode, statusMessage, body, headers: { etag } };
};

exports.createUser = ({ name, password, roles = ["testRole"], type = "user" }) =>
  got
    .put(`${url}/_users/org.couchdb.user:${name}`, {
      json: true,
      body: { name, password, roles, type }
    })
    .then(returnObject)
    .catch(returnObject);
