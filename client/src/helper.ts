import { map } from "lodash";
import { encodeListPaginationDataCount } from "./constant";
import _ from "lodash";
import { I_EncodeList } from "./interfaces";
import moment from "moment";

export const bigDataChunkArrayForPagination = (
  updatedData: any,
  currentPaginationData: any,
  lastPageNumber: number | undefined,
  currentPageNumber: number,
  currentPageNumberIndex: number
) => {
  const currentPaginationCount = currentPaginationData.length;
  const lastPageNumberG = !_.isNil(lastPageNumber) ? lastPageNumber : 0;
  const toSkipM = currentPageNumberIndex > 1 ? currentPageNumberIndex : 1;
  if (currentPaginationCount !== 0) {
    const toSkipData =
      currentPageNumber > lastPageNumberG
        ? currentPaginationCount * encodeListPaginationDataCount - 1
        : toSkipM * encodeListPaginationDataCount - 1;
    const newData = [...currentPaginationData];
    newData.push({
      pageNumber: currentPageNumber,
      data: updatedData
        .map((encodeList: any, i: number) => {
          if (i > toSkipData) {
            const limit = i - toSkipData;
            if (limit <= encodeListPaginationDataCount) {
              return encodeList;
            }
          }
        })
        .filter((res: any) => !_.isNil(res)),
    });
    return newData;
  } else {
    const newData = [...currentPaginationData];
    newData.push({
      pageNumber: currentPageNumber,
      data: updatedData,
    });
    return newData;
  }
};

export const chunkArrayForSearchPagination = (
  encodeListData: any,
  size: number,
  searchPhrase: string
) => {
  const array = encodeListData
    .map((encodeListData: I_EncodeList) => {
      const createdAt = moment(encodeListData.createdAt).format("MM/DD/YYYY");
      const result = createdAt.includes(searchPhrase);
      return result ? encodeListData : null;
    })
    .filter((encodeListData: I_EncodeList) => !_.isNil(encodeListData));
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push({
      pageNumber: index,
      data: array.slice(index, size + index),
    });
    index += size;
  }
  return chunked_arr;
};

export const smallDataChunkArrayForPagination = (
  encodeListData: any,
  size: number
) => {
  const chunked_arr = [];
  let index = 0;
  while (index < encodeListData.length) {
    chunked_arr.push({
      pageNumber: index,
      data: encodeListData.slice(index, size + index),
    });
    index += size;
  }
  return chunked_arr;
};

