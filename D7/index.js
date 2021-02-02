console.log("AOC 2016 - Day 7: Internet Protocol Version 7");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    let addresses = [];
    for (const line of data) {
        let supernets = line.split(/\[\w+\]/);
        let hypernetRe = /\[(\w+)\]/g;
        let hypernets = [];
        while (hypernet = hypernetRe.exec(line)) hypernets.push(hypernet[1]);
        addresses.push({ supernets, hypernets });
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
        for (const n of addr.supernets) if (n.hasABBA()) { count++; continue mainLoop; }
    }
    return count;
};

const task2 = addresses => {
    let count = 0;
    mainLoop: for (const addr of addresses) {
        hypernets = addr.hypernets.join();
        for (const s of addr.supernets) {
            for (let i = 0; i < s.length - 2; i++) {
                if (s.charAt(i) === s.charAt(i+2) && s.charAt(i) !== s.charAt(i+1)) {
                    let bab = s.charAt(i+1) + s.charAt(i) + s.charAt(i+1);
                    if (hypernets.indexOf(bab) !== -1) { count++; continue mainLoop; }
                }
            } 
        }
    }
    return count;    
}

let testdata1 = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`;

let testdata2 = `aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`;

inputdata = prepare(splitLines(inputdata));

testdata1 = prepare(splitLines(testdata1));
testdata2 = prepare(splitLines(testdata2));

console.log("");

doEqualTest(task1(testdata1), 2);

console.log("Task 1: " + task1(inputdata));

console.log("");

doEqualTest(task2(testdata2), 3);

console.log("Task 2: " + task2(inputdata));