"use strict";

import LMC from "./lmc.js";
import setup from "./setup.js";
import {getProgramText, setMachineCodeText, clearOutput, toggleRunStopText} from "./interface.js";
import assemble from "./assembler.js";
import "./examples.js";

setup();

var lmc = new LMC();

document.getElementById("assemble").addEventListener("click", () => {
    try {
        var instructions = assemble(getProgramText());
        setMachineCodeText(instructions.join("\n"));
        lmc.load(instructions);
    } catch (e) {
        alert("Assembler error:\n" + e);
    }
});

document.getElementById("step").addEventListener("click", () => {
    lmc.cycle();
});

document.getElementById("run_stop").addEventListener("click", () => {
    if(document.getElementById("run_stop").innerHTML === "Run")
        clearOutput();
    lmc.toggle();
    toggleRunStopText();
});
