module.exports = class List {
    constructor(elements) {
        this.elements = elements;
    }

    analyze() {
        if (this.elements.length !== 0) {
           if (!this.elements.every(e => e.type === this.elements[0].type)) {
             throw new Error("No heterogenous lists: ");
           }
        }
    }

    toString() {
        return this.elements.toString();
    }
};
