module.exports = {
  _extends: 'default',
  server: {
    port: process.env.PORT || 80
  },
  auth: {
    username: `${process.env.ARTIZ_AUTH_USERNAME}`,
    password: `${process.env.ARTIZ_AUTH_PASSWORD}`,
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