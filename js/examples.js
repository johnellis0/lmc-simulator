'use strict';

import {setProgramText} from "./interface.js";

const examples = {
    ADD2: "INP\n" +
        "STA NUM\n" +
        "INP\n" +
        "ADD NUM\n" +
        "OUT\n" +
        "HLT\n" +
        "NUM DAT\n"
}

function loadExample(e){
    if(confirm("Press OK to load example.\nThis will clear current program")){
        if(examples.hasOwnProperty(e.target.value))
            setProgramText(examples[e.target.value]);
    }
    document.getElementById("examples").value = "";
}

document.getElementById("examples").addEventListener("change", loadExample)
