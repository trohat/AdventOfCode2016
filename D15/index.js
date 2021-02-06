console.log("AOC 2016 - Day 15: Timing is Everything");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /Disc #(\d) has (\d+) positions; at time=0, it is at position (\d+)./;
    const discs = [];
    for (const line of data) {
        const [ , id, positions, start ] = re.exec(line);
        discs.push({ positions: +positions, id: +id, start: +start });
    }
    return discs;
};

const task1 = discs => {
    for (const disc of discs) {
        disc.shiftedStart = (disc.start + disc.id) % disc.positions;
        disc.remainder = (disc.positions - disc.shiftedStart) % disc.positions;
    }
    return discs.reduce((accumulator, currentDisc) => {
        for (let i = accumulator.remainder;; i += accumulator.positions) {
            if (i % currentDisc.positions === currentDisc.remainder)
                return { positions: accumulator.positions * currentDisc.positions, remainder: i };
        }
    }).remainder;
};

const task2 = discs => {
    discs.push({ positions: 11, id: discs.length + 1, start: 0 });
    return task1(discs);
}

let testdata = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 5);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");


// explanation for a very similar problem here: https://github.com/trohat/AdventOfCode2020/blob/main/D13/index.js