import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //ambil data dari body
    const { name, email, password, phone, role } = req.body;

    // cek field yang diisi required semua
    if (!name || !email || !password || !phone) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    // cek email nya sudah ada/belum
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const err = new Error("Email already registered");
      err.statusCode = 400;
      throw err;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // simpan user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role ? role : "customer",
    });

    res.status(201).json({
      message: "Register success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) =>{
 try {
  const {email, password} = req.body
  
  if(!email || !password){
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({email}).select("+password")

  if(!user){
    const err = new Error("Invalid email or password");
    err.statusCode = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    const err = new Error("Invalid email or password");
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign(
    {
      userId : user._id, 
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );

  return res.status(200).json({
    message: "Login Success",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    }
  });

 } catch (error) {
  next(error)
 }
}
