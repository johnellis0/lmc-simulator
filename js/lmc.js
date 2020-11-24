"use strict";

function getMemoryCell(address){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    return cell.value;
}

function setMemoryCell(address, value){
    var cell = document.getElementById("mem_input_" + parseInt(address));
    cell.value = value.padStart(3, "0");
}

function getPC(){
    var pc = document.getElementById("pc");
    return pc.value;
}

function setPC(value){
    var pc = document.getElementById("pc");
    pc.value = value;
}

function getACC(){
    var acc = document.getElementById("acc");
    return acc.value;
}

function setACC(value){
    var acc = document.getElementById("acc");
    acc.value = value;
}

export default function LMC(){
    this.pc = 0;
    this.acc = 0;
    this.negativeFlag = false;
}

LMC.prototype = {
    ...LMC.prototype,
    cycle: function() {

    }
}
