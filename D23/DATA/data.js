let inputdata = `
cpy a b     // 0: b = a
dec b       // 1: b--
cpy a d     // 2: d = a
cpy 0 a     // 3: a = 0
cpy b c     // 4: c = b
inc a       // 5: a++
dec c       // 6: c--
jnz c -2    // 7: (c!==0) goto 5
dec d       // 8: d--
jnz d -5    // 9: (d!==0) goto 4
dec b       // 10: b--
cpy b c     // 11: c = b
cpy c d     // 12: d = c
dec d       // 13: d--
inc c       // 14: c++
jnz d -2    // 15: (d!==0) goto 13
tgl c       // 16: what is in C??
cpy -16 c   // 17: c = -16
jnz 1 c     // 18: goto 2   (after toggle c = 1)
cpy 75 c    // 19: c = 75
jnz 72 d    // 20: d = 72   (toggled goto)
inc a       // 21: a++
inc d       // 22: d--      (toggled d++)
jnz d -2    // 23: (d!==0) goto 21
inc c       // 24: c--      (toggled c++)
jnz c -5`;  // 25: (c!==0) goto 20