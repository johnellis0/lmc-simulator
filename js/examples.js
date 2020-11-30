'use strict';

import {setProgramText} from "./interface.js";

const examples = {
    ADD2: "// Add 2 numbers example\n" +
        "// Adds first input to second\n" +
        "\n" +
        "INP // Get 1st number\n" +
        "STA NUM // Store at label \"NUM\"\n" +
        "INP // Get 2nd number\n" +
        "ADD NUM // Add 1st number\n" +
        "OUT // Output result\n" +
        "HLT // End program\n" +
        "\n" +
        "NUM DAT // Data label \"NUM\"\n" +
        "\n" +
        "// Press \"Assemble & Load\" to \n" +
        "// reset LMC and load program\n" +
        "// into memory\n" +
        "\n" +
        "// Then press \"Run\" to run\n" +
        "// program\n",
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
    MULT: "INP\n" +
        "STA NUM\n" +
        "INP\n" +
        "STA AMT\n" +
        "LOOP LDA RSLT\n" +
        "ADD NUM\n" +
        "STA RSLT\n" +
        "LDA AMT\n" +
        "SUB ONE\n" +
        "BRZ END\n" +
        "STA AMT\n" +
        "BRA LOOP\n" +
        "END LDA RSLT\n" +
        "OUT\n" +
        "HLT\n" +
        "NUM DAT\n" +
        "AMT DAT\n" +
        "ONE DAT 1\n" +
        "RSLT DAT\n"

}

function loadExample(e){
    if(confirm("Press OK to load example.\nThis will clear current program")){
        if(examples.hasOwnProperty(e.target.value))
            setProgramText(examples[e.target.value]);
    }
    document.getElementById("examples").value = "";
}

document.getElementById("examples").addEventListener("change", loadExample)
setProgramText(examples["ADD2"]);