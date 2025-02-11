import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image_url"],
      required: true,
    },
    text: {
      type: String,
    },
    image_url: {
      url: {
        type: String,
      },
    },
  },
  { _id: false }
);

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    content: {
      type: [contentSchema], // Array of content objects
      required: true,
    },
  },
  { _id: false }
);

const chatHistorySchema = new mongoose.Schema(
  {
    userIP: {
      type: String,
      required: true,
    },
    messages: {
      type: [messageSchema], // Array of messages
      required: true,
    },
  },
  { timestamps: true }
);

const ChatHistory =
  mongoose.models.ChatHistory ||
  mongoose.model("ChatHistory", chatHistorySchema);

export default ChatHistory;
