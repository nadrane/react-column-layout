export default function range(start, stop) {
    let next = start;
    const arr = [];
    while (next <= stop) {
      arr.push(next);
      next++;
    }
    return arr;
  }
  