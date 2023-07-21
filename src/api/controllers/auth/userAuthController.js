const { getDummyUserDetailData } = require("../../../utils/dummyData");

const authenticateUser = (email, password, dummyUserDetailData) => {
  const authenticatedUser = dummyUserDetailData.find(
    (user) => user.email === email && user.password === password
  );

  return authenticatedUser;
};

const postUserAuthData = (req, res) => {
  const { email, password } = req.body;
  const dummyUserDetailData = getDummyUserDetailData();

  // Perform user authentication
  const authenticatedUser = authenticateUser(
    email,
    password,
    dummyUserDetailData
  );

  if (authenticatedUser) {
    // If authentication succeeds, return the user detail data
    res.json(authenticatedUser);
    console.log("User authentication successful. User detail data sent.");
  } else {
    // If authentication fails, return an error message
    res.status(401).json({ error: "User authentication failed." });
    console.log("User authentication failed.");
  }
};

module.exports = {
  postUserAuthData,
};
