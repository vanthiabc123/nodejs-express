const nodemailer = require("nodemailer");

const sendMail=async (data)=>{
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
            
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
          let info = await transporter.sendMail(data);
          return info;
    } catch (error) {
        console.log(error);
    }
}
module.exports=sendMail;