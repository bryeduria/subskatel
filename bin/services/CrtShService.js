const axios = require('axios')
const ApiQuery = require('./ApiQuery')

class CrtShService extends ApiQuery {
  constructor(domain, serviceName, url) {
    super(serviceName)
    this.domain = domain
    this.url = url
  }

  search() {
    const results = []
    this.initializationMessage()
    return axios
      .get(`https://crt.sh/?q=${this.domain}&output=json`)
      .then((response) => {
        if (response?.data === undefined) {
          throw Error(`The requested property for JSON object was invalid.`)
        }
        const { data } = response
        let subdomains = data.map((x) => x.common_name)
        subdomains = Array.from(new Set(subdomains))
        const domainFilter = new RegExp(`.${this.domain}`)
        return subdomains
          .filter((x) => domainFilter.test(x))
          .forEach((filteredSubs) => results.push(filteredSubs))
      })
      .catch((error) =>
        console.error(
          `An error occured while querying from crt.sh.\n  - ${error.message}\n`
        )
      )
      .then(() =>
        results.forEach((x) => {
          console.log(x)
        })
      )
  }
}

module.exports = CrtShService
