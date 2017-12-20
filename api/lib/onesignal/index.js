'use strict'

/**
 * One Signal API
 * Forked from Mohammad Fares <faressoft.com@gmail.com>
 * Adapted by Jesse Degger <jesse@socialsquad.nl>
 */

// modules
const request = require('request-promise-native')
const co = require('co')

// instance
let apiInstance

/**
 * One Signal Client
 *
 * @param  {String}  appId   OneSignal App ID
 * @param  {String}  apiKey  REST API Key
 */
function OneSignal(appId, apiKey) {

  /**
   * The api key of Signal One
   * @type {String}
   */
  const API_KEY = apiKey

  /**
   * The app id of Signal One
   * @type {String}
   */
  const APP_ID = appId

  /**
   * The base headers for all requests
   * @type {Object}
   */
  const BASE_HEADERS = {
    authorization: 'Basic ' + API_KEY,
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8'
  }

  // selffix
  let self = this

  /**
   * Create and send a notification
   * 
   * @return {Promise}
   */
  this.sendNotification = function(options) {
    return new Promise(function(resolve, reject) {
      co(function*() {

        // tags
        let tags = []
        for (let i = 0; i < options.configurationIds.length; i++) {

          // only add or if this is not the first item
          if (i > 0) {

            // add or operator
            tags.push({
              "operator": "OR"
            })

          }

          // add tag
          tags.push({
            "field": "tag",
            "key": `config_${options.configurationIds[i]}`,
            "relation": "exists"
          })

        }

        // init body
        let body = {
          app_id: APP_ID,
          tags: tags,
        }

        // check if dummy
        if (options.dummy === true) {

          // send in an hour, but we cancel the notification before that
          body.send_after = new Date(new Date().getTime() + (1000 * 60 * 60)).toString()

          // body
          body.contents = {
            en: "Dummy notification"
          }

        } else {

          // headings
          body.headings = {
            en: options.title
          }

          // contents
          body.contents = {
            en: options.description
          }

          // set link
          if (options.link) {

            body.url = options.link

          }

        }

        // options
        const reqOptions = {
          method: 'POST',
          url: 'https://onesignal.com/api/v1/notifications',
          headers: BASE_HEADERS,
          body: JSON.stringify(body)
        }

        // go
        const response = yield request(reqOptions)

        // try and parse the result
        let result
        try {

          // done
          result = JSON.parse(response)

        } catch (e) {

          // catch json parse errors
          reject(e)

        }

        // check dummy
        if (options.dummy === true && result.recipients > 0 && typeof result.error === 'undefined') {

          yield self.cancelNotification(result.id)

        }

        return resolve({
          recipients: result.recipients
        })

      }).then(null, reject)
    })
  }

  /**
   * Cancels a notification
   * 
   * @return {Promise}
   */
  this.cancelNotification = function(id) {
    return new Promise(function(resolve, reject) {
      co(function*() {

        // options
        const reqOptions = {
          method: 'DELETE',
          url: `https://onesignal.com/api/v1/notifications/${id}?app_id=${APP_ID}`,
          headers: BASE_HEADERS
        }

        // go
        const response = yield request(reqOptions)

        // try and parse the result
        try {

          // done
          resolve(JSON.parse(response))

        } catch (e) {

          // catch json parse errors
          reject(e)

        }

      }).then(null, reject)
    })
  }

}

////////////////////////////////////////////////////
// Module //////////////////////////////////////////
////////////////////////////////////////////////////

/**
 * Create a new client
 * 
 * @param  {String}  appId   OneSignal App ID
 * @param  {String}  apiKey  REST API Key
 * @return {Object}          new instance of one signal client wrapper
 */
module.exports = function() {

  // create the instance
  apiInstance = new OneSignal(config.onesignal.appId, config.onesignal.apiKey)

  // return
  return {
    sendNotification: apiInstance.sendNotification
  }

}