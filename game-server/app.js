const pomelo = require("pomelo")
const logger = require("pomelo-logger").getLogger("pomelo", __filename)
const redis = require("./redis/redis")
const sqlite = require("./sqlite/sqlite")
const short = require("short-uuid")

const uuid = short.generate()

;(async () => {
  let runCount = await redis.getValue("RunCount")
  if (!runCount) {
    runCount = 1
    await redis.setValue("RunCount", runCount)
  } else {
    const parsed = parseInt(runCount)
    if (isNaN(runCount)) {
      runCount = 1
    } else {
      runCount = parsed
    }
  }
  logger.info(uuid + ` 第${runCount}次程式執行!!!`)
  await redis.setValue("RunCount", ++runCount)
})()

/**
 * Init app for client.
 */
var app = pomelo.createApp()
app.set("name", "pomelo")

// app configuration
app.configure("production|development", "connector", function () {
  app.set("connectorConfig", {
    connector: pomelo.connectors.hybridconnector,
    heartbeat: 3,
    useDict: true,
    useProtobuf: true,
  })
})

// start app
app.start()

process.on("uncaughtException", function (err) {
  console.error(" Caught exception: " + err.stack)
})
