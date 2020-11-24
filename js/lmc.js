"use strict";

import {opcodes} from "./assembler.js";

function getMemoryCell(address){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    return cell.value;
}

function setMemoryCell(address, value){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    cell.value = value.padStart(3, "0");
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
        return this._acc;
    },
    set acc(value) {
        document.getElementById("acc").value = value;
        this._acc = value;
    },

    get pc(){
        return this._pc;
    },
    set pc(value){
        document.getElementById("pc").value = value;
        this._pc = value;
    },

    load: function(instructions){
        for(var i=0; i<instructions.length; i++){
            setMemoryCell(i, instructions[i]);
        }
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

        }

        return true;
    },

    run: function(){
        while(this.cycle()){}
    }
}
