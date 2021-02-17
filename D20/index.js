console.log("AOC 2016 - Day 20: Firewall Rules");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const rules = [];
    const re = /(\d+)-(\d+)/;
    for (const line of data) {
        const [ , from, to ] = re.exec(line);
        rules.push({ from: +from, to: +to });
    }
    return rules;
};

const task1 = rules => {
    rules.sort((a,b) => a.from - b.from );
    let lowest = 0;
    for (const rule of rules) {
        if (rule.from > lowest) return lowest;
        if (rule.to > lowest) lowest = rule.to + 1;
    }
};

const task2 = (rules, topBorder) => {
    rules.sort((a,b) => a.from - b.from );
    let lowest = 0;
    let count = 0;
    for (const rule of rules) {
        if (rule.from > lowest) count += rule.from - lowest;
        if (rule.to >= lowest) lowest = rule.to + 1;
    }

    // this is needed just for test data, but makes the solution more universal
    if (topBorder >= lowest) count += topBorder - lowest + 1; 
    
    return count;
};

let testdata = `5-8
0-2
4-7`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 3);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata, 9), 2);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata, 4294967295));
console.timeEnd("Task 2");