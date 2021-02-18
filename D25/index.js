console.log("AOC 2016 - Day 25: Clock Signal");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /(\w{3}) ([-\w]+) ?([-\w]+)?/;
    let instructions = [];
    for (const line of data) {
        const [, op, first, second] = re.exec(line);
        instructions.push({ op, first, second });
    }
    return instructions;
};

const task = instructions => {
    
    nextSignal: for (let i = 0; i < 200; i++) {
        const valOrReg = any => /[abcd]/.test(any) ? +registers[any] : +any;
        
        let registers = { a: i, b: 0, c: 0, d: 0 };
        let outputs = 0;
        
        for (let j = 0; j < instructions.length; j++) {
            let inst = instructions[j];
            switch (inst.op) {
                case "cpy":
                    registers[inst.second] = valOrReg(inst.first);
                    break;
                case "inc":
                    registers[inst.first]++;
                    break;
                case "dec":
                    registers[inst.first]--;
                    break;
                case "jnz":
                    if (valOrReg(inst.first) !== 0) j += valOrReg(inst.second) - 1;
                    break;
                case "out":
                    let output = valOrReg(inst.first);
                    if (outputs % 2 !== output) continue nextSignal;
                    outputs++;
                    break;
                default:
                    console.error("Wrong switch statement.");
            }
            if (outputs > 8) return i;
        }
    }
}

inputdata = prepare(splitLines(inputdata));

console.log("");

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");