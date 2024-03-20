const mongoose = require('mongoose');

const connect_mongodb_datasource = async () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => console.log(`MongoDB Connected: ` + `${conn.connection.host}`.cyan))
    .catch((err) => console.error(`Error: ${err.message}`.red));
};

module.exports = connect_mongodb_datasource;
