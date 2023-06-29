const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

var db_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE
    : process.env.PRO_DATABASE;

mongoose
  .connect(db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`);
});

app.get("/api/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Hello from the server",
    message: "Server is running",
  });
});
