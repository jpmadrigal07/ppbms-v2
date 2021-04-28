const _ = require("lodash");
const Record = require("../models/record");

const isSheetMasterList = (
  toUploadFileHeaders,
  masterListValidHeaderNames
) => {
  // There are empty item in the array like this <1 empty item>
  // so it needed to be clean using this code
  const cleanedToUploadFileHeaders = toUploadFileHeaders.filter(() => {
    return true;
  });

  if (
    _.isNil(cleanedToUploadFileHeaders) ||
    _.isNil(masterListValidHeaderNames)
  ) {
    return false;
  }

  return cleanedToUploadFileHeaders.every((v) =>
    masterListValidHeaderNames.includes(v)
  );
};

const updateRecordForLoop = async (
  condition,
  data
) => {
  try {
    await Record.updateOne(condition, { $set: data});
    return true
  } catch (error) {
    return false
  }
};

module.exports = {
  isSheetMasterList,
  updateRecordForLoop
};