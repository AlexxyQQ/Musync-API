const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`app is running on http://localhost:${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
