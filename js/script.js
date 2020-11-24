"use strict";

import LMC from "./lmc.js";
import setup from "./setup.js";
import {getProgramText, setMachineCodeText} from "./interface.js";

setup();

document.getElementById("assemble").addEventListener("click", () => {
    setMachineCodeText(getProgramText());
});
