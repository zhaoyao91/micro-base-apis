require('babel-polyfill')
require('babel-register')

const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const os = require('os')

const baseApis = require('./index')

const service = micro(baseApis()((req, res) => 'hello world'))

test('default', async t => {
  const url = await listen(service)

  const res = await fetch(`${url}/xxx`)
  const body = await res.text()

  t.is(body, 'hello world')
})

test('ping', async t => {
  const url = await listen(service)

  const res = await fetch(`${url}/ping`)
  const body = await res.text()

  t.is(body, 'pong')
})

test('info', async t=> {
  const url = await listen(service)

  const res = await fetch(`${url}/info`)
  const body = await res.json()

  t.is(body.pid, process.pid)
  t.is(body.hostname, os.hostname())
})
