console.log("AOC 2016 - Day 16: Dragon Checksum");

const task = (data, diskLength) => {
    while (data.length < diskLength) {
        let a = data;
        let b = data.reverse();
        let c = "";
        for (const char of b) {
            c += 1 ^ char;
        }
        data = a + "0" + c;
    }
    data = data.slice(0,diskLength);

    while (data.length % 2 === 0) {
        let newData = "";
        for (let i = 0; i < data.length; i += 2) {
            if (data[i] === data[i+1]) newData += "1";
            else newData += "0";
        }
        data = newData;
    }
    
    return data;
};

let testdata = "10000";

doEqualTest(task(testdata, 20), "01100");

console.time("Task 1");
console.log("Task 1: " + task(inputdata, 272));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, 35651584));
console.timeEnd("Task 2");