//
// HEX в RGB
//

function toRgb(hex) {
  let m = hex.slice(1).match(/.{2}/g);

  m[0] = parseInt(m[0], 16);
  m[1] = parseInt(m[1], 16);
  m[2] = parseInt(m[2], 16);

  return `rgb(${m[0]},${m[1]},${m[2]})`;
}