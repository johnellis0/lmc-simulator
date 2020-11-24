"use strict";

const commentPrefix = "//";
export const opcodes = {ADD: "1", SUB: "2", STA: "3", LDA: "5", BRA: "6", BRZ: "7", BRP: "8", INP: "901", OUT: "902", HLT: "000", DAT: ""};
const requiresAddress = [opcodes.ADD, opcodes.SUB, opcodes.STA, opcodes.LDA, opcodes.BRA, opcodes.BRZ, opcodes.BRP];

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

        if(requiresAddress.includes(opcode)) { // if address required
            if (splits.length !== 2)
                throw "Invalid instruction: " + text;

            address = splits[1];
        }else if(opcode === opcodes.DAT){
            if(splits.length === 1){
                address = "0";
            }else{
                address = splits[1];
            }
        }else{
            if (splits.length !== 1)
                throw "Invalid instruction: " + text;
        }
    }else{
        throw "Invalid instruction: " + text;
    }

    return {opcode, address}
}

function getLabel(text){
    var splits = text.toUpperCase().split(" ").filter(t => t !== "");

    if(splits.length === 0)
        return null;

    if(!Object.keys(opcodes).includes(splits[0])){
        return splits[0].toUpperCase();
    }

    return null;
}

export default function assemble(program){
    var lines = program.split("\n");

    var instructions = [];
    var labelTable = {};

    lines = lines.filter((line) => {
        //Remove empty lines & commented out lines
        var splits = line.split(" ").filter(t => t !== "");
        return !( splits.length === 0 || splits[0].startsWith(commentPrefix) );
    });

    for(var i=0; i<lines.length; i++){
        var label = getLabel(lines[i]);
        if(label !== null) {
            if(Object.keys(labelTable).includes(label))
                throw "Duplicate label: " + label;

            labelTable[label] = i;
            lines[i] = lines[i].substring(label.length + 1); // Remove leading label
        }
    }

    lines.forEach((line) => {
        var instruction = parseInstruction(line);

        if(instruction !== null){
            var text = instruction.opcode;

            if(instruction.address !== null){ // if instruction requires address
                if(isNaN(instruction.address)){ // if address is not a number it must be a label
                    if(!Object.keys(labelTable).includes(instruction.address.toUpperCase())) // ensure label in table
                        throw "Undefined label: " + instruction.address.toUpperCase();

                    text += labelTable[instruction.address].toString().padStart(2, "0"); // set address to that of label
                }else{
                    text += instruction.address.padStart(2, "0");
                }
            }

            text = text.padStart(3, "0");
            instructions.push(text);
        }
    });

    return instructions;
}
