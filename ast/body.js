module.exports = class Body {
    constructor(block) {
        this.block = block;
    }

    analyze(context) {
        this.block.analyze(context);
    }

    toString() {
        const bodyString = `(Body :${this.block};;)`;
        return bodyString;
    }
};
