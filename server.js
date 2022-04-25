const app = require("./app");

const _dbConn = require("./config/database");

_dbConn.mongoConnect();

process.on("uncaughtException", (err) => {
  console.error(`ERROR: ${err.message}. ${err.name}.`);
  console.info("Shutting down due to uncaught exception.");

  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.info(
    `${process.env.NODE_ENV} server started and running on Port ${process.env.PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.error(`ERROR: ${err.message}. ${err.name}`);
  console.info("Shutting down the server due to Unhandled Promise Rejection.");

  server.close(() => {
    process.exit(1);
  });
});
