module.exports = {
  server: {
    domain: 'localhost',
    port: 3000
  },
  auth: {
    username: 'admin',
    password: 'admin'
  },
  datasources: {
    mongo: {
      url: 'mongodb://localhost/db1'
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
      },
      "subscribe": {
        bind: "/subscriptions",
        versions: ["v1"]
      }
    }
  }
}