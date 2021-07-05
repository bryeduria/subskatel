#!/usr/bin/env node

const yargs = require('yargs')

const options = yargs.usage('Usage: -d <domain>').option('d', {
  alias: 'domain',
  describe: 'Target domain',
  type: 'string',
  demandOption: true
}).argv

console.log(`Looking for the subdomains of ${options.domain} ...`)
