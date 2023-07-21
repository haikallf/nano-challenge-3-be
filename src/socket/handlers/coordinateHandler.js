const { getDummyAdminDetailData } = require("../../utils/dummyData");

const dummyAdminDetailData = getDummyAdminDetailData();

const handleCoordinates = (socket) => {
  socket.on("admin-coordinates", (data) => {
    try {
      //JSON object cannot be used directly in JavaScript, so it must be converted first
      const parsedData = JSON.parse(data);

      console.log("Received coordinates:", parsedData);

      // Check if the received data has the required fields
      const { adminID, geolocationCoordinates } = parsedData;
      if (
        !adminID ||
        !geolocationCoordinates ||
        !geolocationCoordinates.latitude ||
        !geolocationCoordinates.longitude
      ) {
        throw new Error("Invalid coordinates data received.");
      }

      // Find the admin based on the adminID in the received data
      const adminToUpdate = dummyAdminDetailData.find(
        (admin) => admin.adminID === adminID
      );

      // Check if the admin exists
      if (!adminToUpdate) {
        throw new Error(`Admin with adminID ${adminID} not found.`);
      }

      // Update the admin's geolocationCoordinates
      adminToUpdate.geolocationCoordinates = {
        latitude: geolocationCoordinates.latitude,
        longitude: geolocationCoordinates.longitude,
      };

      console.log("Admin location updated successfully!");
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  });
};

module.exports = handleCoordinates;
