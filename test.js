const value = [
  [2, null, null, null],
  [null, 2, null, 4],
  [null, null, null, null],
  [null, null, 2, null]
];

value.forEach((item) => {
  // item = null;
  item.forEach((elem) => {
    // console.log(elem, 'before')
    elem *= 2;
      // console.log(elem, 'after')
  })
  console.log(item, 'item')
})

console.log(value)