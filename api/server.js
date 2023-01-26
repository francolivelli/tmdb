// Configuración del server

const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const db = require("./config/db");
const envs = require("./config/envs");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use("/api", routes);
app.use("/api", (req, res) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    app.listen(envs.PORT, () =>
      console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
    );
  })
  .catch(console.error);
