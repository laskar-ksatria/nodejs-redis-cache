const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is our schema file for the mongodb

let AccountSchema = new Schema({
  ETH: {
    type: String,
    max: 64
  },
  key: {
    type: Map,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Export the model

const account = mongoose.model("Account", AccountSchema);

module.exports = account;
