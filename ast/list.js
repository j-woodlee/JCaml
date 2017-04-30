module.exports = class List {
    constructor(elements) {
        this.elements = elements;
    }

    analyze() {
        if (this.elements.length !== 0) {
           if (!this.elements.every(e => e.type === this.elements[0].type)) {
             throw new Error("No heterogenous lists: All elements of a list must be of the same type.");
           }
        }
        this.isList = true;
    }

    toString() {
        return `[${this.elements.toString()}]`;
    }
};
