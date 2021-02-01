console.log("AOC 2016 - Day 1: No Time for a Taxicab");

const splitLines = (data) => data.split(",").map(Function.prototype.call, String.prototype.trim);

const prepare = data => data.map(i => ({ turn: i[0], walk: i.slice(1)}));

const dirs = [{ x: 0, y: -1}, { x: 1, y: 0}, { x: 0, y : 1}, { x: -1, y: 0}];

const task1 = sequence => {
    let face = 0;
    let x = y = 0;
    for (const inst of sequence) {
        if (inst.turn === "R") face = (face + 1) % 4;
        else face = (face + 3) % 4;
        x += inst.walk * dirs[face].x;
        y += inst.walk * dirs[face].y;
    }
    return Math.abs(x) + Math.abs(y);
};

const task2 = sequence => {
    let face = 0;
    let x = y = 0;
    let visited = new Set();
    mainFor: for (const inst of sequence) {
        if (inst.turn === "R") face = (face + 1) % 4;
        else face = (face + 3) % 4;
        for (let i = 0; i < inst.walk; i++) {
            x += dirs[face].x;
            y += dirs[face].y;
            let location = [x,y].toString();
            if (!visited.has(location)) visited.add(location);
            else break mainFor;
        }
    }
    return Math.abs(x) + Math.abs(y);
};

let testdata = `R8, R4, R4, R8`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 8);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 4);

console.log("Task 2: " + task2(inputdata));