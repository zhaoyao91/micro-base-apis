const url = require('url')

const handlers = buildHandlers(
  require('./lib/apis/ping'),
  require('./lib/apis/info'),
)

module.exports = function (options) {
  return function (next) {
    return async function (req, res) {
      const key = buildHandlerKey(url.parse(req.url).pathname, req.method)
      const handler = handlers[key] || next
      return await handler(req, res)
    }
  }
}

function buildHandlerKey (path, method) {
  return `${path} ${method}`
}

function buildHandlers (...apis) {
  const handlers = {}
  apis.forEach(api => {
    handlers[buildHandlerKey(api.path, api.method)] = api.handler
  })
  return handlers
}