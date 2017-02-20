# JCaml
<p><img src="Logos/jcaml.png" width="250" height="250"></p>

##Introduction

####Welcome to the world of JCaml. Do you like to hump? Do you like to spit? JCaml has all these functions for you. To give you all the features of OCaml with the simplicity and ubiquity of JavaScript, JCaml has it all. This is our statically-typed, statically-scoped, superb language that cannot be beat.
##Features

####This language has everything. It has pattern-matching, dictionary capabilities, list comprehension, recursive functions, higher-order functions, currying, and tuples. If you want it, it has it.

##Macrosyntax

```Ohm
JCaml {
    Program       =  Block
    Block         =  (Stmt)*
    Stmt          =  Decl | id | Exp | stringlit | numlit
                  |  "if" Exp Block
                     ("else if" Exp Block)*
                     ("else" Block)                             -- if
                  |  Exp "?" Exp ";" Exp                        -- ternary

    Decl          =  "let" id "=" Exp                           -- decl
                  |  "let fun" id "=" Params "=>" returnVal ":" Body -- declFun
    Params        =  "(" Param ("," Param)* ")"
    Param         =  id
    returnVal     =  id

    Body          =  ":" Block ";;"
    Exp           =  "match" id "with" "\n" Matches
    Exp1          =  Exp1 adlop Exp1                            -- binary
                  |  Exp2
    Exp2          =  Exp2 mullop Exp2                           -- binary
                  |  Exp3
    Exp3          =  prefixop Exp3                              -- binary
                  |  Exp4
    Exp4          =  Exp4 expops Exp4                           -- binary
                  |  Exp5
    Exp5          =  "(" Exp ")"                                -- parens

    Matches       =  ("|" Exp "->" Exp "\n")+

    keyword       =  "if" | "else" | "with" | "in" | "bool" | "int" | "String"
                  |  "double" | "float" | "long" | "list" | "hump" | "tuplit" -- key

    prefixop      =  ~"--" "not" | "!" | "-" -- prefix

    id            =  ~keyword letter idrest*
    Tuplit        =  "(" Exp "," Exp ")"
    List          =  "[" (Exp ("," Exp))* "]"
    idrest        =  "_" | alnum | "@" | "$"
    relops        =  ">" | ">=" | "==" | "!=" | "<" | "<="
    adlop         =  "+" | "-" | "::"
    mullop        =  "*" | "/" | "%"
    expops        =  "^"
    binops        =  "||" | "or" | "&&" | "and"
    numlit        =  digit+
    char          =  escape
    escape        =  "\""
                  |  "\n"
                  |  "'"
                  |  "\t"
                  | "\\"
                  | "\\u{" hexDigit hexDigit hexDigit hexDigit "}"       -- codepoint
    charlit       =  "'" (char | "\"") "'"
    stringlit     =  "\"" (char | "\'")* "\""
    comment       =  "##" (~"\n" any)* "\n"
}
```

##Examples


###Hello World
JCaml                            | JavaScript
---------------------------------|-------------------------------------------------------------------------------------------
`spit("Hello, World");;`         | `console.log("Hello World");`

###Fibonacci Numbers
####JCaml
```
let fun fib = (int a) => (int):
    if(a == 0 or a == 1):
        hump 1
    else:
        hump fib(a-1) + fib(1-2)
;;
```

####JavaScript
```javascript
let fib = (a) => {
    if (a == 0 || a == 1) {
        return 1;
    } else {
        return fib(a - 1) + fib(a - 2);
    }
};
```

###Fibonacci Numbers Memoized
####JCaml
```
let fibDict = []
let fun fibMem = (int a) => (int):
    if (a == 0 or a == 1):
        hump 1
    else if (a in fibDict):
        hump fibDict[a]
    else:
        fibDict[a] = fibMem(a-1) + fibMem(a-2)
        hump fibDict[a]
;;
```

####JavaScript
```javascript
let dictionary = {};
let fibMem = (a) => {
    if(a == 0 || a == 1) {
        return 1;
    } else if(a in dictionary) {
        return dictionary[a];
    } else {
        dictionary[a] = fibMem(a - 1) + fibMem(a - 2);
        return dictionary[a];
    }
};
```

###Currying and Higher Order Functions
####JCaml
```
let fun add = (int a, int b) => (int):
    hump a + b;
;;
let fun add2 = add(2);;

```
####Javascript
```javascript
let add = (a) => {
    return (b) => {
        return a + b;
    };
};

let add2 = add(2);

```


###Match Statement
####JCaml
```
let fun count_occurences = (int v, int list l) => (int):
    match l with:
    | [] -> 0
    | hd::[] ->  hump hd == v ? 1 : 0
    | hd::tl ->  hump hd == v ? 1 + count_occurences(v, tl) ; count_occurences(v, tl)
;;

```
####Javascript
```javascript
let count_occurences = (v, l) => {
    let sum = 0;
    for (let value of l) {
      if(v === value) {
          sum++;
      }
    }
    return sum;
};

```
