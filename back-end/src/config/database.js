const mongoose = require('mongoose');

const connection = async (uri) => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Server connected to mongodb')
    } catch (err) {
      console.error(
        `An error occurred while trying to connect to database: ${err}`
      )
    }
  }


  module.exports = connection;