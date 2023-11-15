const express=require("express");
const router=express.Router();

const homeController=require("../controllers/homePageController");
const productController=require("../controllers/productPageController")
const fileUploader = require('../middleware/cloudinary');
const registerController=require('../controllers/registerController')
const loginController=require("../controllers/login")
const resetPassword=require("../controllers/resetpasswordController")
const initWebRoute=(app)=>{
router.get("/",homeController.getHomePage);
router.get("/create-new", homeController.getCreateUser);
router.post("/insert-user", homeController.createUser);
router.get("/edit-user/:id", homeController.getUpdateUser);
router.post("/update-user", homeController.updateUser);
router.post("/delete", homeController.deleteUser);
router.get("/category-page",homeController.getCategoryPage);
router.get("/create-caygory",homeController.getAddCategory);
router.post("/insert-category",homeController.createCategory);
router.post("/deleteCategory",homeController.deleteCategory);
router.get("/getUpdateCategory/:id",homeController.getUpdateCategory);
router.post("/updateCategory",homeController.updateCategory);
router.get("/product-page",productController.getPageProduct);
router.get("/create-product",productController.getAddProduct);
router.post("/insert-product",fileUploader.single('image'),productController.createProduct);
router.post("/delete-product",productController.deleteProduct);
router.get("/getUpdateProduct/:id",productController.getUpdateProduct)
router.post(
    "/update-product",
    fileUploader.single("image"),productController.updateProduct
  );
  router.get("/get-productUser",productController.getProducts)
  router.get("/product/:id", productController.getProductDetail);
router.get("/about",(req,res)=>{
    return res.render("home.ejs",{
        data:{page:"about",title:"about"}
    });
})

router.get("/category/:id", productController.getCategoryDetail);
router.get("/register",registerController.getPageRegister);
router.get("/login",loginController.getLoginPage);
router.post("/register-post",registerController.registerPage)
router.post("/login-page",loginController.login)
router.get("/logout",loginController.login)
router.get("/forget-password",registerController.getForgetPassword)
router.post("/sendEmail",registerController.forgotPassword)
router.get("/reset-password", resetPassword.showPage);
router.post("/reset-password", resetPassword.verifyPasswordToken);
router.post("/post-comment",productController.addComment)
return app.use("/",router);
}
module.exports=initWebRoute;