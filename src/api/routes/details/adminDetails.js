const express = require("express");
const router = express.Router();
const {
  getSpecificAdminDetailData,
} = require("../../controllers/details/adminDetailController");

router.get("/", (req, res) => {
  res.status(400).json({ error: "adminID parameter is required." });
});

// Define the route handler for "/user-detail/:adminID"
router.get("/:adminID", getSpecificAdminDetailData);

module.exports = router;
