"use strict";

import {opcodes} from "./assembler.js";

function getMemoryCell(address){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    return cell.value;
}

function setMemoryCell(address, value){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    cell.value = value.toString().padStart(3, "0");
}

function outputValue(value){
    var output = document.getElementById("output");
    output.value += value;
}

export default function LMC(){
    this.pc = 0;
    this.acc = 0;
    this.negativeFlag = false;
}

LMC.prototype = {
    ...LMC.prototype,

    _pc: 0,
    _acc: 0,

    get acc() {
        return parseInt(this._acc);
    },
    set acc(value) {
        document.getElementById("acc").value = value.toString().padStart(3, "0");
        this._acc = parseInt(value);
        this.negativeFlag = false;
    },

    get pc(){
        return parseInt(this._pc);
    },
    set pc(value){
        document.getElementById("pc").value = value.toString().padStart(2, "0");
        this._pc = parseInt(value);
    },

    load: function(instructions){
        for(var i=0; i<100; i++){
            setMemoryCell(i, 0);
        }

        for(var i=0; i<instructions.length; i++){
            setMemoryCell(i, instructions[i]);
        }

        this.pc = 0;
        this.acc = 0;
        this.negativeFlag = false;
    },

    cycle: function(){
        var instruction = getMemoryCell(this.pc);
        this.pc++;

        if(Object.values(opcodes).includes(instruction)){
            switch(instruction){
                case opcodes.HLT:
                    return false;

                case opcodes.INP:
                    var input = prompt("Input number (0-999)");

                    while(isNaN(input) || parseInt(input) < 0 || parseInt(input) > 999){
                        input = prompt("Input number (0-999)");
                    }

                    this.acc = input;

                    break;

                case opcodes.OUT:
                    outputValue(this.acc);

                    break;
            }
        }else{
            var opcode = instruction.substring(0, 1);
            var address = instruction.substring(1);

            switch(opcode){
                case opcodes.ADD:
                    this.acc += getMemoryCell(address);
                    break;
                case opcodes.SUB:
                    var result = this.acc - parseInt(getMemoryCell(address));
                    var negative = result < 0;

                    this.acc = negative ? result + 999 : result;
                    this.negativeFlag = negative;

                    break;
                case opcodes.STA:
                    setMemoryCell(address, this.acc);

                    break;
                case opcodes.LDA:
                    this.acc = getMemoryCell(address);

                    break;
                case opcodes.BRA:
                    this.pc = address;

                    break;
                case opcodes.BRZ:
                    if(this.acc === 0 && !this.negativeFlag)
                        this.pc = address;

                    break;
                case opcodes.BRP:
                    if(!this.negativeFlag)
                        this.pc = address;

                    break;
            }

        }

        return true;
    },

    run: function(){
        while(this.cycle()){}
    }
}
