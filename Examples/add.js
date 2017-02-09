let add = (a) => {
    return (b) => {
        return a + b;
    };
};

let add2 = add(2);
