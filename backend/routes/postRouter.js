import fs from "fs";
import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import User from "../models/User.js";
import authUser from "../middlewares/authUser.js";

const postRouter = express.Router();
// STORAGE FIRST ✅
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

// THEN MULTER ✅
const upload = multer({ storage });

// const upload = multer({ storage }).any();


// =====================================
// ✅ CREATE POST
// =====================================
postRouter.post(
  "/",
  authUser,
upload.any(),
  async (req, res) => {
    try {
      const {
        title,
        youtubeLink,
        budget,
        story,
        foodExpense,
  travelExpense,
  stayExpense,
        
        location,
        rating,
      } = req.body;

      const user = await User.findById(req.userId);

      if (!user) {
  return res.status(401).json({
    success: false,
    message: "User not found / Not logged in",
  });
}

     const galleryImages = req.files
  .filter(file => file.fieldname === "galleryImages")
  .map(file => file.path);

const shortVideos = req.files
  .filter(file => file.fieldname === "shortVideos")
  .map(file => file.path);

const memoryImage = req.files
  .filter(file => file.fieldname === "memoryImage")
  .map(file => file.path);

// const foodImage =
//   req.files?.foodImage?.map(f => f.path) || []
// ;
let foodItems = [];

try {
  foodItems = req.body.foodItems
    ? JSON.parse(req.body.foodItems)
    : [];
} catch (err) {
  foodItems = [];
}

// ✅ SIMPLE FIX: take all food images together
const foodImages = req.files.filter(
  (file) => file.fieldname === "foodImages"
);

let imgIndex = 0;

foodItems = foodItems.map((item) => {
  const images = [];

  // assign 1 image per item (simple logic)
  if (foodImages[imgIndex]) {
    images.push(foodImages[imgIndex].path);
    imgIndex++;
  }

  return {
    ...item,
    images,
  };
});

      const newPost = new Post({
        title,
        userName: user.name,
        userId: req.userId,
        youtubeLink: youtubeLink
  ? JSON.parse(youtubeLink)
  : [],
        budget,
        story,
        
        location,
        galleryImages,
        memoryImage,
        foodExpense,
travelExpense,
stayExpense,
        
        shortVideos,
        foodItems,
        


      });

      await newPost.save();

      res.json({ success: true, data: newPost });
    } catch (err) {
  console.log("CREATE POST ERROR:", err.message); // ⭐ add this

  res.status(500).json({
    success: false,
    message: err.message, // ⭐ show real error
  });
}
  }
);


// =====================================
// ✅ GET ALL POSTS
// =====================================
// postRouter.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: posts,
//     });

//   } catch (err) {
//     console.log("GET POSTS ERROR:", err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

