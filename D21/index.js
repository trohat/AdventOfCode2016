console.log("AOC 2016 - Day 21: Scrambled Letters and Hash");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const swapReverseMoveRe = /(swap|move|reverse) (positions?|letter) (\w) (?:with|to|through) (?:\2|) ?(\w)/;
    const rotateRe = /(rotate) (left|right) (\w+) steps?/;
    const rotateBasedRe = /(rotate based on) position of letter (\w)/;
    const digitRe = /\d+/;
    const instructions = [];
    for (const text of data) {
        if (swapReverseMoveRe.test(text)) {
            let [, op, what, first, second] = swapReverseMoveRe.exec(text);
            if (digitRe.exec(first)) {
                first = +first;
                second = +second;
            }
            instructions.push({ op, what, first, second, text });
        }
        if (rotateRe.test(text)) {
            let [, op, dir, steps] = rotateRe.exec(text);
            steps = +steps;
            instructions.push({ op, dir, steps, text });
        }
        if (rotateBasedRe.test(text)) {
            let [, op, letter] = rotateBasedRe.exec(text);
            instructions.push({ op, letter, text });
        }
    }
    return instructions;
};

const task1 = (instructions, toScramble) => {

    instructions = JSON.parse(JSON.stringify(instructions));
    let password = toScramble.split("");

    for (const inst of instructions) {
        switch (inst.op) {
            case "swap":
                if (inst.what === "position") [password[inst.first], password[inst.second]] = [password[inst.second], password[inst.first]];
                if (inst.what === "letter") password = password.map(l => {
                    if (l === inst.first) return inst.second;
                    if (l === inst.second) return inst.first;
                    return l;
                });
                break;
            case "rotate based on":
                inst.steps = password.indexOf(inst.letter) + 1;
                if (inst.steps > 4) inst.steps++;
            case "rotate":
                if (inst.dir === "left") inst.steps = password.length - inst.steps;
                for (let i = 0; i < inst.steps; i++) {
                    password.unshift(password.pop());
                }
                break;
            case "reverse":
                password = [...password.slice(0, inst.first), ...password.slice(inst.first, inst.second + 1).reverse(), ...password.slice(inst.second + 1)];
                break;
            case "move":
                let moving = password.splice(inst.first, 1);
                password.splice(inst.second, 0, ...moving);
                break;
            default:
                console.error("Wrong switch");

        }
    }

    return password.join("");
};

const task2 = (instructions, toUnscramble) => {
    instructions = JSON.parse(JSON.stringify(instructions));
    let password = toUnscramble.split("");

    for (let i = instructions.length - 1; i >= 0; i--) {
        let inst = instructions[i];
        switch (inst.op) {
            case "swap": // same in both cases
                if (inst.what === "position") [password[inst.first], password[inst.second]] = [password[inst.second], password[inst.first]];
                if (inst.what === "letter") password = password.map(l => {
                    if (l === inst.first) return inst.second;
                    if (l === inst.second) return inst.first;
                    return l;
                });
                break;
            case "rotate based on": // totally changed, using array to calculate indexes
                let position = password.indexOf(inst.letter);
                let steps = [1, 1, 6, 2, 7, 3, 0, 4];
                inst.steps = 8 - steps[position];
            case "rotate": // changed left to right
                if (inst.dir === "right") inst.steps = password.length - inst.steps;
                for (let k = 0; k < inst.steps; k++) {
                    password.unshift(password.pop());
                }
                break;
            case "reverse": // same
                password = [...password.slice(0, inst.first), ...password.slice(inst.first, inst.second + 1).reverse(), ...password.slice(inst.second + 1)];
                break;
            case "move": // switched first and second
                let moving = password.splice(inst.second, 1);
                password.splice(inst.first, 0, ...moving);
                break;
            default:
                console.error("Wrong switch");

        }
    }

    return password.join("");
};

let testdata = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata, "abcde"), "decab");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata, "abcdefgh"));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(inputdata, "bfheacgd"), "abcdefgh");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, "fbgdceah"));
console.timeEnd("Task 2");