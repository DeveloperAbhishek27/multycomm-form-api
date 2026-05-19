const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });
