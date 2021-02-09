console.log("AOC 2016 - Day 19: An Elephant Named Joseph");

const task1 = elves => {
    let first = { number: 1 };
    first.next = first;
    let current = first;

    for (let i = 2; i <= elves; i++) {
        current.next = { number: i };
        current = current.next;
    }
    current.next = first;
    current = current.next;

    while (current !== current.next) {
        current.next = current.next.next;
        current = current.next;
    }

    return current.number;
};

const task2 = elves => {
    let first = { number: 1 };
    first.next = first;
    let current = first;

    for (let i = 2; i <= elves; i++) {
        current.next = { number: i };
        current = current.next;
    }
    current.next = first;
    current = current.next;

    let startAt = Math.floor(elves / 2);
    let moveTwo = true;
    if (elves % 2 === 0) moveTwo = false;

    while (current.number !== startAt) current = current.next;

    while (current !== current.next) {
        current.next = current.next.next;
        if (moveTwo) current = current.next;
        moveTwo = !moveTwo;
    }

    return current.number;
}

let testdata = 5;

console.log("");

doEqualTest(task1(testdata), 3);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), 2);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");