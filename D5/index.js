console.log("AOC 2016 - Day 5: How About a Nice Game of Chess?");

const task1 = doorID => {
    let password = "";
    for (let index = 0;; index++) {
        if (index % 100000 === 0) console.log(index);
        let hash = MD5(doorID + index);
        if (hash.slice(0,5) === "00000") { 
            password += hash[5]; 
            console.log(password); 
        }
        if (password.length === 8) return password;
    }
};

const task2 = doorID => {
    const password = [];
    for (let i = 0; i < 8; i++) {
        password.push("_");
    }
    for (let index = 0;; index++) {
        if (index % 1000000 === 0) console.log(index);
        let hash = MD5(doorID + index);
        if (hash.slice(0,5) === "00000") { 
            passwordIndex = hash[5];
            if (passwordIndex >= 0 && passwordIndex <= 7 && password[passwordIndex] === "_") password[passwordIndex] = hash[6];
            console.log(password.join("")); 
        }
        if (!password.includes("_")) return password.join("");
    }
};

let testdata = `abc`;

console.log("");

//doEqualTest(task1(testdata), "18f47a30");

//console.log("Task 1: " + task1(inputdata));

//doEqualTest(task2(testdata), "05ace8e3");

console.log("Task 2: " + task2(inputdata));
