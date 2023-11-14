const Users=require("../models/user")
const getLoginPage=(req,res)=>{
    return res.render("home.ejs",{
        data:{page:"login",title:"đây là trang đăng nhập"}
    })
}
const login=async (req,res)=>{
const{email,password}=req.body;
try {
    const user=await Users.findOne({email});
    if(user){
        const isValid=user.isValidPasword(password);
      if(isValid){
        req.session.user=user;
        return res.redirect("/");
      }
} else {
  return res.redirect("/login");
}
} catch (error) {   
console.log(error);    
}
}
const logout=(req,res)=>{
    req.session.destroy();
    return res.redirect("/");
}
module.exports={getLoginPage,login,logout};