export const isBlocked = (squares, preStep, block1, block2) => {
  if (block1 === -1)
    if (squares[block2] && squares[block2] !== squares[preStep]) return true;
  if (block2 === -1)
    if (squares[block1] && squares[block1] !== squares[preStep]) return true;
  if (
    squares[block1] &&
    squares[block2] &&
    squares[block2] === squares[block1] &&
    squares[block2] !== squares[preStep]
  )
    return true;
  return false;
};

export const calculateWinner = (squares, preStep) => {
  // xet hang ngang
  for (let i = -4; i <= 0; i++) {
    if (preStep + i - parseInt(preStep / 20, 10) * 20 >= 0) {
      if (
        squares[preStep + i] === squares[preStep + i + 1] &&
        squares[preStep + i] === squares[preStep + i + 2] &&
        squares[preStep + i] === squares[preStep + i + 3] &&
        squares[preStep + i] === squares[preStep + i + 4]
      )
        if (
          isBlocked(
            squares,
            preStep,
            preStep + i - 1 - parseInt(preStep / 20, 10) * 20 >= 0
              ? preStep + i - 1
              : -1,
            (preStep + i + 5) / 20 === parseInt((preStep + i + 5) / 20, 10)
              ? -1
              : preStep + i + 5
          ) === false
        )
          return { kq: squares[preStep], type: 1, vt: i };
    }
  }
  // xet hang doc
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 20 >= 0) {
      if (
        squares[preStep + i * 20] === squares[preStep + (i + 1) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 2) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 3) * 20] &&
        squares[preStep + i * 20] === squares[preStep + (i + 4) * 20]
      )
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 20 >= 0 ? preStep + (i - 1) * 20 : -1,
            preStep + (i + 5) * 20 >= 400 ? -1 : preStep + (i + 5) * 20
          ) === false
        )
          return { kq: squares[preStep], type: 20, vt: i };
    }
  }
  // xet hang cheo thu 1
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 21 >= 0) {
      if (
        squares[preStep + i * 21] === squares[preStep + (i + 1) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 2) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 3) * 21] &&
        squares[preStep + i * 21] === squares[preStep + (i + 4) * 21]
      ) {
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 21 >= 0 &&
              parseInt((preStep + (i - 1) * 21) / 10, 10) + 2 ===
                parseInt((preStep + i * 21) / 10, 10)
              ? preStep + (i - 1) * 21
              : -1,
            preStep + (i + 5) * 21 < 400 &&
              parseInt((preStep + (i + 5) * 21) / 10, 10) - 2 ===
                parseInt((preStep + (i + 4) * 21) / 10, 10)
              ? preStep + (i + 5) * 21
              : -1
          ) === false
        )
          return { kq: squares[preStep], type: 21, vt: i };
      }
    }
  }
  // xet hang cheo thu 2
  for (let i = -4; i <= 0; i++) {
    if (preStep + i * 19 >= 0) {
      if (
        squares[preStep + i * 19] === squares[preStep + (i + 1) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 2) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 3) * 19] &&
        squares[preStep + i * 19] === squares[preStep + (i + 4) * 19]
      ) {
        if (
          isBlocked(
            squares,
            preStep,
            preStep + (i - 1) * 19 >= 0 &&
              parseInt((preStep + (i - 1) * 19) / 10, 10) + 2 ===
                parseInt((preStep + i * 19) / 10, 10)
              ? preStep + (i - 1) * 19
              : -1,
            preStep + (i + 5) * 19 < 400 &&
              parseInt((preStep + (i + 5) * 19) / 10, 10) - 2 ===
                parseInt((preStep + (i + 4) * 19) / 10, 10)
              ? preStep + (i + 5) * 19
              : -1
          ) === false
        )
          return { kq: squares[preStep], type: 19, vt: i };
      }
    }
  }
  return {
    kq: null,
    type: 0,
    vt: 0
  };
};
