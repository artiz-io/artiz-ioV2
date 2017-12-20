module.exports = {
  server: {
    domain: 'localhost',
    port: 3000
  },
  datasources: {
    mongo: {
      url: '***REMOVED***'
    },
    redis: {
      url: 'redis://localhost',
      prefix: 'artizCache'
    }
  },
  routes: {
    versions: {
      default: "v1",
      enabled: [
        "v1"
      ]
    },
    bindings: {
      "info": {
        bind: "/",
        versions: ["v1"]
      }
    }
  }
}