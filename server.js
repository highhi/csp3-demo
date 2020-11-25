'use strict';

const express = require('express')
const app = express()
const hbs  = require('express-handlebars');
const helmet = require('helmet')
const debug = require('debug')('server')
const crypto = require('crypto')
const { createServer } = require('http')

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000
 
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(helmet())

const getNonceAndPolicies = () => {
  const nonce = crypto.randomBytes(16).toString('base64')
  const policies = [
    'object-src none',
    `base-uri none`,
    `script-src 'nonce-${nonce}' 'strict-dynamic'`,
    `child-src www.youtube.com`,
    'report-uri https://o481942.ingest.sentry.io/api/5531397/security/?sentry_key=f0d6135a39004f78b7385c59f4fa1f21'
  ]

  return [
    nonce,
    policies.join(';')
  ]
}

app.get('/', (_, res) => {
  const [nonce, list] = getNonceAndPolicies()
  res.set('Content-Security-Policy', list)
  res.set('Cache-Control', 'no-store max-age=0')
  res.render('home', { nonce });
})

const server = createServer(app)
server.listen(port)

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

  debug(`Listening on ${bind}`)
})

process.on('uncaughtException', err => {
  debug('Uncaught exception')
  debug(err)
  process.exit(1)
})

process.on('unhandledRejection', err => {
  debug('Unhandled Rejection')
  debug(err)
  process.exit(1)
})
