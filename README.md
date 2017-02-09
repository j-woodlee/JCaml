# JCaml
<p><img src="jcaml.png" width="250" height="250"></p>

##Introduction

####Welcome to the world of JCaml. Do you like to hump? Do you like to spit? Then JCaml is perfect for you. To give you all the features of OCaml with the simplicity and ubiquity of JavaScript, JCaml has it all. This is our statically-typed, statically-scoped, superb language that cannot be beat.
##Features

####This language has everything. It has pattern-matching, dictionary capabilities, list comprehensio, recursive functions, higher-order functions, currying, and tuples. If you want it, it has it.
##Microsyntax

##Macrosyntax

##Examples


###Hello World
JCaml                            | JavaScript
---------------------------------|-------------------------------------------------------------------------------------------
`spit("Hello, World");;`         | `console.log("Hello World");`

###Fibonacci Numbers
####JCaml
```
let fun fib = (int a) => (int):
    if(a == 0 || a == 1):
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
    if (a == 0 || a == 1):
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
