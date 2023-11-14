const Users = require("../models/user");

const showPage = async (req, res, next) => {
  const { token } = req.query;
  res.render("home.ejs", {
    data: { page: "resetPassword", title: "Trang đặt lại mật khẩu", token },
  });
};
const verifyPasswordToken = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    (user.password = password),
      (user.resetPasswordToken = undefined),
      (user.resetPasswordExpires = undefined);
    await user.save();
    return res.render("home.ejs", {
      data: {
        page: "resetPassword",
        title: "Trang đăng nhập",
        message: "Đặt lại mật khẩu thành công",
      },
    });
  } catch (error) {
    res.render("home.ejs", {
      data: {
        page: "resetPassword",
        title: "Trang đăng nhập",
        error: error.message,
      },
    });
  }
};
module.exports = {
  showPage,
  verifyPasswordToken,
};