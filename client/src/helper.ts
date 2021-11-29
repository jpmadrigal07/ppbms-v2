
import { encodeListPaginationDataCount } from "./constant";
import _ from "lodash";
import { I_DispatchControlMessenger, I_EncodeList } from "./interfaces";
import moment from "moment";

export const bigDataChunkArrayForPagination = (
  updatedData: any,
  currentPaginationData: any,
  lastPageNumber: number | undefined,
  currentPageNumber: number,
  currentPageNumberIndex: number,
) => {
  const currentPaginationCount = currentPaginationData.length;
  const lastPageNumberG = !_.isNil(lastPageNumber) ? lastPageNumber : 0;
  const toSkipM = currentPageNumberIndex > 1 ? currentPageNumberIndex : 1;
  if (currentPaginationCount !== 0 || updatedData.length > encodeListPaginationDataCount ) {
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

export const chunkArrayForSearchPaginationDispatch = (
  messengerListData: any,
  size: number,
  searchPhrase: string
) => {
  const array = messengerListData
    .map((messengerData: I_DispatchControlMessenger) => {
      const name = messengerData.name.toLowerCase();
      const address = messengerData.address.toLowerCase();
      const preparedBy = messengerData.preparedBy.toLowerCase();
      const result = name.includes(searchPhrase) || address.includes(searchPhrase) || preparedBy.includes(searchPhrase);
      return result ? messengerData : null; 
    })
    .filter((messengerListData: I_DispatchControlMessenger) => !_.isNil(messengerListData));

  return chunk(array, size, null);
};

export const chunkArray = (
  data: any,
  size: number,
  pageLoaded: number[]
) => {
  return chunk(data, size, pageLoaded);
};

const chunk = (arr: any, len: any, pageLoaded: number[] | null) => {
  let chunks = [],
      i = 0,
      n = arr.length,
      index = 0;

  while (i < n) {
    const pageNumber = pageLoaded ? pageLoaded[index] : index
    chunks.push({pageNumber, data: arr.slice(i, i += len)});
    index++;
  }
  return chunks;
}

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