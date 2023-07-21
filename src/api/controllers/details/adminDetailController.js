const { getDummyAdminDetailData } = require("../../../utils/dummyData");

const getSpecificAdminDetailData = (req, res) => {
  // Get the designated userID from the request parameters
  const { adminID } = req.params;

  if (!adminID) {
    return res
      .status(400)
      .json({ error: "adminID is required in the request." });
  }

  const parsedAdminID = parseInt(adminID);

  if (isNaN(parsedAdminID)) {
    return res.status(400).json({ error: "Invalid adminID provided." });
  }

  const dummyAdminDetailData = getDummyAdminDetailData();
  const adminDetail = dummyAdminDetailData.find(
    (admin) => admin.adminID === parsedAdminID
  );

  if (!adminDetail) {
    return res
      .status(404)
      .json({ error: `User with adminID ${parsedAdminID} not found.` });
  }

  // Extract the required fields for the response
  const { name, status, adminImage, geolocationCoordinates } = adminDetail;

  const adminResponse = {
    name,
    status,
    adminImage,
    geolocationCoordinates,
  };

  res.json(adminResponse);
  console.log(`Succeeded get user detail data for adminID: ${parsedUserID}`);
};

module.exports = {
  getSpecificAdminDetailData,
};
