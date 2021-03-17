import { map } from "lodash";
import { encodeListPaginationDataCount } from "./constant";
import _ from "lodash";

export const chunkArrayForPagination = (
  updatedData: any,
  currentPaginationData: any,
  currentPageNumber: number
) => {
  const currentPaginationCount = currentPaginationData.length;
  if(currentPaginationCount !== 0) {
    const toSkipData = (currentPaginationCount * encodeListPaginationDataCount)-1;
    const newData = [...currentPaginationData];
    const sortedUpdatedData = _.sortBy(updatedData, ["createdAt"]);
    newData.push({
      pageNumber: currentPageNumber,
      data: sortedUpdatedData
        .map((encodeList: any, i: number) => {
          if (i > toSkipData) {
            const limit = (i - toSkipData);
            if(limit <= encodeListPaginationDataCount) {
              console.log('limit', limit)
              return encodeList;
            }
          }
        })
        .filter((res: any) => !_.isNil(res))
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