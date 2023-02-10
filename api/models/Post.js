import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 50,
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
      enum: ["health", "music", "history", "entertainment", "self-development"],
      default: "health",
    },
    body: {
      type: String,
      required: [true, "Please provide body"],
      minlength: 10,
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
