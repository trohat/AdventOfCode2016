console.log("AOC 2016 - Day 8: Two-Factor Authentication");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const instructions = [];
    const rectRe = /rect (\d+)x(\d+)/;
    const rotateRe = /rotate (row|column) [xy]=(\d+) by (\d+)/;
    for (const line of data) {
        if (rectRe.test(line)) {
            const [ , w, h] = rectRe.exec(line);
            instructions.push({ type: "rect", width: +w, height: +h });
        }
        if (rotateRe.test(line)) {
            const [ , shape, n, by ] = rotateRe.exec(line);
            instructions.push({ type: "rotate", shape, number: +n, by: +by });
        }
    }
    return instructions;
};

const task1 = (instructions, width, height, task) => {
    let line = ".".repeat(width);
    let screen = [];
    for (let i = 0; i < height; i++) {
        screen.push(line);
    }
    for (const instruction of instructions) {
        switch (instruction.type) {
            case "rect":
                for (let i = 0; i < instruction.height; i++) {
                    for (let j = 0; j < instruction.width; j++) {
                        screen[i] = screen[i].setCharAt("#", j);
                    }
                }
                break;
            case "rotate":
                if (instruction.shape === "column") screen = screen.rotateLeft();
                let number = instruction.number;
                if (instruction.shape === "column") number = screen.length - number -1;
                screen[number] = screen[number].slice(screen[number].length - instruction.by) + screen[number].slice(0, screen[number].length - instruction.by);
                if (instruction.shape === "column") screen = screen.rotateRight();
                break;
            default:
                console.error("Unknown instruction type.");
        }
    }
    if (task === "task2") return screen;
    return screen.countChar("#");
};

const task2 = instructions => {
    const screen = task1(instructions, 50, 6, "task2");
    let displayStr = "";
    for (const line of screen) {
        for (const char of line) displayStr += char === "#" ? "█" : " ";
        displayStr += "\n";
    }
    console.log(displayStr);
    return "see picture";
}

let testdata = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata, 7, 3), 6);

console.log("Task 1: " + task1(inputdata, 50, 6));

console.log("");

console.log("Task 2: " + task2(inputdata));