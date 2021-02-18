console.log("AOC 2016 - Day 24: Air Duct Spelunking");

// from AOC 2019 - Day 7: Amplification Circuit
const getAllPermutations = (arr) => {
    if (arr.length === 1) return [[...arr]];
    const permutations = [];
    arr.forEach((d, index) => {
        let newArr = [...arr];
        newArr.splice(index, 1);
        getAllPermutations(newArr).forEach((newD) => {
            permutations.push([d, ...newD]);
        });
    });
    return permutations;
};

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = map => {
    const isNumber = char => char == Number(char);

    let numbers = "";
    let numberPositions = {};
    map.forEach((line,lineIndex) => {
        line.split("").forEach((char, charIndex) => {
            if (isNumber(char)) {
                numbers += char; 
                numberPositions[char] = { x: charIndex, y : lineIndex };
            }
        });
    });
    let distances = [];
    Object.keys(numberPositions).sort().forEach(key => {
        let stepsSet = new Set;
        let keyDistances = [];
        distances.push(keyDistances);
        const toSearch = [ { ...numberPositions[key], steps: 0}];
        stepsSet.add([numberPositions[key].x, numberPositions[key].y].toString());
        while (toSearch.length > 0) {
            const searching = toSearch.shift();
            for (const dir of generalDirs) {
                const newX = searching.x + dir.x;
                const newY = searching.y + dir.y;
                const newSteps = searching.steps + 1;

                if (stepsSet.has([newX, newY].toString())) continue;

                const field = map[newY][newX];
                if (field === "#") continue;

                if (isNumber(field)) keyDistances[field] = newSteps;

                stepsSet.add([newX, newY].toString());
                toSearch.push({x: newX, y: newY, steps: newSteps});
            }
        }
    });
    console.log(distances);
    return [ numbers.split("").sort(), distances ];
};

const task = ([numbers, distances], task) => {
    if (task === undefined) numbers.shift();
    const permutations = getAllPermutations(numbers);
    let shortest = 10e10;
    for (const perm of permutations) {
        perm.unshift("0");
        if (task === "task2") perm.push("0");
        let distance = 0;
        for (let i = 0; i < perm.length - 1; i++) {
            distance += distances[perm[i]][perm[i+1]];
        }
        if (distance < shortest) shortest = distance;
    }
    return shortest;
};

let testdata = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task(testdata), 14);

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");