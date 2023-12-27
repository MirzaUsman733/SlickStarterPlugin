import mongoose from "mongoose";

const { Schema } = mongoose;

const ResponsesDataModel = new Schema(
  {
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
  },
  { versionKey: false },
);

export default mongoose.models.ResponsesDataModel || mongoose.model("ResponsesDataModel", ResponsesDataModel);
