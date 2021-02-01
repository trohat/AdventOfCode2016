console.log("AOC 2016 - Day 2: Bathroom Security");

const dirs = new Map([["L", { x: -1, y: 0 }], ["R", { x: 1, y: 0 }], ["U", { x: 0, y: -1 }], ["D", { x: 0, y: 1 }]]);

const splitLines = (data) => data.split(String.fromCharCode(10));

const prepare = data => data;

const task1 = instructions => {
    let keypad = [[1,2,3], [4,5,6], [7,8,9]];
    let x = 1;
    let y = 1;
    password = "";
    for (const line of instructions) {
        for (const char of line) {
            let newX = x + dirs.get(char).x;
            let newY = y + dirs.get(char).y;
            if (newY in keypad && newX in keypad[0]) {
                x = newX;
                y = newY;
            }
        }
        password += "" + keypad[y][x];
    }
    return Number(password);
};

const task2 = instructions => {
    let keypad = [[0,0,1], [0,2,3,4], [5,6,7,8,9], [0, "A", "B", "C"], [0, 0, "D"]];
    let x = 0;
    let y = 2;
    password = "";
    for (const line of instructions) {
        for (const char of line) {
            let newX = x + dirs.get(char).x;
            let newY = y + dirs.get(char).y;
            if (newY in keypad && newX in keypad[newY] && keypad[newY][newX] !== 0) {
                x = newX;
                y = newY;
            }
        }
        password += "" + keypad[y][x];
    }
    return password;
}

let testdata = `ULL
RRDDD
LURDL
UUUUD`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 1985);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), 336);

console.log("Task 2: " + task2(inputdata));