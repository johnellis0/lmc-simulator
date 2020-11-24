"use strict";

import LMC from "./lmc.js";
import setup from "./setup.js";
import {getProgramText, setMachineCodeText} from "./interface.js";
import assemble from "./assembler.js";

setup();

var lmc = new LMC();

document.getElementById("assemble").addEventListener("click", () => {
    var instructions = assemble(getProgramText());
    setMachineCodeText(instructions.join("\n"));
    lmc.load(instructions);
});
