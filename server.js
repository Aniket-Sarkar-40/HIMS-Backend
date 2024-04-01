const app = require("./app");

const connectDatabase = require("./config/database");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shuting Down the server due to Uncaught Exception Error");

  process.exit(1);
});

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//*Unhandled Promise Rejection  ---> basically for connection error of mongodb
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shuting Down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
