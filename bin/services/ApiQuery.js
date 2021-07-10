class ApiQuery {
  constructor(serviceName) {
    this.serviceName = serviceName
  }

  initializationMessage() {
    console.log(`Searching at ${this.serviceName} ...\n`)
  }
}

module.exports = ApiQuery
