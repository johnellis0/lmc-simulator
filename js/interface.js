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

export function clearOutput(){
    document.getElementById("output").value = "";
}

export function clearProgram(){
    setProgramText("");
    setMachineCodeText("");
    clearOutput();
}

document.getElementById("reset").addEventListener("click", clearProgram)
