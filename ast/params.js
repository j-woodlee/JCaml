module.exports = class Params {
    constructor(params) {
        this.params = params;
    }

    toString() {
        let paramsString = "Params (";
        for (const params in this.params) {
            paramsString += `, ${params}`;
        }

        paramsString += ")";
        return paramsString;
    }
};
