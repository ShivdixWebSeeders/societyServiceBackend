const express = require("express");
const router = express.Router();
const {
  loginVendor,
  signupVendor,
  createVendorProfile,
  sendValidationOTP,
  validateEmail,
  forgetPassword,
} = require("../controllers/vendor/vendorAuth");
const { validateOTP } = require("../middlewares/thirdPartyServicesMiddleware");
const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/roleBasedAuth");
const uploadIDProof = require("../middlewares/uploadIDProof");
const { signUpNotVerified } = require("../controllers/notVerifiedAuth");

router.post("/signup", signupVendor);
router.post("/login", loginVendor);

router.put(
  "/createProfile",
  authenticate,
  authorizeRoles("vendor"),
  uploadIDProof,
  createVendorProfile
);

router.post("/sendOtpEmailVerification", signUpNotVerified, sendValidationOTP);
router.post("/sendOTP", sendValidationOTP);

router.post("/validateEmail", validateOTP, validateEmail);
router.post("/forgetPassword", validateOTP, forgetPassword);
module.exports = router;
