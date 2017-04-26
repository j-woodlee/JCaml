module.exports = class Args {
    constructor(args) {
        this.args = args;
    }

    analyze(context) {
        this.args.forEach((arg) => {
            arg.analyze(context);
        });
    }

    toString() {
        return this.args.toString();
    }
};
