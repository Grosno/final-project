import serverConfig from "./config/serverConfig.js";
import app from "./src/app.js";

app.listen(
  serverConfig.port,
  serverConfig.host,
  () => console.log(`Server started at ${serverConfig.host}:${serverConfig.port}`)
)
