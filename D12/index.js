console.log("AOC 2016 - Day 12: Leonardo's Monorail");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) (\w+) ?(-?\w+)?/;
    const instructions = [];
    for (const line of data) {
        const [, inst, reg1, reg2] = re.exec(line);
        instructions.push([ inst, reg1, reg2 ]);
    }
    return instructions;
};

const task = (instructions, startC) => {
    let registers = { a : 0, b : 0, c : startC, d : 0 };

    const valOrReg = (instruction, n) => {
        const regRe = /[abcd]/;
        if (regRe.test(instruction[n])) return +registers[instruction[n]];
        return +instruction[n];
    }

    for (let i = 0; i < instructions.length; i++) {
        let inst = instructions[i];
        switch (inst[0]) {
            case "cpy":
                registers[inst[2]] = valOrReg(inst, 1);
                break;
            case "inc":
                registers[inst[1]]++;
                break;
            case "dec":
                registers[inst[1]]--;
                break;
            case "jnz":
                if (valOrReg(inst,1) !== 0) i += inst[2] - 1;
                break;
            default:
                console.error("Wrong switch statement.");
        }
    }
    return registers.a;
};

let testdata = `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata, 0), 42);

console.log("Task 1: " + task(inputdata, 0));

console.log("");

console.log("Task 2: " + task(inputdata, 1));