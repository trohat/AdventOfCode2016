console.log("AOC 2016 - ");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let addresses = [];
    for (const line of data) {
        let normals = line.split(/\[\w+\]/);
        let hypernetRe = /\[(\w+)\]/g;
        let hypernets = [];
        while (hypernet = hypernetRe.exec(line)) hypernets.push(hypernet[1]);
        addresses.push({ normals, hypernets });
    }
    return addresses;
};

String.prototype.hasABBA = function() {
    for (let i = 0; i < this.length - 3; i++) {
        if (this.charAt(i) === this.charAt(i+3) && this.charAt(i+1) === this.charAt(i+2) && this.charAt(i) !== this.charAt(i+1)) return true;
    }
    return false;
};

const task1 = addresses => {

    let count = 0;
    mainLoop: for (const addr of addresses) {
        for (const h of addr.hypernets) if (h.hasABBA()) continue mainLoop;
        for (const n of addr.normals) if (n.hasABBA()) { count++; continue mainLoop; }
    }
    return count;
};

const task2 = addresses => {
    
}

let testdata = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

testdata = prepare(splitLines(testdata));

console.log(testdata);

console.log("");

doEqualTest(task1(testdata), 2);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

//console.log("Task 2: " + task2(inputdata));