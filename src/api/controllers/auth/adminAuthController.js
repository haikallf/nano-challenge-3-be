const { getDummyAdminDetailData } = require("../../../utils/dummyData");

const authenticateAdmin = (email, password, dummyAdminDetailData) => {
  const authenticatedAdmin = dummyAdminDetailData.find(
    (admin) => admin.email === email && admin.password === password
  );

  return authenticatedAdmin;
};

const postAdminAuthData = (req, res) => {
  const { email, password } = req.body;
  const dummyAdminDetailData = getDummyAdminDetailData();

  // Perform admin authentication
  const authenticatedAdmin = authenticateAdmin(
    email,
    password,
    dummyAdminDetailData
  );

  if (authenticatedAdmin) {
    // If authentication succeeds, return the admin detail data
    res.json(authenticatedAdmin);
    console.log("Admin authentication successful. Admin detail data sent.");
  } else {
    // If authentication fails, return an error message
    res.status(401).json({ error: "Admin authentication failed." });
    console.log("Admin authentication failed.");
  }
};

module.exports = {
  postAdminAuthData,
};
