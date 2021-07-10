#!/usr/bin/env node

const yargs = require('yargs')
const axios = require('axios')
const CrtShService = require('./services/CrtShService')

const options = yargs.usage('Usage: -d <domain>').option('d', {
  alias: 'domain',
  describe: 'Target domain',
  demandOption: true
}).argv

console.log(`Looking for the subdomains of ${options.domain}: \n`)

const crtShService = new CrtShService(
  options.domain,
  'crt.sh',
  `https://crt.sh/?q=${options.domain}&output=json`
)

crtShService.search()
console.log(`Results: `)
