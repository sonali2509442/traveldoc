
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator from "otp-generator";
import OTP from "../models/otpModels.js";
import transporter from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!name || !email || !password || !otp) {
      return res.json({ success: false, message: "All fields required" });
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.json({ success: false, message: "OTP not found" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    if (String(otpRecord.otp) !== String(otp)) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await OTP.deleteMany({ email });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Signup successful",
      user: { email: newUser.email, name: newUser.name },
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Login user : /api/user/login

export const login = async (req,res)=>{
try {
    const {email, password} = req.body;
    if(!email || !password){
           return res.json({success:false, message:"Email and password are required"});
    }  
           const user = await User.findOne({email});
       if(!user){
           return res.json({success:false, message:"Invalid email or password"});
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch) 
         return res.json({success:false, message:"not match"});
       
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,
        {expiresIn: "7d"});

       res.cookie('token', token, {
        httpOnly: true,
        secure: false, //use secure cookies in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
       }) 

       return res.json({success:true, user:{email:user.email, name:user.name}});
  

} catch (error) {
     console.log(error.message);
        res.json({success:false, message:error.message });
}
}
//check Auth: /api/user/is-auth

export const isAuth = async(req,res)=>{
try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password")

    return res.json({success:true, user});

} catch (error) {
    console.log(error.message);
        res.json({success:false, message:error.message });
}
}

//logout user: /api/user/logout

export const logout = async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          
        });
        return res.json({success:true, message:"User logged out"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message });
    }
}



export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email required" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: true,
    });

    await OTP.deleteMany({ email });
    await OTP.create({
      email,
      otp : String(otp),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    return res.json({ success: true, message: "OTP sent" });

  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error sending OTP" });
  }
};