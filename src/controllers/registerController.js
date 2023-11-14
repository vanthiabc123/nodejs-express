const User=require("../models/user");
const sendMail=require("../helper/sendMails");

const getPageRegister=(req,res)=>{
return res.render("home.ejs",
{
    data:{page:"register",title:"đây là trang đăng kí người dùng"}
}
)}

const registerPage=async (req,res)=>{
const{firstName,userName,password,address,email}=req.body;
    try {
        const users=new User({
            firstName,
            userName,
            password,
            address,
            email
        })
        await users.save();
        return res.redirect("/login")
    } catch (error) {
        console.log(error)
    }
}
const getForgetPassword=(req,res)=>{
    return res.render("home.ejs",{
        data:{page:"forgetpassword",title:"đây là trang quên mật khẩu"}
    })
}

const forgotPassword=async(req,res)=>{
    try{
    const {email}=req.body;
    const user =await User.findOne({email:email});
    if (!user) return res.redirect("/forget-password");
    const { passwordReset } = user.createChangePasswordToken();
    await user.save();
    const mailOptions = {
      from: {
        name: "Todo App",
        address: "Todoapp@gmail.com",
      }, // sender address
      to: user.email, // list of receivers
      subject: "Khôi phục mật khẩu", // Subject line
      html: `Bạn có thể đặt lại mật khẩu bằng liên kết sau:
       <a href="http://localhost:5001/reset-password?token=${passwordReset}">Link reset mật khẩu</a>`, // html body

    };
    sendMail(mailOptions);
    return res.redirect("/login")
  } catch (error) {
   console.log(error)
  }
}

module.exports={
    getPageRegister,
    registerPage,
    getForgetPassword,
    forgotPassword
};