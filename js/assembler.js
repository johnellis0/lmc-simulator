"use strict";

const instructions = {
    ADD: 1,
    SUB: 2,
    STA: 3,
    LDA: 5,
    BRA: 6,
    BRZ: 7,
    BRP: 8,
    INP: 901,
    OUT: 902,
    HLT: 0
};

export default function assemble(program){
    var lines = program.split("\n");
    console.log(lines);
    var machineCode = [];

    lines.forEach((line) => {
        console.log(line);
        var words = line.split(" ");
        console.log(words);
        var instruction = words[0];

        if(!Object.keys(instructions).includes(instruction)){
            throw "Invalid instruction";
        }

        if(["INP","OUT","HLT"].includes(instruction)){
            if(words.length > 1){
                throw "Invalid instruction";
            }
            machineCode.push(instructions[instruction]);
        }else{
            if(words.length !== 2){
                throw "Invalid instruction";
            }
            var address = words[1];

            machineCode.push(instructions[instruction] + address);
        }
    })

    return machineCode.join("\n");
}
