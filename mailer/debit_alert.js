const nodemailer = require("nodemailer");

let debit_transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,

  auth: {
    user: "fleekinvest@gmail.com",
    pass: "ssodrgxkylvcbizy",
   
  },
});

let debit_create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: "fleekinvest@fleekinvest.com",
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever_mail,
    subject: `DEBIT ALERT`,
    //   text:"just wanna know if this works",
    html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Reciept</title>
</head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

*{
    
    box-sizing: border-box;
    font-family: "Poppins" , sans-serif;
  }
h3{
   font-weight: 900;
}
.reciept{
    color: #fff;  
}

.logo{
    background-color: #142c8e; 
    width: 100%;
   padding: 0px;
    color: #fff;
}
.hr{
    background-color: #142c8e;
    width: 100%;
    height: 1.2px;
}
p{
    font-size: 17.5px;
}
</style>
<body>
   

        </div>
    <main style="background-color:#fff;  box-shadow: 0 3px 15px rgb(0 0 0 / 10%); width: 75%; margin: auto; padding: 10px;">

       
        <div class="logo">
          <br>  <div style="margin: auto; text-align: center;" >       <h1 style=" text-align: center; font-size: 16px; color:#fff;background-color: #142c8e; ">ZION INTERCONTINENTAL BANK</h1></div>
         
           </div>
        
        <h1 style=" text-align: center; font-size: 15px; color:#142c8e;">DEBIT TRANSACTION RECEIPT</h1>
        <div class="hr">
            </div>

        <h3 style="font-size:13.5px">Transfer Refrence:Zion Intercontinental Bank Transfer</h3>
     
        <h1></h1>

        <div>
            <h5>Transaction Date: ${userInfo.datetime}</h5>
            <h5> Reference Number: ${userInfo.refrence_number}</h5>
            <h5>description:${userInfo.description}</h5>
            <h5>Status: <b style="color:green">${userInfo.status}</b></h5>
            <h5>Amount Transfered: ${userInfo.amount}</h5>
            <h4>Available Balance:${userInfo.balance}</h4>
            <h5 style="font-weight: 700; font-size: 20px; border: 0px solid  #142c8e; text-align: center;color: #142c8e;">Total Debit: ${userInfo.amount}</h5>
       
        </div>
<div class="hr"></div>
        
       
        <article>
          
    </div>

        <div class="logo">
 <h6 class="name"  style=" text-align: center; font-size: 16px; color:#fff;background-color: #142c8e; ">ZION INTERCONTNENTAL BANK</h6>
                  <p class="disclaimer" style="font-size: 12px; font-weight: bolder;">
      Disclaimer: this message was automatically generated via zion intercontinental bank secured channel,please do not reply to this message
      all correspondence should be addressed to zion intercontinental bank or
      your relationship officer
    </p>
               
    </main>
    </body>

</html>
`,
  });
};
module.exports = { debit_create_mail_options, debit_transporter };
