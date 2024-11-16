const express = require("express");
const apiRouter = require("./routes/apiRoute");

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
