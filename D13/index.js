console.log("AOC 2016 - Day 13: A Maze of Twisty Little Cubicles");

const prepare = (officeDesignersFavoriteNumber, width, height) => {
    let building = [];
    for (let i = 0; i < height; i++) {
        building.push("");
        for (let j = 0; j < width; j++) {
            let space = (j * j + 3 * j + 2 * j * i + i + i * i + officeDesignersFavoriteNumber).toString(2).countChar("1") % 2 === 0 ? "." : "#";
            building[i] += space;
        }
    }
    return building;
};

const task = (building, targetX, targetY, task) => {
    const visited = new Set();
    visited.add([1, 1].toString());

    const target = [targetX, targetY].toString();
    
    let maxSteps = 100;
    if (task !== "task1") maxSteps = 50;

    let states = [{ x: 1, y: 1 }];
    let steps = 0;

    while (steps < maxSteps) {
        steps++;
        let newStates = [];
        for (const state of states) {
            const x = state.x;
            const y = state.y;

            for (const dir of generalDirs) {
                const newY = y + dir.y;
                if (newY < 0 || newY >= building[0].length) continue;
                
                const newX = x + dir.x;
                if (newX < 0 || newX >= building.length) continue;

                if (building[newY][newX] === "#") continue;

                const newPlace = [newX, newY].toString();
                if (visited.has(newPlace)) continue;
                if (newPlace === target && task === "task1") return steps;

                visited.add(newPlace);
                newStates.push({ x: newX, y: newY });

            }
        }
        states = newStates;
    }

    return visited.size;
};

let testdata = ``;

inputdata = prepare(inputdata, 50, 50);

testdata = prepare(10, 10, 10);

console.log("");

doEqualTest(task(testdata, 7, 4, "task1"), 11);

console.time();
console.log("Task 1: " + task(inputdata, 31, 39, "task1"));
console.timeEnd();

console.log("");

console.log("Task 2: " + task(inputdata));