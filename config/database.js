const mongoose = require("mongoose");

const mongoConnect = () => {
  if (process.env.NODE_ENV == "Development") {
    mongoose
      .connect(`${process.env.LOCAL_DB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((client) => {
        console.log(
          `Connected to ${client.connection.name} DB, to HOST ${client.connection.host}`
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } else if (process.env.NODE_ENV == "Production") {
    mongoose
      .connect(`${process.env.DB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((client) => {
        console.log(
          `Connected to ${client.connection.name} DB, to HOST ${client.connection.host}`
        );
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } else {
    return console.log("Undefined Application environment.");
  }
};

exports.mongoConnect = mongoConnect;