postRouter.get("/", async (req, res) => {
  try {
    const { location, minBudget, maxBudget, rating } = req.query;

    let filter = {};

    // 📍 location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // ⭐ rating
    if (rating) {
      filter.averageRating = { $gte: Number(rating) };
    }

    // 🔥 FETCH FIRST
    let posts = await Post.find(filter).sort({ createdAt: -1 });

    // 💰 MANUAL budget filter (FIX)
    if (minBudget || maxBudget) {
      posts = posts.filter((post) => {
        const budget = Number(post.budget) || 0;

        if (minBudget && budget < Number(minBudget)) return false;
        if (maxBudget && budget > Number(maxBudget)) return false;

        return true;
      });
    }

    res.json({
      success: true,
      data: posts,
    });

  } catch (err) {
    console.log("GET POSTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// =====================================
// ✅ GET SINGLE POST
// =====================================
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// =====================================
// ✅ UPDATE POST (ONLY OWNER)
// =====================================
postRouter.put("/:id", authUser, upload.any(), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not Authorized" });
    }

    const {
      title,
      youtubeLink,
      budget,
      story,
      location,
      foodExpense,
      travelExpense,
      stayExpense,
    } = req.body;

    // ✅ basic fields
    post.title = title || post.title;
    post.youtubeLink = youtubeLink ? JSON.parse(youtubeLink) : post.youtubeLink;
    post.budget = budget || post.budget;
    post.story = story || post.story;
    post.location = location || post.location;

    post.foodExpense = foodExpense || post.foodExpense;
    post.travelExpense = travelExpense || post.travelExpense;
    post.stayExpense = stayExpense || post.stayExpense;

    // =========================
    // ✅ GALLERY FIX
    // =========================
    const existingGallery = JSON.parse(req.body.existingGalleryImages || "[]");

    const newGallery = req.files
      .filter((f) => f.fieldname === "galleryImages")
      .map((f) => f.path);

    post.galleryImages = [...existingGallery, ...newGallery];

    // =========================
    // ✅ SHORT VIDEOS FIX
    // =========================
    const existingShortVideos = JSON.parse(req.body.existingShortVideos || "[]");

    const newShortVideos = req.files
      .filter((f) => f.fieldname === "shortVideos")
      .map((f) => f.path);

    post.shortVideos = [...existingShortVideos, ...newShortVideos];

    // =========================
    // ✅ MEMORY FIX
    // =========================
    const existingMemoryImages = JSON.parse(req.body.existingMemoryImages || "[]");

    const newMemoryImages = req.files
      .filter((f) => f.fieldname === "memoryImage")
      .map((f) => f.path);

    post.memoryImage = [...existingMemoryImages, ...newMemoryImages];

    // =========================
    // ✅ FOOD ITEMS FINAL FIX
    // =========================
    let foodItems = [];

    try {
      foodItems = req.body.foodItems ? JSON.parse(req.body.foodItems) : [];
    } catch {
      foodItems = [];
    }

    const foodImages = req.files.filter(
      (f) => f.fieldname === "foodImages"
    );

    let imgIndex = 0;

    post.foodItems = foodItems.map((item) => {
      const images = [];

      if (foodImages[imgIndex]) {
        images.push(foodImages[imgIndex].path);
        imgIndex++;
      }

      return {
        ...item,
        images: images.length ? images : item.images || [],
      };
    });

    await post.save();

    res.json({
      success: true,
      message: "Updated successfully",
      data: post,
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// =====================================
// ✅ DELETE POST (ONLY OWNER)
// =====================================
postRouter.delete("/:id", authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 🔐 ONLY OWNER CAN DELETE
    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }

    post.galleryImages?.forEach((file) => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    });

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

 
});
postRouter.post("/:id/rate", authUser, async (req, res) => {
  try {
    const { value } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false });
    }

    // ❌ BLOCK OWNER FROM RATING
    if (post.userId.toString() === req.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot rate your own post",
      });
    }

    // remove old rating if exists (1 user = 1 rating)
    post.ratings = post.ratings.filter(
      (r) => r.userId.toString() !== req.userId
    );

    // add new rating
    post.ratings.push({
      userId: req.userId,
      value,
    });

    // calculate average
    const total = post.ratings.reduce((sum, r) => sum + r.value, 0);
    post.averageRating =
      post.ratings.length > 0 ? total / post.ratings.length : 0;

    await post.save();

    res.json({
      success: true,
      averageRating: post.averageRating,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


// =====================================
// ✅ SAVE / UNSAVE POST
// =====================================
postRouter.post("/:id/save", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const postId = req.params.id;

    if (!user) {
      return res.json({ success: false });
    }

    const alreadySaved = user.savedTrips.includes(postId);

    if (alreadySaved) {
      user.savedTrips = user.savedTrips.filter(
        (id) => id.toString() !== postId
      );
    } else {
      user.savedTrips.push(postId);
    }

    await user.save();

    res.json({
      success: true,
      saved: !alreadySaved,
    });

  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

// =====================================
// ✅ GET SAVED POSTS
// =====================================
postRouter.get("/saved/my", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("savedTrips");

    res.json({
      success: true,
      data: user.savedTrips,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});


export default postRouter;
