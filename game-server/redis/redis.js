const logger = require("pomelo-logger").getLogger("pomelo", __filename)
const redisConfig = require("../config/redis")
const redis = require("redis")
const { inspect } = require("util")

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  database: redisConfig.db,
})

client.on("error", (err) => logger.error("Redis Client Error", inspect(err)))
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

module.exports = {
  getValue,
  setValue,
}
