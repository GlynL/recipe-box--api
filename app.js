require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const recipes = require("./routes/recipes");
const users = require("./routes/users");

// {
//   contentSecurityPolicy: {
//     defaultSrc: ["'self'"]
//   }
// }
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.set("debug", true);
mongoose.connect(process.env.DB || "mongodb://localhost/recipes");
mongoose.Promise = Promise;

app.use("/api/recipes", recipes);

app.use("/api/users", users);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
