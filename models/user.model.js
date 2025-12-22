const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [3, "name must br at least 3 ch"],
      maxlength: [100, "name must be less 100 ch"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    age: {
      type: Number,
      min: [1, "age must be at least 1 num"],
      max: [100, "age must be less 100"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    confirmpassword: {
      type: String,
      required: [true, "confirm password must"],
      select: false,
    },
    emailConfirmed: {
     type: Boolean,
      default: false 
    }
  },
  { timestamps: true }
);

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password !== this.confirmpassword) {
    return next(new Error("password and confirmpassword do not match"));
  }
  this.password = await bcrypt.hash(this.password, 8);
  this.confirmpassword=undefined;
  next();
});

module.exports = mongoose.model("User", userschema);