const { getDummyUserDetailData } = require("../../../utils/dummyData");

const getReportUserDetailData = (req, res) => {
  const dummyDetailData = getDummyUserDetailData();
  res.json(dummyDetailData);
  console.log("Succeeded get all user detail data");
};

module.exports = {
  getReportUserDetailData,
};
