/**
 * @description Преобразовать ответ от got в формат успех, данные, доп. заголовки
 * @param {got.GotPromise} GotPromise response
 * @returns {Object} Вернет объект ok: boolean, etag: string, body: object
 */
exports.parseGotResponseFromCouchDB = ({
  statusCode,
  statusMessage,
  body = {},
  headers: { etag }
}) => {
  return { ok: statusCode === 200 && statusMessage === "OK", etag, body };
};

/**
 * @description Преобразовать ответ от got в формат успех, данные, доп. заголовки
 * @param {got.GotPromise} GotPromise response
 * @returns {Object} Вернет объект ok: boolean, etag: string, body: object
 */
exports.parseGotPutResponseFromCouchDB = ({
  statusCode,
  statusMessage,
  body = {},
  headers: { etag }
}) => {
  return { ok: statusCode === 201 && statusMessage === "Created", etag, body };
};

exports.parseGotPostSessionFromCouchDB = ({
  statusCode,
  statusMessage,
  body = {},
  headers: { "set-cookie": setCookie }
}) => {
  return {
    ok: statusCode === 200 && statusMessage === "OK" && setCookie.length > 0,
    body,
    AuthSession: setCookie.filter(value => {
      return value.match("AuthSession=");
    })
  };
};

exports.parseGotPutSecurity = ({ statusCode, statusMessage, body }) => {
  return {
    ok: statusCode === 200 && statusMessage === "OK",
    body
  };
};
