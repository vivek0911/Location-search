const mongoose = require('mongoose');
const constants = require('./constant');

module.exports = () => {
  const connect = () => {
    mongoose.connect(constants.db, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${constants.db}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${constants.db}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
