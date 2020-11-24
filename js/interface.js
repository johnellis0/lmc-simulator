"use strict";

export function getProgramText(){
    return document.getElementById("program").value;
}

export function setProgramText(text){
    document.getElementById("program").value = text;
}

export function setMachineCodeText(text){
    document.getElementById("machine-code").value = text;
}

export function clearProgram(){
    setProgramText("");
    setMachineCodeText("");
    document.getElementById("output").value = "";
}

document.getElementById("clear").addEventListener("click", clearProgram)
