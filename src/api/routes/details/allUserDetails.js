const express = require("express");
const router = express.Router();
const {
  getReportUserDetailData,
} = require("../../controllers/details/allUserDetailController");

router.get("/", getReportUserDetailData);

module.exports = router;
