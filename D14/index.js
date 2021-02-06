console.log("AOC 2016 - Day 14: One-Time Pad");

const task = (salt, task) => {
    let keysCount = 0;
    lookingForKeys = {};
    let keyIndexes = [];

    for (let index = 0; ; index++) {
        let hash;

        if (task === "task1") hash = MD5(salt + index);
        else {
            hash = salt + index;
            for (let i = 0; i < 2017; i++) {
                hash = MD5(hash);
            }
        }
        let lastChar;
        let countChar = 0;
        let firstTriplet = true;
        for (const char of hash) {
            if (char === lastChar) countChar++;
            else countChar = 1;
            lastChar = char;

            if (countChar === 3 && firstTriplet) {
                firstTriplet = false;
                if (!(char in lookingForKeys)) lookingForKeys[char] = new Set();
                lookingForKeys[char].add(index);
            }

            if (countChar === 5 && char in lookingForKeys) {

                for (const oldIndex of lookingForKeys[char]) {
                    if (oldIndex !== index && oldIndex + 1000 > index) {
                        keysCount++;
                        keyIndexes.push(oldIndex);
                        if (keysCount === 70) return keyIndexes.sort((a,b) => a-b)[63];
                    }
                }
                lookingForKeys[char] = new Set([index]);
            }
        }
    }

};

let testdata = `abc`;

console.log("");

doEqualTest(task(testdata, "task1"), 22728);

console.time("Task 1");
console.log("Task 1: " + task(inputdata, "task1"));
console.timeEnd("Task 1");

console.log("");

//doEqualTest(task(testdata), 22551);

console.time("Task 2");
console.log("Task 2: " + task(inputdata));
console.timeEnd("Task 2");