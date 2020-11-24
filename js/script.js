"use strict";

import LMC from "./lmc.js";
import setup from "./setup.js";
import {getProgramText, setMachineCodeText} from "./interface.js";
import assemble from "./assembler.js";

setup();

document.getElementById("assemble").addEventListener("click", () => {
    setMachineCodeText(assemble(getProgramText()));
});
