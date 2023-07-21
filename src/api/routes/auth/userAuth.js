const express = require("express");
const router = express.Router();
const {
  postUserAuthData,
} = require("../../controllers/auth/userAuthController");

router.post("/", postUserAuthData);

module.exports = router;
