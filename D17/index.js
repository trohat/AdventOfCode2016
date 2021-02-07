console.log("AOC 2016 - Day 17: Two Steps Forward");

const dirs = new Map([[ 0, "U"], [ 1, "D"], [ 2, "L"], [ 3, "R"]]);

const task1 = passcode => {
    
    let paths = [{ x: 0, y: 0, path: ""}];

    while (true) {
        const newPaths = [];
        const validChars = ["b", "c", "d", "e", "f"];
        for (const path of paths)  {
            const hash = MD5(passcode + path.path);
            for (const [n, dir] of dirs) {
                if (validChars.includes(hash[n])) {
                    const newX = path.x + wordsToDirs.get(charsToDirs.get(dir)).x;
                    const newY = path.y + wordsToDirs.get(charsToDirs.get(dir)).y;
                    if (newX === 3 && newY === 3) return path.path + dir;
                    if (newX < 0 || newY < 0 || newX > 3 || newY > 3) continue;

                    newPaths.push({ x: newX, y: newY, path: path.path + dir });
                }
            }
        }
        paths = newPaths;
    }
};

const task2 = passcode => {

    let paths = [{ x: 0, y: 0, path: ""}];
    let longest = 0;

    while (paths.length > 0) {
        const newPaths = [];
        const validChars = ["b", "c", "d", "e", "f"];
        for (const path of paths)  {
            const hash = MD5(passcode + path.path);
            for (const [n, dir] of dirs) {
                if (validChars.includes(hash[n])) {
                    const newX = path.x + wordsToDirs.get(charsToDirs.get(dir)).x;
                    const newY = path.y + wordsToDirs.get(charsToDirs.get(dir)).y;
                    if (newX === 3 && newY === 3) {
                        let l = path.path.length + 1;
                        if (l > longest) longest = l;
                        continue;
                    }
                    if (newX < 0 || newY < 0 || newX > 3 || newY > 3) continue;

                    newPaths.push({ x: newX, y: newY, path: path.path + dir });
                }
            }
        }
        paths = newPaths;
    }
    return longest;
}

let testdata1 = `ihgpwlah`;
let testdata2 = `kglvqrro`;
let testdata3 = `ulqzkmiv`;

console.log("");

doEqualTest(task1(testdata1), "DDRRRD");
doEqualTest(task1(testdata2), "DDUDRLRRUDRD");
doEqualTest(task1(testdata3), "DRURDRUDDLLDLUURRDULRLDUUDDDRR");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata1), 370);
doEqualTest(task2(testdata2), 492);
doEqualTest(task2(testdata3), 830);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");