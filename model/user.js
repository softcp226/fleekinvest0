const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to user database");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  first_name: String,
  last_name: String,
  passport: String,
  password: String,
  final_balance: {
    type: Number,
    default: 0,
  },
  profit_loss: {
    type: Number,
    default: 0,
  },
  active_investment: {
    type: Number,
    default: 0,
  },
  referral_bonus: {
    type: Number,
    default: 0,
  },
  madeFirstDeposit:{
type:Boolean,
required:true,
default:false
  },
  referral_link: String,
  referral: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
