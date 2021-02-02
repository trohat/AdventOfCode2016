console.log("AOC 2016 - Day 9: Explosives in Cyberspace");

const task1 = sequence => {
    let length = sequence.length;
    let newLength = 0;
    for (let i = 0; i < length; i++) {
        let char = sequence[i];
        if (/[A-Z]/.test(char)) {
            newLength++;
            continue;
        }
        console.assert(char === "(");
        i++;
        let copyLength = "";
        char = sequence[i];
        while (char !== "x") {
            copyLength += char;
            i++;
            char = sequence[i];
        }
        i++;
        let times = "";
        char = sequence[i];
        while (char !== ")") {
            times += char;
            i++;
            char = sequence[i];
        }
        copyLength = +copyLength;
        newLength += times * copyLength;
        i += copyLength;
    }
    return newLength;
};

const task2 = originalSequence => {
    const count = sequence => {
        let length = sequence.length;
        let newLength = 0;
        for (let i = 0; i < length; i++) {
            let char = sequence[i];
            if (/[A-Z]/.test(char)) {
                newLength++;
                continue;
            }
            console.assert(char === "(");
            i++;
            let copyLength = "";
            char = sequence[i];
            while (char !== "x") {
                copyLength += char;
                i++;
                char = sequence[i];
            }
            i++;
            let times = "";
            char = sequence[i];
            while (char !== ")") {
                times += char;
                i++;
                char = sequence[i];
            }
            copyLength = +copyLength;
            newLength += times * count(sequence.slice(i + 1, i + 1 + copyLength));
            i += copyLength;
        }
        return newLength;
    }

    return count(originalSequence);
};

let testdata1 = `X(8x2)(3x3)ABCY`;
let testdata2 = `(27x12)(20x12)(13x14)(7x10)(1x12)A`;
let testdata3 = `(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN`;

console.log("");

doEqualTest(task1(testdata1), 18);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata1), 20);
doEqualTest(task2(testdata2), 241920);
doEqualTest(task2(testdata3), 445);

console.log("Task 2: " + task2(inputdata));