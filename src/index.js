const express = require("express");
const app = express();
const dotenv=require("dotenv");
dotenv.config();
const port = process.env.PORT||5000;
const configViewEngine=require("./configs/viewEngine");
const initWebRoute=require("./routers/initWebRoute")
var session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Category=require("./models/category")
const getCategory=async(req,res,next)=>{
  const category=await Category.find({});
  res.locals.category=category;
  next();
}

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
const getUser = async (req, res, next) => {
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};
app.use(getUser);

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "learnnodejs",
    });
  } catch (error) {
    console.log(error);
  }
};
conectDB();
mongoose.connection.once("open", () => {
  console.log("kết nối database moongo thành công");
});
app.use(getCategory);
configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
  console.log(`Server running on port:${port}`)
  })