let inputdata = `
cpy 1 a     // 0: a = 1
cpy 1 b     // 1: b = 1
cpy 26 d    // 2: d = 26
jnz c 2     // 3: (c!==0) skipnext
jnz 1 5     // 4: goto 9
cpy 7 c     // 5: c = 7
inc d       // 6: d++
dec c       // 7: c--
jnz c -2    // 8: (c!==0) goto 6
cpy a c     // 9: c = a
inc a       // 10: a++
dec b       // 11: b--
jnz b -2    // 12: (b!==0) goto 10
cpy c b     // 13: b = c
dec d       // 14: d--
jnz d -6    // 15: (d!==0) goto 9
cpy 17 c    // 16: c = 17
cpy 18 d    // 17: d = 18
inc a       // 18: a++
dec d       // 19: d--
jnz d -2    // 20: (d != 0) goto 18
dec c       // 21: c--
jnz c -5`;  // 22: (c !== 0) goto 17