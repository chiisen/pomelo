const logger = require("pomelo-logger").getLogger("pomelo", __filename)
const redisConfig = require("../config/redis")
const redis = require("redis")
const { inspect } = require("util")
const short = require("short-uuid")

module.exports = {
  getValue,
  setValue,
  SetMap,
  SetArray,
}

const uuid = short.generate()

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  database: redisConfig.db,
})

client.on("error", (err) => logger.error(uuid + " Redis Client Error", inspect(err)))
;(async () => {
  await client.connect()
})()

/**
 * 用 key 取得值的內容
 * @param {*} key
 * @returns
 */
async function getValue(key) {
  if (await client.exists(key)) {
    return await client.get(key)
  } else {
    return null
  }
}

/**
 * 用 key 寫入值的內容
 * @param {*} key
 * @param {*} value
 * @returns
 */
async function setValue(key, value) {
  return await client.set(key, value)
}

async function SetMap(key, value) {
  if (!(value instanceof Map)) {
    logger.error("value is not Map")
    return
  }
  const obj = Object.fromEntries(value)
  const mppToString = JSON.stringify(obj)
  return await client.set(key, mppToString)
}

async function SetArray(key, value) {
  if (!(value instanceof Array)) {
    logger.error("value is not Array")
    return
  }
  const arrayToString = JSON.stringify(Object.assign({}, value))
  return await client.set(key, arrayToString)
}
