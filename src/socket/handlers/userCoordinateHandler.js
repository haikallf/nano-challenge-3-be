const {
  getDummyUserDetailData,
  modifyCoordinates,
  updateStatusForAllUsers,
} = require("../../utils/dummyData");
const dummyDetailData = getDummyUserDetailData(); // Fetch the dummy data here

// Function to send user coordinates
const sendUserCoordinates = (socket, usersCoordinates) => {
  // Emit the user coordinates array to the connected socket
  socket.emit("user-coordinates", JSON.stringify(usersCoordinates));
};

const userCoordinatesHandler = (socket) => {
  console.log("a user connected");

  // Function to collect all user coordinates
  const collectUserCoordinates = () => {
    const usersCoordinates = dummyDetailData.map((user) => ({
      userID: user.userID,
      status: user.status,
      pinType: user.pinType,
      geolocationCoordinates: user.geolocationCoordinates,
    }));
    return usersCoordinates;
  };

  // Emit all user coordinates every 10 seconds
  setInterval(() => {
    const usersCoordinates = collectUserCoordinates();
    sendUserCoordinates(socket, usersCoordinates);
  }, 10000);

  socket.on("update-coordinates", (data) => {
    console.log("received user coordinates update:");
    console.log(data);

    // Check if the received data is in the correct format
    if (
      !data ||
      !data.userID ||
      !data.status ||
      !data.pinType ||
      !data.geolocationCoordinates ||
      !data.geolocationCoordinates.latitude ||
      !data.geolocationCoordinates.longitude
    ) {
      console.error("Invalid user coordinates update format.");
      return;
    }

    // Process the received data and call sendUserCoordinates function
    try {
      const { userID, geolocationCoordinates } = data;
      sendUserCoordinates(
        socket,
        collectUserCoordinates() // Send all user coordinates after update
      );
      console.log("User coordinates updated successfully!");
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

module.exports = userCoordinatesHandler;
