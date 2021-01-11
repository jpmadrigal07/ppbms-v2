const _ = require("lodash");

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

module.exports = { isSheetMasterList };
