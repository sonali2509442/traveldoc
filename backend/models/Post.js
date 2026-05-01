import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    youtubeLink: {
      type: [String],
      default: [],
    },

    budget: Number,
    foodExpense: String,
    travelExpense: String,
    stayExpense: String,
    story: String,

    foodItems: [
      {
        name: String,
        location: String,
        price: String,
        rating: Number,
        images: [String],
      },
    ],

    galleryImages: {
      type: [String],
      default: [],
    },

    shortVideos: {
      type: [String],
      default: [],
    },



    memoryImage: {
      type: [String],
      default: [],
    },

    location: String,

    // ⭐ advanced rating system
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        value: Number,
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);