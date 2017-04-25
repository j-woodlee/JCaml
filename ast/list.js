module.exports = class List {
    constructor(binexps) {
        this.binexps = binexps;
    }

    analyze(context) {
        const typeOfFirstElem = this.binexp[0].type;
        this.binexps.forEach((binexp) => {
            binexp.analyze(context);
            if (binexp.type !== typeOfFirstElem) {
                throw new Error("No heterogenous lists: " +
                "All elements of a list must be of the same type");
            }
        });
    }

    toString() {
        return `(List ${this.arg})`;
    }
};
