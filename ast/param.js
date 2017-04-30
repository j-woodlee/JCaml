module.exports = class Param {
    constructor(id) {
        this.id = id;
    }
    // analyze(context) {
    //     this.param.analyze(context);
    // }
    toString() {
        const paramString = `${this.id}`;
        return paramString;
    }
};
