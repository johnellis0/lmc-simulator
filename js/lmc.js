"use strict";

function getMemoryCell(address){
    var cell = document.getElementById("mem_input_" + address);
    return cell.value;
}

function setMemoryCell(address, value){
    var cell = document.getElementById("mem_input_" + address);
    cell.value = value;
}

export default function LMC(){
    this.pc = 0;
    this.acc = 0;
}

LMC.prototype = {
    ...LMC.prototype,
    cycle: function() {

    }
}
