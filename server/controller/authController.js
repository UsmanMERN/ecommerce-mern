import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { userModel } from "../models/users.js";
import JWT from "jsonwebtoken";
import handleError from "../utils/handleError.js";
import { orderModel } from "../models/orderModel.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, phone, address, answer } = req.body;
    // validation
    if (!email || !password || !name || !phone || !address) {
      return res.send({ message: `please fill inputs carefully` });
    }
    // check if email is already in use
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user already exist",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      answer,
      password: hashedPassword,
    }).save();
    // const savedUser = await user.save();
    // console.log(savedUser);
    res.status(200).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error while signUp user");
  }
};

// LOGIN POST
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "user not found Login First",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({
        success: false,
        message: "Invalid Password or Email",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error while login user");
  }
};

// test controller

export const testController = (req, res) => {
  res.status(200).send({
    success: true,
    message: "test success",
  });
};

// RESET PASSWORD
export const forgetPassword = async (req, res, next) => {
  try {
    const { email, answer, newPassword } = req.body;
    // validation
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email Required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "answer Required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "newPassword Required",
      });
    }
    // check if email is valid
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or answer",
      });
    }
    // if email is valid
    // encrypt new password
    const hashedPassword = await hashPassword(newPassword);
    // update user password
    const updatedUser = await userModel.findOneAndUpdate(user._id, {
      password: hashedPassword,
    });
    if (!updatedUser) {
      return res.status(400).send({
        success: false,
        message: "Error updating user",
      });
    } else {
      return res.send({
        success: true,
        message: "Password Changed Successfully",
      });
    }
  } catch (error) {
    return handleError(res, 500, "Server Error while updating password");
  }
};

// update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    // console.log(name + email + address + phone);
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({ error: "password is require and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      updateUser,
      msg: "profile Updated successfully!",
      success: true,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error while updating profile");
  }
};

// orders
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("product", "-photo")
      .populate("buyer", "name");

    res.json(orders);
    // console.log("Hello world");
  } catch (error) {
    console.log(error);
    return handleError(res, 500, "Server Error while getting orders");
  }
};

// get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });

    res.json(orders);
  } catch (error) {
    console.log(error);
    return handleError(res, 500, "Server Error while getting orders");
  }
};

// update status
export const updateStatus = async (req, res) => {
  try {
    let { orderId } = req.params;
    const { status } = req.body;
    const { data } = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      {
        new: true,
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    return handleError(res, 500, "Server Error while Updating status");
  }
};

// get all users
export const getAllUser = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).send({
      data,
      message: `All Users`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return handleError(res, 500, "Server Error while getting status");
  }
};
