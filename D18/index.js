console.log("AOC 2016 - Day 18: Like a Rogue");

const task = (firstRow, totalRows) => {
    const room = [ firstRow ];
    for (let i = 0; i < totalRows - 1; i++) {
        let newRow = "";
        for (let j = 0; j < room[i].length; j++) {
            const left = room[i][j-1] ? room[i][j-1] : ".";
            const right = room[i][j+1] ? room[i][j+1] : ".";
            if (left !== right) newRow += "^";
            else newRow += ".";
        }
        room.push(newRow);
    }
    return room.countChar(".");
};

let testdata1 = `..^^.`;
let testdata2 = `.^^.^.^^^^`;

console.log("");

doEqualTest(task(testdata1, 3), 6);
doEqualTest(task(testdata2, 10), 38);

console.time("Task 1");
console.log("Task 1: " + task(inputdata, 40));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, 400000));
console.timeEnd("Task 2");