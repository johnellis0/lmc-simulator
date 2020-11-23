"use strict";

function new_memory_cell(address){
    var memory_cell = document.createElement("div");
    memory_cell.className = "memory-cell";

    var memory_label = document.createElement("div");
    memory_label.className = "memory-label";
    memory_label.id = "mem_label_" + address;
    memory_label.innerHTML = address;

    var memory_input = document.createElement("input");
    memory_input.className = "memory-input";
    memory_input.id = "mem_input_" + address;

    memory_input.setAttribute("type", "number");
    memory_input.setAttribute("value", "0");
    memory_input.setAttribute("min", "0");
    memory_input.setAttribute("max", "999");
    memory_input.setAttribute("maxlength", "3");
    memory_input.setAttribute("size", "3");

    memory_cell.appendChild(memory_label);
    memory_cell.appendChild(memory_input);
    return memory_cell;
}

function create_memory_cells(){
    var memory_container = document.getElementById("memory-container");

    for(var i=0; i <= 99; i++){
        memory_container.appendChild(new_memory_cell(i));
    }
}

create_memory_cells();