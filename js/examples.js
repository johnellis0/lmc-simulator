'use strict';

import {setProgramText} from "./interface.js";

const examples = {
    ADD2: "INP\n" +
        "STA NUM\n" +
        "INP\n" +
        "ADD NUM\n" +
        "OUT\n" +
        "HLT\n" +
        "NUM DAT\n",
    SUB2: "INP\n" +
        "STA NUM1\n" +
        "INP\n" +
        "STA NUM2\n" +
        "LDA NUM1\n" +
        "SUB NUM2\n" +
        "OUT\n" +
        "HLT\n" +
        "NUM1 DAT\n" +
        "NUM2 DAT\n",
    
}

function loadExample(e){
    if(confirm("Press OK to load example.\nThis will clear current program")){
        if(examples.hasOwnProperty(e.target.value))
            setProgramText(examples[e.target.value]);
    }
    document.getElementById("examples").value = "";
}

document.getElementById("examples").addEventListener("change", loadExample)
