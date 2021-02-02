export const chunkArrayForPagination = (array: any, size: number) => {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
      chunked_arr.push({
        selected: index === 0 ? true : false,
        data: array.slice(index, size + index)
      });
      index += size;
    }
    return chunked_arr;
}