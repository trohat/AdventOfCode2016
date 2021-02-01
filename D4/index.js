console.log("AOC 2016 - Day 4: Security Through Obscurity");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /([a-z-]+)-(\d+)\[(\w{5})\]/;
    const rooms = [];
    for (const line of data) {
        [ , roomName, id, checksum ] = re.exec(line);
        rooms.push({ name: roomName.split("-").join(""), message: roomName, id: +id, checksum});
    }
    return rooms;
};

const task1 = rooms => {
    let sumIDs = 0;
    for (const room of rooms) {
        const sortingFunction = (a,b) => {
            let charactersCount = room.name.countChar(b) - room.name.countChar(a);
            if (charactersCount !== 0) return charactersCount;
            return ord(a) - ord(b);
        }

        room.name = [...new Set(room.name.split("").sort(sortingFunction))].slice(0,5).join("");
        if (room.name === room.checksum) sumIDs += room.id;
    }
    return sumIDs;
};

const task2 = rooms => {
    for (const room of rooms) {
        let message = "";
        const shift = room.id % 26;
        for (const char of room.message) {
            if (char === "-") {
                message += char;
                continue;
            } 
            let n = ord(char) + shift;
            if (n > 122) n-= 26;
            message += chr(n);
        }
        if (message.indexOf("northpole") !== -1) return message + " has id " + room.id;
    }
}

let testdata = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]
qzmt-zixmtkozy-ivhz-343[test2]`;

inputdata = prepare(splitLines(inputdata));

testdata = prepare(splitLines(testdata));

console.log("");

doEqualTest(task1(testdata), 123+987+404);

console.log("Task 1: " + task1(inputdata));

console.log("");

//doEqualTest(task2(testdata), 336);

console.log("Task 2: " + task2(inputdata));