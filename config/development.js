module.exports = {
  _extends: 'default',
  server: {
    port: process.env.PORT || 80
  },
  datasources: {
    mongo: {
      url: `${process.env.MONGODB_URI}?force_ssl=true`
    },
    redis: {
      url: `${process.env.REDIS_URL}`,
      prefix: 'artizCache'
    }
  }
}