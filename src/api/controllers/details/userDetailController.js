const { getDummyUserDetailData } = require("../../../utils/dummyData");

const getSpecificUserDetailData = (req, res) => {
  // Get the designated userID from the request parameters
  const { userID } = req.params;

  if (!userID) {
    return res
      .status(400)
      .json({ error: "userID is required in the request." });
  }

  const parsedUserID = parseInt(userID);

  if (isNaN(parsedUserID)) {
    return res.status(400).json({ error: "Invalid userID provided." });
  }

  const dummyDetailData = getDummyUserDetailData();
  const userDetail = dummyDetailData.find(
    (user) => user.userID === parsedUserID
  );

  if (!userDetail) {
    return res
      .status(404)
      .json({ error: `User with userID ${parsedUserID} not found.` });
  }

  // Extract the required fields for the response
  const {
    name,
    pinType,
    gender,
    description,
    needs,
    age,
    location,
    status,
    userImage,
    geolocationCoordinates,
  } = userDetail;

  const userResponse = {
    name,
    pinType,
    gender,
    description,
    needs,
    age,
    location,
    status,
    userImage,
    geolocationCoordinates,
  };

  res.json(userResponse);
  console.log(`Succeeded get user detail data for userID: ${parsedUserID}`);
};

module.exports = {
  getSpecificUserDetailData,
};
