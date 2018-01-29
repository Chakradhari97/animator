function uniq(arr) {
  const len = arr.length;
  let i = -1;
  while (i++ < len) {
    let j = i + 1;
    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
}

function immutable(arr) {
  const arrayLength = arr.length;
  const newArray = new Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    newArray[i] = arr[i];
  }
  return uniq(newArray);
}

export default {
  uniq,
  immutable,
};
