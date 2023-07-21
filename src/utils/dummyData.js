//note: the latitude range is between -6.2449373429657244 to -6.24356169422578
// the longitude range is between 106.79798496354378 to 106.79824773542873

const minLatitude = -6.244932845946446;
const maxLatitude = -6.24356169422578;
const minLongitude = 106.79798496354378;
const maxLongitude = 106.79824773542873;

//dummy detail data for testing in JSON format
let dummyDetailData = [
  {
    userID: 1,
    name: "Asep",
    email: "asep@email.com",
    password: "asep123",
    pinType: "lansia",
    gender: "male",
    description: "Asep is Lansia",
    needs: "chair",
    age: "70",
    location: "Concourse",
    status: "assisted", //fine, assisted, requesting, not available
    userImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.243745787357868,
      longitude: 106.79798496354378,
    },
  },
  {
    userID: 2,
    name: "Tina",
    email: "tina@email.com",
    password: "tina123",
    pinType: "ibu hamil",
    gender: "female",
    description: "Tina is Pregnant",
    needs: "lift access",
    age: "70",
    location: "Toilet",
    status: "requesting", //fine, assisted, requesting, not available
    userImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.2449373429657244,
      longitude: 106.79821898654653,
    },
  },
  {
    userID: 3,
    name: "Toni",
    email: "toni@email.com",
    password: "toni123",
    pinType: "lansia",
    gender: "male",
    description: "Toni is Lansia",
    needs: "wheelchair",
    age: "70",
    location: "Platform",
    status: "fine", //fine, assisted, requesting, not available
    userImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.243745787357868,
      longitude: 106.79798496354378,
    },
  },
];

//dummy detail data for testing in JSON format
let dummyAdminDetailData = [
  {
    adminID: 1,
    name: "Admin 1",
    email: "admin1@email.com",
    password: "admin123",
    status: "on Duty", //available, on duty, not available, contacted
    adminImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.2449373429657244,
      longitude: 106.79821898654653,
    },
  },
  {
    adminID: 2,
    name: "Admin 2",
    email: "admin2@email.com",
    password: "admin123",
    status: "available", //available, on duty, not available, contacted
    adminImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.2449373429657274,
      longitude: 106.7982189865466,
    },
  },
  {
    adminID: 3,
    name: "Admin 3",
    email: "admin3@email.com",
    password: "admin123",
    status: "available", //available, on duty, not available, contacted
    adminImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.2449373429657244,
      longitude: 106.79821898654653,
    },
  },
  {
    adminID: 4,
    name: "Admin 4",
    email: "admin4@email.com",
    password: "admin123",
    status: "available", //available, on duty, not available, contacted
    adminImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.244937342965727,
      longitude: 106.79821898654663,
    },
  },
  {
    adminID: 5,
    name: "Admin 5",
    email: "admin5@email.com",
    password: "admin123",
    status: "available", //available, on duty, not available, contacted
    adminImage: "https://via.placeholder.com/150",
    geolocationCoordinates: {
      latitude: -6.2449373429657254,
      longitude: 106.79821898654663,
    },
  },
];

const getDummyUserDetailData = () => dummyDetailData;
const getDummyAdminDetailData = () => dummyAdminDetailData;

// Function to generate a random number within a range
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate random latitude and longitude
function generateRandomCoordinates() {
  const randomLatitude = getRandomNumber(minLatitude, maxLatitude);
  const randomLongitude = getRandomNumber(minLongitude, maxLongitude);
  return {
    latitude: randomLatitude,
    longitude: randomLongitude,
  };
}

function modifyCoordinates(userID) {
  const userIDToUpdate = userID;
  const userToUpdate = dummyDetailData.find(
    (user) => user.userID === userIDToUpdate
  );

  if (!userToUpdate) {
    console.error(`User with userID ${userIDToUpdate} not found.`);
    return;
  }

  const newCoordinates = generateRandomCoordinates();
  userToUpdate.geolocationCoordinates = newCoordinates;
}

//function to check the status of the user
function checkAndUpdateStatus(userID) {
  const currentTime = Date.now();
  const userToUpdate = dummyDetailData.find((user) => user.userID === userID);

  if (!userToUpdate) {
    console.error(`User with userID ${userID} not found.`);
    return;
  }

  const lastUpdatedTime = userToUpdate.lastUpdatedTime || currentTime;
  const timeDifference = currentTime - lastUpdatedTime;
  const isInCoordinateRange =
    userToUpdate.geolocationCoordinates.latitude >= minLatitude &&
    userToUpdate.geolocationCoordinates.latitude <= maxLatitude &&
    userToUpdate.geolocationCoordinates.longitude >= minLongitude &&
    userToUpdate.geolocationCoordinates.longitude <= maxLongitude;

  if (
    userToUpdate.status === "fine" &&
    isInCoordinateRange &&
    timeDifference >= 30000
  ) {
    userToUpdate.status = "requesting";
    console.log(`User with userID ${userID} is requesting for assistance.`);
  }

  // Update lastUpdatedTime for the user
  userToUpdate.lastUpdatedTime = currentTime;
}
function updateStatusForAllUsers() {
  dummyDetailData.forEach((user) => {
    checkAndUpdateStatus(user.userID);
  });
}

module.exports = {
  getDummyUserDetailData,
  getDummyAdminDetailData,
  modifyCoordinates,
  updateStatusForAllUsers,
};
