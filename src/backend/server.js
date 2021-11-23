"use strict";
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const db = require("./models/index");
const bodyParser = require("body-parser");
const itemRouter = require("./routes/item.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setTimeout(
  () =>
    db.sequelize
      .authenticate()
      .then(() => {
        console.log(`Authenticated`);
      })
      .catch((err) => console.log(`Error occurred `, err)),
  3000
);

const port = process.env.PORT || 4000;

app.use("/", itemRouter);

process.on("unhandledRejection", (err) => {
  console.log(err);
});

app.listen(port, () =>
  console.log(
    `Server is listening at ${port}`
  )
);