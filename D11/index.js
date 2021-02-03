console.log("AOC 2016 - Day 11: Radioisotope Thermoelectric Generators");

const isValid = floor => {
    for (const item of floor) {
        if (item[1] === "M") {
            if (floor.includes(item[0] + "G")) continue;
            else for (const item2 of floor) if (item2[1] === "G") return false;
        }
    }
    return true;
};

const generateElevatorContent = floor => {
    let elevatorContent = [];
    for (const item of floor) elevatorContent.push([ item ]);
    for (let i = 0; i < floor.length; i++) {
        for (let j = i+1; j < floor.length; j++) {
            elevatorContent.push([ floor[i], floor[j] ]);
        }
    }
    return elevatorContent;
}

const enumerateState = (floors, elevator, task) => {
    let itemsInFloors = {};
    let items = [ "P", "Q", "R", "S", "T" ];
    if (task === "test") items = [ "H", "L"];
    if (task === "task2") items.push("D", "E");
    floors.forEach((floor, floorIndex) => {
        floor.forEach((item) => {
            itemsInFloors[item] = floorIndex + 1;
        })
    });
    return items.map(i => "" + itemsInFloors[i + "M"] + itemsInFloors[i + "G"]).sort((a,b) => a-b).join("") + "-" + (elevator + 1);
};

let elevatorDirs = [ [ 1 ], [ 1, -1 ], [ 1, -1 ], [ -1 ]];

const task1 = (floors, task) => {
    const maxSteps = 100;
    let steps = 0;
    let finalState = "4444444444-4";
    if (task === "test") finalState = "4444-4";
    if (task === "task2") finalState = "4444" + finalState;
    
    let uniqueStates = new Set();
    uniqueStates.add(enumerateState(floors, 0, task));
    let states = [ { floors, elevator: 0 } ];

    while (steps < maxSteps) {
        steps++;
        let newStates = [];
        for (const state of states) {
            let floors = state.floors;
            const elevator = state.elevator;
            
            let possibleMoves = generateElevatorContent(floors[elevator]);
            possibleMoves = possibleMoves.filter(move => isValid(floors[elevator].filter(item => !move.includes(item))));

            for (const dir of elevatorDirs[elevator]) {
                const newElevator = elevator + dir;
                
                for (const move of possibleMoves) {
                    const newFloorContent = move.concat(floors[newElevator]);
                    if (isValid(newFloorContent)) {
                        let newFloors = floors.map( (floor, index) => {
                            if (index === newElevator) return move.concat(floor);
                            if (index === elevator) return floor.filter(item => !move.includes(item));
                            return floor;
                        });
                        let state = enumerateState(newFloors, newElevator, task);
                        if (state === finalState) return steps;
                        if (!uniqueStates.has(state)) {
                            uniqueStates.add(state);
                            newStates.push({ floors: newFloors, elevator: newElevator });
                        }
                    }
                }       
            }
        } 
        states = newStates;
    }

    return "not found";
};

const task2 = floors => {
    floors[0].push("DM", "DG", "EM", "EG");
    return task1(floors, "task2")
}

let testdata = [ [ "HM", "LM"], [ "HG" ], [ "LG" ], [] ];

console.log("");

console.time();

doEqualTest(task1(testdata, "test"), 11);

console.log("Task 1: " + task1(inputdata));

console.log("");

console.log("Task 2: " + task2(inputdata));

console.timeEnd();



/*
Tests for helpers:
console.assert(isValid([]) === true);
console.assert(isValid([ "AM"]) === true);
console.assert(isValid([ "AG"]) === true);
console.assert(isValid([ "AG", "AM"]) === true);
console.assert(isValid([ "AG", "AM", "CG"]) === true);
console.assert(isValid([ "AG", "AM", "CG", "DG"]) === true);
console.assert(isValid([ "BG", "AG", "CG"]) === true);
console.assert(isValid([ "BM", "AM", "CM"]) === true);
console.assert(isValid([ "AG", "AM", "CM"]) === false);
console.assert(isValid([ "BG", "AM"]) === false);
console.assert(isValid([ "BG", "AM", "AG", "CM"]) === false);
console.assert(isValid([ "BG", "AM", "CM"]) === false);


console.log(generateElevatorContent([ "AG", "AM", "CG", "DG"]));
console.log(generateElevatorContent([ "AG" ]));
console.log(generateElevatorContent([ "AG", "AM"]));
console.log(generateElevatorContent([]));
*/