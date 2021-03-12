const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
const cors = require("cors");
const ip = require("ip");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { swaggerOptions, APP_URL, PORT } = require("./config");
const { routes } = require("./routes/index.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("src"));

app.get("/ping", (req, res) => res.json({ message: "pong!" }));

// API docs
const specs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
// console.log({ specs });

routes(app);

module.exports = { app };

if (process.env.TEST !== "true")
  app.listen(PORT, () =>
    console.log(
      `DotWallet example app listening at ${APP_URL}\nAPI docs available at ${APP_URL}/docs\n If running on docker, check http://localhost:${PORT} and http://localhost:${PORT}/docs `
    )
  );
