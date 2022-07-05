const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_withdrawal = require("../validation/validate_withdrawal");
const Withdrawal_request = require("../model/withdrawal_request");
const { create_mail_options, transporter } = require("../mailer/withdrawal");
const create_withdrawal_transaction = require("../shape-model/create-withdrawal-transaction");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_withdrawal(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "invalid request, please login again to make a withdrawal",
      });

    if (parseInt(req.body.withdrawal_amount) > user.final_balance)
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund, please deposit more fund or cancel investment if  it exist to be able to withdraw fund",
      });
    user.set({
      final_balance: user.final_balance - parseInt(req.body.withdrawal_amount),
    });
    let currentdate = new Date();
    let datetime = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

    const withdrawal_request = await new Withdrawal_request({
      user: req.body.user,
      transaction_date: datetime,
      withdrawal_amount: req.body.withdrawal_amount,
      withdrawal_method: req.body.withdrawal_method,
      wallet: req.body.wallet,
    });
    create_withdrawal_transaction(req);
    await user.save();
    await withdrawal_request.save();
    transporter.sendMail(
      create_mail_options({
        first_name: user.first_name,
        last_name: user.last_name,
        reciever: user.email,
        amount: req.body.withdrawal_amount,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      }
    );

    res.status(200).json({
      error: false,
      message: "you successfully initiated a withdrawal",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
