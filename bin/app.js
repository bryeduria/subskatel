#!/usr/bin/env node

const yargs = require('yargs')
const axios = require('axios')

const options = yargs.usage('Usage: -d <domain>').option('d', {
  alias: 'domain',
  describe: 'Target domain',
  demandOption: true
}).argv

const results = []

console.log(`Looking for the subdomains of ${options.domain}: \n`)
console.log(`Searching at crt.sh....`)

axios
  .get(`https://crt.sh/?q=${options.domain}&output=json`)
  .then((response) => {
    if (response?.data === undefined) {
      throw Error(`The requested property for JSON object was invalid.`)
    }

    const { data } = response

    // data = new Set(data)

    let subdomains = data.map((x) => x.common_name)
    subdomains = Array.from(new Set(subdomains))

    const domainFilter = new RegExp(`.${options.domain}`)

    return subdomains
      .filter((x) => domainFilter.test(x))
      .forEach((filteredSubs) => results.push(filteredSubs))
  })
  .catch((error) =>
    console.error(
      `An error occured while querying from crt.sh.\n  - ${error.message}\n`
    )
  )

// const subdomains = new Set(results)

// subdomains.forEach((subs) => {
//   console.log(subs)
// })
