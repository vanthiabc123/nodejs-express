const Products=require("../models/product");
const Categoris=require("../models/category")
const getPageProduct=async(req,res)=>{
    const products=await Products.find({})
  return  res.render("home.ejs",{
        data:{page:"productMain",title:"đây là trang productadmin",products}
    })
}
const getAddProduct=async(req,res)=>{
    const category=await Categoris.find({})
    return res.render("home.ejs",{
        data:{page:"addProduct",title:"đây là trang thêm sản phẩm",category}
    })
}
const createProduct=async(req,res)=>{
    const {title,description,price,feature,category}=req.body;
    const image=req.file.path;
    const product=new Products({
        title,
        description,
        price,
        feature,
        image,
        category
    })
    try{
    await product.save();
    return res.redirect("/product-page")
    }catch(error){
        console.log(error);
    }
}
const deleteProduct=async(req,res)=>{
    const {id}=req.body;
    try{
        await Products.findByIdAndDelete(id);
        return res.redirect("/product-page");
    }catch(error){
        console.log(error)
    }
}
const getUpdateProduct=async(req,res)=>{
    const {id}=req.params;
    const product=await Products.findById(id);
    return res.render("home.ejs",{
        data:{page:"editProduct",title:"đây là trang cập nhật sản phẩm",product}
    })
}
const updateProduct=async(req,res)=>{
    const {
    id,
    title,
    description,
    price,
    feature,
    }=req.body;
    const product=await Products.findById(id);
    const image=req.file?.path|| product.image;
    try {
        await Products.findByIdAndUpdate(id,{
            title,
            description,
            price,
            feature,
            image
        })
        return res.redirect('/product-page');
    } catch (error) {
        console.log(error);
    }
}
const getProducts = async (req, res) => {
    const products = await Products.find({});
    return res.render("home.ejs", {
      data: { page: "cardProduct", title: "Trang danh sach san pham", products },
    });
  };
  const getProductDetail = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id);
    return res.render("home.ejs", {
      data: { page: "productDetail", title: "Trang chi tiet san pham", product },
    });
  };

  

  const getCategoryDetail=async (req,res)=>{
    const {id}=req.params;
    const product=await Products.find({category:id});
    return res.render("home.ejs",{
        data:{page:"productCategory",title:"đây là rang danh mục sản phẩm",product}
    })
  }
module.exports={
    getPageProduct,
    getAddProduct,
    createProduct,
    deleteProduct,
    getUpdateProduct,
    updateProduct,
    getProducts,
    getProductDetail,
    getCategoryDetail
};
