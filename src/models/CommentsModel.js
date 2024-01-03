import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentsDataUser = new Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      unique: false,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    product: {
       type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      require: true,
    },
    totalTokensUsed: {
      type: Number,
      default: 0,
    },
    currentTime: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default mongoose.models.CommentsDataUser || mongoose.model("CommentsDataUser", CommentsDataUser);
