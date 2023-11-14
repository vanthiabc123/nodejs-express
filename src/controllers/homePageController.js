const Users=require("../models/user")
const Categoris=require("../models/category")
const getHomePage= async (req,res)=>{
    const users=await Users.find({})
    return res.render("home.ejs",{
        data:{page:"main",title:"trang chu",users},
    });
}
const getCreateUser = (req, res) => {
    return res.render("home.ejs", {
      data: { page: "createNewUser", title: "Trang tao nguoi dung" },
    });
  };
  
  const createUser = async (req, res) => {
    console.log(req.body);
    const { firstName, userName, email, password, role, address } = req.body;
    try {
      const user = new Users({
        firstName,
        userName,
        email,
        password,
        role,
        address,
      });
      await user.save();
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUpdateUser= async(req,res)=>{
    const { id } = req.params;
    const user = await Users.findById(id);
    return res.render("home.ejs",{
      data:{page:"editUser",title:"trang sửa",user}
    })
  }
  const updateUser = async (req, res) => {
    const { id, firstName, userName, email, password, role, address } = req.body;
    try {
      await Users.findByIdAndUpdate(id, {
        firstName,
        userName,
        email,
        password,
        role,
        address,
      });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
      await Users.findByIdAndDelete(id);
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
const getCategoryPage= async (req,res)=>{
  const categorys=await Categoris.find({});
return res.render("home.ejs",{
  data:{page:"categoryMain",title:"đây là trang danh mục",categorys}
})
}
const getAddCategory= async(req,res)=>{
  return res.render("home.ejs",{
    data:{page:"addCategory",title:"đây là trang add danh mục"}
  })
}
const createCategory= async(req,res)=>{
const {name,slug}=req.body;
const category=new Categoris({
  name,
  slug
})
try {
  await category.save()
  return res.redirect("/category-page");
} catch (error) {
  console.log(error)
}
}
const deleteCategory=async(req,res)=>{
const {id}=req.body;
try {
  await Categoris.findByIdAndDelete(id);
  return res.redirect('/category-page');
} catch (error) {
  console.log(error)
}
}
const getUpdateCategory=async(req,res)=>{
const {id}=req.params;
const category=await Categoris.findById(id);
console.log(category)
return res.render("home.ejs",{
  data:{page:'editCategory',title:"đây là trang sửa",category}
})
}
const updateCategory=async(req,res)=>{
const {id,name,slug}=req.body
try {
  await Categoris.findByIdAndUpdate(id,{
    name,
    slug
  });
  return res.redirect("/category-page")
} catch (error) {
  console.log(error)
}

}
module.exports={
    getHomePage,
    getCreateUser,
    createUser,
    getUpdateUser,
    updateUser,
    deleteUser,
    getCategoryPage,
    getAddCategory,
    createCategory,
    deleteCategory,
    getUpdateCategory,
    updateCategory
}