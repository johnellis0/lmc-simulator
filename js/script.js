"use strict";

import LMC from "./lmc.js";
import setup from "./setup.js";
import {getProgramText, setMachineCodeText, clearOutput} from "./interface.js";
import assemble from "./assembler.js";

setup();

var lmc = new LMC();

document.getElementById("assemble").addEventListener("click", () => {
    var instructions = assemble(getProgramText());
    setMachineCodeText(instructions.join("\n"));
    lmc.load(instructions);
});

document.getElementById("cycle").addEventListener("click", () => {
    lmc.cycle();
});

document.getElementById("run").addEventListener("click", () => {
    clearOutput();
    lmc.run();
});
