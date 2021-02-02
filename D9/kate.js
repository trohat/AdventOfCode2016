// from https://github.com/katemihalikova/advent-of-code/blob/latest/2016/09.js

function part1(input) {
    let uncompressed = "";
    while (true) {
      input = input.replace(/^([^(])/, (_, start) => {
        uncompressed += start;
        return "";
      });
      input = input.replace(/^\((\d+)x(\d+)\)(.*)$/g, (_, characters, repetitions, restOfString) => {
        uncompressed += restOfString.substr(0, characters).repeat(repetitions);
        return restOfString.substr(characters);
      });
  
      if (input.length === 0) return uncompressed.length;
    }
  }
  
  // == PART 2 ==
  
  function part2(input) {
    while (true) {
      input = input.replace(/\((\d+)x(\d+)\)(.*)$/, (_, characters, repetitions, restOfString) => {
        let repeated = restOfString.substr(0, characters);
        if (repeated.indexOf("(") < 0) {
          repeated = repeated.length;
        }
        return `+[${repeated}]*${repetitions}${restOfString.substr(characters)}`;
      });
  
      if (input.indexOf("(") < 0) break;
    }
  
    console.log(input);
    input = input.replace(/\[/g, "(").replace(/\]/g, ")").replace(/([A-Z]+)/g, letters => `+${letters.length}`);
    console.log(input);
    return eval(input);
  }
  
let testdata1 = `X(8x2)(3x3)ABCY`;
let testdata2 = `(27x12)(20x12)(13x14)(7x10)(1x12)A`;
let testdata3 = `(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN`;

console.log(part2(testdata3));
console.log(part2(testdata1));
console.log(part2(testdata3));