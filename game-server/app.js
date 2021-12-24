const pomelo = require("pomelo");
const redis = require("./redis/redis");

(async () => {
  const value = await redis.getValue("FUNKY_GAME_CODE")
  console.warn("getValue() : " + value)
})();

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
