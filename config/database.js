const mongoose = require("mongoose");

// const url = `mongodb+srv://winnersclubadmin:MUD8ihSAaKLL6vp1@cluster0.pu6z4ms.mongodb.net/winnersclub?retryWrites=true&w=majority`;
const ConnectDataBase = () => {
  mongoose.set("strictQuery", false);
  // mongoose.set("useFindAndModify", false);
  mongoose.connect(process.env.URL).then((data) => {
    console.log(`MongoDb connected with server : ${data.connection.host}`);
  });
  // .catch((err) => {
  //   console.log(err);
  // });
};

module.exports = ConnectDataBase;
