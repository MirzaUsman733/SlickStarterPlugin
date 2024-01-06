import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false, // Default to unapproved
    },
  },
  {
    versionKey: false,
    timestamps: true, // Combine options into a single object
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
