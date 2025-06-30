const express = require("express");
const router = express.Router();
const {
  register,
  login,
  showDashboard,
  forgotPassword,
  renderResetForm,
  resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Public pages
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));

// Auth logic
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/dashboard", protect, showDashboard);

// Logout (clear cookie)
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// forgot password feature
router.get("/forgot-password", (req, res) => res.render("forgot"));
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", renderResetForm);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
