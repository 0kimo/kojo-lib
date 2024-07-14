/**
 * @author {0saphhy}
 * @description This code was written by "0saphhy"
 * Last Updated on: 10 S JUL 14 2024
 * TIME DAY MONTH DAY-OF-THE-MONTH YEAR
 */


import { Arguments, ButtonHandlerCustomIdR } from "./types";

export class ButtonHandler {
    init(_id: string) {
        return {
            id: this.getCustomId(_id).id,
            arguments: this.getCustomId(_id).arguments,
            parsed: {
                arguments: this.applyArguments(this.getCustomId(_id).arguments)
            },

            options: new Options(this.applyArguments(this.getCustomId(_id).arguments))
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
    getCustomId(_id: string): ButtonHandlerCustomIdR {
        return {
            arguments: _id.match(/({.*?})/g),
            id: _id.match(/\w*$/g)?.at(0)
        }
    }

    /**
     * @param {RegExpMatchArray|null|undefined} _params 
     * @returns {Arguments[]}
     * @description Converts string options to more read-able options (?)
     */
    applyArguments(_params: RegExpMatchArray | null | undefined): Arguments[] | undefined {
        if (!_params) return;
        const argument: Arguments[] = [];

        for (const param of _params) {
            const exec = param.split("=")
            argument.push({
                name: exec.at(0)?.split(':').at(1),
                value: exec.at(1)?.replace('}', '')
            })
        }

        return argument
    }
}


export class Options {
    protected data;

    constructor(_arguments: Arguments[] | undefined) {
        this.data = _arguments;
    }

    getOption(_n: string, full?: boolean): Arguments | string | null {
        const argument = this.data?.find(i => i.name === _n);
        if (!argument) return null;
        

        if (full) {
            return argument
        } else {
            return argument.value ? argument.value : null
        }
    }
}