import express from "express";
import { isAuth, login, logout, register,sendOtp } from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import User from "../models/User.js";


const userRouter = express.Router();

// existing routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', authUser, logout);
userRouter.post("/send-otp", sendOtp);

// ✅ GOOGLE LOGIN ROUTE
userRouter.post("/google-login", async (req, res) => {
  try {
    const { name, email, photo, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        photo,
        googleId,
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving user" });
  }
});





export default userRouter;