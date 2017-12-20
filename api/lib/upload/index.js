'use strict';

// modules
const co = require('co')
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

module.exports = function upload(name, streamData) {
  return new Promise(function(resolve, reject) {
    co(function*() {

      // client config
      const client = new S3({
        params: {
          Bucket: config.s3.bucket,
          Key: name
        },
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey
      })

      console.log(streamData, fs.readFileSync(streamData))

      // upload
      client.putObject({
        Body: fs.readFileSync(streamData)
      }, function(err, data) {
        if (err) {

          // error
          return reject(err)

        }

        // done
        return resolve(data)
      })

    })

  })

}