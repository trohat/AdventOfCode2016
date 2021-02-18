console.log("AOC 2016 - Day 23: Safe Cracking");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) ([-\w]+) ?([-\w]+)?/;
    let instructions = [];
    for (const line of data) {
        const [ , op, first, second ] = re.exec(line);
        instructions.push({ op, first, second });
    }
    return instructions;
};

const task = (instructions, eggs) => {
    instructions = JSON.parse(JSON.stringify(instructions));
    let registers = { a : eggs, b : 0, c : 0, d : 0 };

    const valOrReg = any => /[abcd]/.test(any) ? +registers[any] : +any;
    let steps = 0;
    for (let i = 0; i < instructions.length; i++) {
        steps ++;
        let inst = instructions[i];
        switch (inst.op) {
            case "cpy":
                if (!/[abcd]/.test(inst.second)) continue;
                registers[inst.second] = valOrReg(inst.first);
                break;
            case "inc":
                registers[inst.first]++;
                break;
            case "dec":
                registers[inst.first]--;
                break;
            case "jnz":
                if (valOrReg(inst.first) !== 0) i += valOrReg(inst.second) - 1;
                break;
            case "tgl":
                let position = i + valOrReg(inst.first);
                console.log("Toggling instruction " + position) ;
                if (!(position in instructions)) continue;
                if (instructions[position].second === undefined) {
                    if (instructions[position].op === "inc") instructions[position].op = "dec";
                    else instructions[position].op = "inc";
                }
                else {
                    if (instructions[position].op === "jnz") instructions[position].op = "cpy";
                    else instructions[position].op = "jnz";
                }
                break;
            default:
                console.error("Wrong switch statement.");
        }
        if (i === 10) console.log("a:", registers.a, " b:", registers.b, " c:", registers.c, " d:", registers.d);
    }
    return registers.a;
};

const taskCleverly = eggs => {
    let a = eggs;
    let b = eggs - 1;
    let c;
    do {
        a *= b;
        b--;
        c = 2*b;
    } while (c > 2);
    a += 72 * 75;
    return a;
}

let testdata = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task(testdata), 3);

console.time("Task 1");
console.log("Task 1: " + task(inputdata, 7));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + taskCleverly(12));
console.timeEnd("Task 2");