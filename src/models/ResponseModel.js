import mongoose from "mongoose";

const { Schema } = mongoose;

const ResponsesDataModel = new Schema(
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
    prompt: {
      type: String,
      required: true,
    },
    selectedTitle: {
      type: String,
      required: true,
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

export default mongoose.models.ResponsesDataModel || mongoose.model("ResponsesDataModel", ResponsesDataModel);
