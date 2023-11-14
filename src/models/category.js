const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create the schema for a category
let CategorySchema = new Schema({
    name:{
        type: String,
    },
    slug:{
        type:String,
    },
},
{
    timestamps: true
},
)
module.exports= mongoose.model("Categoris", CategorySchema);
