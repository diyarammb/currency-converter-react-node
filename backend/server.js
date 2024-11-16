const express = require("express");
const apiRouter = require("./routes/apiRoute");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
