console.log("AOC 2016 - Day 6: Signals and Noise");

const splitLines = (data) => data.split(String.fromCharCode(10));

const task1 = messages => {
    messages = messages.rotateRight().map(line => line.split("").sort((a,b) => line.countChar(b) - line.countChar(a)));
    return messages.map(x => x[0]).join("");
};

const task2 = messages => {
    messages = messages.rotateRight().map(line => line.split("").sort((a,b) => line.countChar(a) - line.countChar(b)));
    return messages.map(x => x[0]).join("");
}

let testdata = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;

inputdata = splitLines(inputdata);

testdata = splitLines(testdata);

console.log("");

doEqualTest(task1(testdata), "easter");

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata), "advent");

console.log("Task 2: " + task2(inputdata));