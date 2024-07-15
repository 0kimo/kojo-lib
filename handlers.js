"use strict";
/**
 * @author {0saphhy}
 * @description This code was written by "0saphhy"
 * Last Updated on: 10 S JUL 14 2024
 * TIME DAY MONTH DAY-OF-THE-MONTH YEAR
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.ButtonHandler = void 0;
class ButtonHandler {
    /**
     * @param {ButtonHandlerOptions} options
     * @description
     * Seperator = {A:user=0Sapphy} the ":" after the "A"
     *
     * Prefix = {A:user=0Saphhy} the "=" after "user"
     */
    constructor(options) {
        if (options === null || options === void 0 ? void 0 : options.args) {
            this.prefix = options.args.prefix;
            this.separator = options.args.separator;
        }
        else {
            this.prefix = "=";
            this.separator = ":";
        }
    }
    init(_id) {
        return {
            id: this.getCustomId(_id).id,
            arguments: this.getCustomId(_id).arguments,
            parsed: {
                arguments: this.applyArguments(this.getCustomId(_id).arguments)
            },
            options: new Options(this.applyArguments(this.getCustomId(_id).arguments))
        };
    }
    executeButton(info, interaction, folder) {
        try {
            require(`./handler/${folder ? folder : 'buttons'}/${info.id}`)(interaction, info);
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * @param {string} _id
     * @returns {ButtonHandlerCustomIdR}
     * @description A custom_id should be formatted as:
     * {A:user=0sapphy}-theactualbuttonid
     *
     * NOTES:
     *
     * A custom_id:
     *
     *     CAN CONTAIN More than one Argument (e.g: {A:eg=like}-{A:eg=this}-id)
     *
     *     CANNOT CONTAIN spaces, special chars & numbers
     *
     *     value: Though an argument value can contain pretty much anything, aslong as it does not acceed the limits places by Discord, API.
     *
     * The end part of the custom_id is the id that will be returned to the handler as the custom_id
     *
     *     There can only be one id
     *
     *     The id has to be at the end
     *
     *     right after the last "-" is the id
     *
     *     id cannot contain spaces, numbers & special chars
     */
    getCustomId(_id) {
        var _a;
        return {
            arguments: _id.match(/({.*?})/g),
            id: (_a = _id.match(/\w*$/g)) === null || _a === void 0 ? void 0 : _a.at(0)
        };
    }
    /**
     * @param {RegExpMatchArray|null|undefined} _params
     * @returns {Arguments[]}
     * @description Converts string options to more read-able options (?)
     */
    applyArguments(_params) {
        var _a, _b;
        if (!_params)
            return;
        const argument = [];
        for (const param of _params) {
            const exec = param.split(this.prefix);
            argument.push({
                name: (_a = exec.at(0)) === null || _a === void 0 ? void 0 : _a.split(this.separator).at(1),
                value: (_b = exec.at(1)) === null || _b === void 0 ? void 0 : _b.replace('}', '')
            });
        }
        return argument;
    }
}
exports.ButtonHandler = ButtonHandler;
class Options {
    constructor(_arguments) {
        this.data = _arguments;
    }
    getOption(_n, full) {
        var _a;
        const argument = (_a = this.data) === null || _a === void 0 ? void 0 : _a.find(i => i.name === _n);
        if (!argument)
            return null;
        if (full) {
            return argument;
        }
        else {
            return argument.value ? argument.value : null;
        }
    }
}
exports.Options = Options;
