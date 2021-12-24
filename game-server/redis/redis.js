const redisConfig = require("../config/redis")
var redis = require('redis');
const { inspect } = require("util");

(async () => {
  const client = redis.createClient({
    host: redisConfig.host,
    port: redisConfig.port,
    database: redisConfig.db,
  });

  client.on('error', (err) => console.error('Redis Client Error', inspect(err)));

  await client.connect();

  //await client.set('key', 'value');
  //const value = await client.get('key');
})();

/**
 * 用 key 取得值的內容
 * @param {*} key 
 * @returns 
 */
 async function getValue(key) {
  var value = await client.get(key, redis.print)
  console.warn(value);
  return value
}

module.exports = {
  getValue,
}
