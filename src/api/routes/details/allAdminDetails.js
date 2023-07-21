const express = require("express");
const router = express.Router();
const {
  getReportAdminDetailData,
} = require("../../controllers/details/allAdminDetailController");

router.get("/", getReportAdminDetailData);

module.exports = router;
