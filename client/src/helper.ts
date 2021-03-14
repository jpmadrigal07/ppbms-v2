import { map } from "lodash";
import { encodeListPaginationDataCount } from "./constant";
import _ from "lodash";

export const chunkArrayForPagination = (
  updatedData: any,
  currentPaginationData: any,
  updatedPages: any,
  currentPageNumber: number
) => {
  const currentPaginationCount = currentPaginationData.length;
  if(currentPaginationCount !== 0) {
    const toSkipData = (currentPaginationCount * encodeListPaginationDataCount)-1;
    const newData = [...currentPaginationData]
    newData.push({
      pageNumber: currentPageNumber,
      data: updatedData
        .map((encodeList: any, i: number) => {
          if (i > toSkipData) {
            return encodeList;
          }
        })
        .filter((res: any) => !_.isNil(res)),
    });
    return newData;
  } else {
    const newData = [...currentPaginationData]
    newData.push({
      pageNumber: currentPageNumber,
      data: updatedData
    });
    return newData;
  }

};
