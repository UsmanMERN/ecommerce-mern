import express from "express";

import {
  loginUser,
  registerUser,
  testController,
  forgetPassword,
  updateProfile,
  getOrders,
  getAllOrders,
  updateStatus,
  getAllUser,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object
const router = express.Router();

// routing

// REGISTERED USER || METHOD POST

router.post("/register", registerUser);

// LOGIN USER || METHOD POST

router.post("/login", loginUser);

// TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Route

router.get("/user-auth", requireSignIn, (req, res) => {
  res.send({
    success: true,
  });
});

// FORGOT PASSWORD
router.post("/forgot-password", forgetPassword);

// Admin Route
router.get("/auth-admin", requireSignIn, isAdmin, (req, res) => {
  res.send({
    success: true,
  });
});

// update profile
router.put("/update-profile", requireSignIn, updateProfile);

//all user
router.get("/all-users", requireSignIn, isAdmin, getAllUser);

// orders
router.get("/orders", requireSignIn, getOrders);

// get all orders
router.get("/get-allOrders", requireSignIn, isAdmin, getAllOrders);

// update the oder status
router.put("/update-status/:orderId", requireSignIn, isAdmin, updateStatus);

export default router;
