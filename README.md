# Little Man Computer Simulator

The [Little Man Computer](https://lmc.johnellis.dev) is an instructional model of a computer using von-Neumann architecture.

## Assembler
### Instructions

It can be programmed in assembly, there are 10 available commands:
 - `ADD ##` Add value at address `##` to accummulator
 - `SUB ##` Subtract value at address `##` from accumulator
 - `STA ##` Store value in accumulator at address `##`
 - `LDA ##` Load value at address `##` in accumulator
 - `BRA ##` Branch to address `##`
 - `BRZ ##` Branch to address `##` if accumulator is zero
 - `BRP ##` Branch to address `##` if accumulator is positive
 - `INP` Get input from user and store in accumulator
 - `OUT` Output current value in accumulator
 - `HLT` Stop execution
 
There is also the following assembler instruction:
 - `DAT ##` Store value `##` in next available memory address
 
### Labels
 
The assembler also supports using labels which refer to memory addresses for easy of programming.

A label prefixing an instruction will be used as the memory address of that instruction.

`LABEL INP`

A label used after an instruction as the address will take on the memory address the label is set to as above.

`BRA LABEL`

A label used with a `DAT` instruction acts as a variable as it holds the memory address of this value.

`LABEL DAT 123`

This functionality can be used to create more complex programs without having to calculate memory addresses by hand.

### Comments
Anything prefixed by a `//` is treated as a comment by the assembler.

```
INP // Comments can be after an instruction
STA NUM
// Or on their own line
```

## Examples
Below are a few example programs. These are also available to load into the LMC by using the `Load example` dropdown.
#### Add 2 numbers
```
INP // Get 1st number
STA NUM // Store at label "NUM"
INP // Get 2nd number
ADD NUM // Add 1st number
OUT // Output result
HLT // End program

NUM DAT // Data label "NUM"
```

## More info

[Little Man Computer on Wikipedia](https://en.wikipedia.org/wiki/Little_man_computer)


## Authors
 - John Ellis - [GitHub](https://github.com/johnellis0) / [Portfolio](https://johnellis.dev)

## License
Released under [MIT](/LICENSE)
