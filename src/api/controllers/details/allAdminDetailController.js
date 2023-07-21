const { getDummyAdminDetailData } = require("../../../utils/dummyData");

const getReportAdminDetailData = (req, res) => {
  const dummyDetailData = getDummyAdminDetailData();
  res.json(dummyDetailData);
  console.log("Succeeded get admin detail data");
};

module.exports = {
  getReportAdminDetailData,
};
