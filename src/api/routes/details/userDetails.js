const express = require("express");
const router = express.Router();
const {
  getSpecificUserDetailData,
} = require("../../controllers/details/userDetailController");
// Define the route handler for "/user-detail"

router.get("/", (req, res) => {
  res.status(400).json({ error: "userID parameter is required." });
});

// Define the route handler for "/user-detail/:userID"
router.get("/:userID", getSpecificUserDetailData);

module.exports = router;
