const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const sha256 = require("crypto-js/sha256");

const UserSchema=new Schema({
    firstName:{
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String
    },
    address:{
        type: String
    },
    email:{
        type: String
    },
    role:{
        type: String
    },
    resetPasswordToken: {
        type: String,
      },
      resetPasswordExpires: {
        type: Date,
        default: Date.now(),
      },
},
{
    timestamps:true,
}
);  
UserSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    if (!this.isModified('password')) return next();
    this.password=await  bcrypt.hash(this.password,salt) ;
    next()
});
UserSchema.methods={
    isValidPasword: async function (password) {
        try {
          return await bcrypt.compare(password, this.password);
        } catch (error) {
          throw error;
        }    
        },
        // gửi mail token
        createChangePasswordToken() {
            const key = "2wpowcczxcxznnmjdeaior@@@##";
            const passwordResetExpires = Date.now() + 5 * 60 * 1000;
            const passwordReset = sha256(
              this.email + key + passwordResetExpires
            ).toString();
            this.resetPasswordExpires = passwordResetExpires;
            this.resetPasswordToken = passwordReset;
            return {
              passwordReset,
              passwordResetExpires,
            };
          },
        };
module.exports = mongoose.model("Users", UserSchema);