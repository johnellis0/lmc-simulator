"use strict";

const commentPrefix = "//";
export const opcodes = {ADD: "1", SUB: "2", STA: "3", LDA: "5", BRA: "6", BRZ: "7", BRP: "8", INP: "901", OUT: "902", HLT: "000", DAT: ""};
const requiresAddress = [opcodes.ADD, opcodes.SUB, opcodes.STA, opcodes.LDA, opcodes.BRA, opcodes.BRZ, opcodes.BRP, opcodes.DAT];

/**
 * Returns opcode & address from text or null if instruction not present
 * @param text
 * @returns {{address: null, opcode: *}|null}
 */
function parseInstruction(text){
    if(text.indexOf(commentPrefix) !== -1) // Remove comments
        text = text.substring(0, text.indexOf(commentPrefix));

    var opcode = null, address = null;

    var splits = text.toUpperCase().split(" ").filter(t => t !== ""); // Remove empty strings after split

    if(splits.length === 0)
        return null;
    if(splits.length > 2)
        throw "Invalid instruction: "+ text;

    if(Object.keys(opcodes).includes(splits[0])) {
        opcode = opcodes[splits[0]];

        if (requiresAddress.includes(opcode)) { // if address required
            if (splits.length !== 2)
                throw "Invalid instruction: " + text;

            address = splits[1].padStart(2, "0");
        }else{
            if (splits.length !== 1)
                throw "Invalid instruction: " + text;
        }
    }else{
        throw "Invalid instruction: " + text;
    }

    return {opcode, address}
}

export default function assemble(program){
    var lines = program.split("\n");

    var instructions = [];
    var labels = [];

    lines.forEach((line) => {
        var instruction = parseInstruction(line);

        if(instruction !== null){
            var text = instruction.opcode + (instruction.address === null ? "" : instruction.address);
            text = text.padStart(3, "0");
            instructions.push(text);
        }
    });

    return instructions;
}
