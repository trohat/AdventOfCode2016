console.log("AOC 2016 - Day 22: Grid Computing");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    data.shift();
    data.shift();
    const nodeRe = /\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)%/;
    const nodes = [];
    for (const line of data) {
        const [ , x, y, size, used, avail, percent ] = nodeRe.exec(line).map(Number);
        nodes.push({ x, y, size, used, avail, percent});
    }
    return nodes;
};

const task1 = nodes => {
    nodes.sort((a, b) => a.used - b.used);

    nodesBySpace = [...nodes].sort((a, b) => a.avail - b.avail);

    console.log(nodes);

    const nodesTotal = nodes.length;
    const biggestSpace = nodesBySpace[nodesBySpace.length - 1].avail;

    let i = 0;
    let viablePairs = 0;

    for (const node of nodes) {
        if (node.used === 0) continue;
        if (node.used > biggestSpace) break;
        while (node.used > nodesBySpace[i].avail) i++;
        viablePairs += nodesTotal - i;
    }

    return viablePairs;
};

const task2 = nodes => {
    nodes.sort((a,b) => {
        if (a.y === b.y) return a.x - b.x;
        return a.y - b.y;
    });
    let maxX = 0;
    for (const node of nodes) {
        if (node.x > maxX) maxX = node.x;
    }
    let map = [];
    let firstHash = true;
    for (const node of nodes) {
        let char;
        if (node.used > 400) {
            if (firstHash) {
                firstHash = false;
                console.log("First hash at x = " + node.x + " and y = " + node.y + ".");
            }
            char = " # ";
        }
        else if (node.used === 0) {
            console.log("Empty at x = " + node.x + " and y = " + node.y + ".");
            char = " _ ";
        }
        else if (node.x === maxX && node.y === 0) {
            console.log("G at x = " + node.x + " and y = " + node.y + ".");
            char = " G ";
        }
        else char = " . ";
        if (node.y in map) map[node.y] += char;
        else {
            if (node.y < 10) map.push(" " + char);
            else map.push(char);
        }
    }
    console.log(map);
    
    // this is a nice puzzle, very easily solved by hand
    // you just need to realize there is only one empty node and treat the big nodes like walls
    // honestly, with code it would be much harder...
}

let testdata = `root@ebhq-gridcenter# df -h
Filesystem            Size  Used  Avail  Use%
/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`;

testdata = prepare(splitLines(testdata));

inputdata = prepare(splitLines(inputdata));

console.log("");

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

doEqualTest(task2(testdata), undefined);

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");