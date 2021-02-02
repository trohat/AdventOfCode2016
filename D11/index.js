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

const enumerateState = (floors, test) => {
    let itemsInFloors = {};
    let items = [ "P", "Q", "R", "S", "T"];
    if (test === "test") items = [ "H", "L"];
    floors.forEach((floor, floorIndex) => {
        floor.forEach((item) => {
            itemsInFloors[item] = floorIndex + 1;
        })
    });
    return items.map(i => "" + itemsInFloors[i + "G"] + itemsInFloors[i + "M"]).sort((a,b) => a-b).join("");
};

let elevatorDirs = [ [ 1 ], [ 1, -1 ], [ 1, -1 ], [ -1 ]];

const task1 = (floors, test) => {
    const makeOneStep = (floors, elevator, steps, states, test) => {
        let topFloorLength = 8;
        if (test === "test") topFloorLength = 4;
        if (floors[3].length === topFloorLength) {
            //console.log("Found");
            let length = steps.length;
            if (length < shortest) shortest = length;
            //console.log("Length: " + length);
            //console.log("Steps: " + steps.join("  "));
            //console.log("");
        }
        let madeMoves = [];
        let newStates;
        
        let state = enumerateState(floors, test);
        if (states.includes(state)) return;
        newStates = [ ...states, state];
        
        let possibleMoves = generateElevatorContent(floors[elevator]);
        possibleMoves = possibleMoves.filter(move => isValid(floors[elevator].filter(item => !move.includes(item))));
        for (const dir of elevatorDirs[elevator]) {
            const newElevator = elevator + dir;
            for (const move of possibleMoves) {

                // stop if repeating last move
                let newStep = dir + ":" + move.toString();
                let stepToStopRepeating;
                if (newStep[0] === "-") stepToStopRepeating = newStep.slice(1);
                else stepToStopRepeating = "-" + newStep;
                if (stepToStopRepeating === steps[steps.length-1]) continue;

                const newFloorContent = move.concat(floors[newElevator]);
                if (isValid(newFloorContent)) {
                    let newFloors = floors.map( (floor, index) => {
                        if (index === elevator) return floor.filter(item => !move.includes(item));
                        if (index === newElevator) return move.concat(floor);
                        return floor;
                    });
                    
                    let moveState = enumerateState(newFloors, test);
                    if (madeMoves.includes(moveState)) continue;
                    madeMoves.push(moveState);
                    
                    let newSteps = [...steps, newStep];
                    uniqueStates.add(enumerateState(floors));
                    if (newSteps.length < 8) makeOneStep(newFloors, newElevator, newSteps, newStates, test);
                    else ;
                    //(console.log (steps.join("  "), "  ", elevator, "  ", possibleMoves.join("-"),"  " ,floors.join("--")));
                }
            }
        }
    }
    let uniqueStates = new Set();
    let shortest = 10e10;
    let steps = [];
    let states = [];
    let elevator = 0;
    makeOneStep(floors, elevator, steps, states, test);
    console.log(uniqueStates);
    return shortest;
};

const task2 = data => {
    
}

let testdata = [ [ "HM", "LM"], [ "HG" ], [ "LG" ], [] ];

console.log("");


console.time();
//doEqualTest(task1(testdata, "test"), 11);
console.log("Task 1: " + task1(inputdata));
console.timeEnd();

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));

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

/*
console.log(generateElevatorContent([ "AG", "AM", "CG", "DG"]));
console.log(generateElevatorContent([ "AG" ]));
console.log(generateElevatorContent([ "AG", "AM"]));
console.log(generateElevatorContent([]));
*/