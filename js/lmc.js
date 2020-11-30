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
    output.value += value + "\n";
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

    clock: null,
    clockSpeed: 150,

    get acc() {
        return parseInt(this._acc);
    },
    set acc(value) {
        value = parseInt(value);

        if(value < 0){ // Underflow
            this._acc = value + 999;
            this.negativeFlag = true;
        }else if(value > 999){ // Overflow
            this._acc = value - 999;
            this.negativeFlag = true;
        }else{
            this._acc = value;
            this.negativeFlag = false;
        }

        document.getElementById("acc").value = this._acc.toString().padStart(3, "0");
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
                    if(this.clock !== null)
                        clearInterval(this.clock);
                    this.clock = null;
                    return false;

                case opcodes.INP:
                    do {
                        var input = prompt("Input number (0-999)");
                    } while(isNaN(input) || input === "" || input === null || parseInt(input) < 0 || parseInt(input) > 999);

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
                    this.acc += parseInt(getMemoryCell(address));
                    break;
                case opcodes.SUB:
                    this.acc -= parseInt(getMemoryCell(address));

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
        var inst = this;
        this.clock = setInterval(() => this.cycle(), this.clockSpeed);
    }
}
