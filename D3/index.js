console.log("AOC 2016 - Day 3: Squares With Three Sides");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => data.map(line => line.trim().split(/\s+/).map(Number));

const task1 = triangles => {
    let count = 0;
    for (const triangle of triangles) {
        let a = triangle[0];
        let b = triangle[1];
        let c = triangle[2];
        if (a < b + c && b < a + c && c < a + b) count++; 
    }
    return count;
};

const task2 = triangles => {
    let count = 0;
    for (let i = 0; i < triangles.length; i +=3) {
        for (let j = 0; j < 3; j++) {
            let a = triangles[i][j];
            let b = triangles[i+1][j];
            let c = triangles[i+2][j];
            if (a < b + c && b < a + c && c < a + b) count++; 
        }
    }
    return count;
}

inputdata = prepare(splitLines(inputdata));

console.log("");

console.log("Task 1: " + task1(inputdata));

console.log("");

console.log("Task 2: " + task2(inputdata));