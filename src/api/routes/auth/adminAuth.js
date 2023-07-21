const express = require("express");
const router = express.Router();
const {
  postAdminAuthData,
} = require("../../controllers/auth/adminAuthController");

router.post("/", postAdminAuthData);

module.exports = router;
