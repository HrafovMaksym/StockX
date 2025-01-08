import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
    passwordResetAttempts: {
      type: Number,
    },
    newPasswordExpires: {
      type: String,
    },

    isPurchased: {
      type: Array,
      default: [],
    },

    shoeSize: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: {
      type: Boolean,
    },
  }
);

export default mongoose.model("User", UserSchema, "StockX");
