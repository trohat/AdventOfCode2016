console.log("AOC 2016 - Day 10: Balance Bots");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const giveInstructions = [];
    const receiveInstructions = [];
    const receiveRe = /value (\d+) goes to bot (\d+)/;
    const giveRe = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/;
    for (const line of data) {
        let found = false;
        if (receiveRe.test(line)) {
            const [ , chip, bot] = receiveRe.exec(line);
            found = true;
            receiveInstructions.push({ chip: +chip, bot: +bot });
        }
        if (giveRe.test(line)) {
            const [ , bot, lowType, lowValue, highType, highValue ] = giveRe.exec(line);
            found = true;
            giveInstructions.push({ bot: +bot, lowType, lowValue: +lowValue, highType, highValue: +highValue });
        }
        if (!found) console.error("Wrong line: " + line);
    }
    
    return [ receiveInstructions, giveInstructions ];
};

const task = ([ receiveInstructions, giveInstructions ], task, test) => {
    let everything = { bots: [], outputs: []};
    for (const i of receiveInstructions) {
        if (!(i.bot in everything.bots)) everything.bots[i.bot] = [];
    }
    for (const i of giveInstructions) {
        if (!(i.bot in everything.bots)) everything.bots[i.bot] = [];
        if (!(i.lowValue in everything[i.lowType + "s"])) everything[i.lowType + "s"][i.lowValue] = [];
        if (!(i.highValue in everything[i.highType + "s"])) everything[i.highType + "s"][i.highValue] = [];
    }
    for (const i of receiveInstructions) {
        everything.bots[i.bot].push(i.chip);
    }

    let finished = false;
    while (!finished) {
        let somethingHappens = false;
        let botIndex = everything.bots.findIndex(b => b.length === 2);
        if (botIndex !== -1) {
            somethingHappens = true;
            let inst = giveInstructions.find(i => i.bot === botIndex);
            let lower = everything.bots[botIndex].min();
            let higher = everything.bots[botIndex].max();
            if (task === "task1" && test === "test" && lower === 2 && higher === 5) return botIndex;
            if (task === "task1" && lower === 17 && higher === 61) return botIndex;
            everything.bots[botIndex] = [];
            everything[inst.lowType + "s"][inst.lowValue].push(lower);
            everything[inst.highType + "s"][inst.highValue].push(higher);
        }
        if (!somethingHappens) finished = true;
    }

    return everything.outputs[0] * everything.outputs[1] * everything.outputs[2];
};

const task2 = data => {
    
}

let testdata = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata, "task1", "test"), 2);

console.log("Task 1: " + task(inputdata, "task1"));

console.log("");

console.log("Task 2: " + task(inputdata));