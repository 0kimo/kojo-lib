/**
 * @author {0saphhy}
 * @description This code was written by "0saphhy"
 * Last Updated: 10 S JUL 14 2024
 * TIME DAY MONTH DAY-OF-THE-MONTH YEAR
 */

import {
  Arguments,
  AnyHandlerCustomIdReturn,
  AnyHandlerInitReturn,
  AnyHandlerOptions,
} from "../types";
import { ChatInputCommandInteraction } from "discord.js";
import { Options } from "./utils/Options";

export class ButtonHandler {
  separator: string;
  prefix: string;

  /**
   * @param {ButtonHandlerOptions} options
   * @description
   * Seperator = {A:user=0Sapphy} the ":" after the "A"
   *
   * Prefix = {A:user=0Saphhy} the "=" after "user"
   */
  constructor(options?: AnyHandlerOptions) {
    if (options?.args) {
      this.prefix = options.args.prefix;
      this.separator = options.args.separator;
    } else {
      this.prefix = "=";
      this.separator = ":";
    }
  }

  init(_id: string): AnyHandlerInitReturn {
    const id = this.getCustomId(_id);

    return {
      id: id?.id,
      arguments: this.getCustomId(_id).arguments,
      parsed: {
        arguments: this.applyArguments(this.getCustomId(_id).arguments),
      },

      options: new Options(
        this.applyArguments(this.getCustomId(_id).arguments),
      ),
    };
  }

  executeButton(
    info: AnyHandlerInitReturn,
    interaction?: ChatInputCommandInteraction,
    path?: string,
  ) {
    try {
      require(`${path ? this.formatPath(path, info) : "./button"}/${info.id}`)(interaction, info);
    } catch (error) {
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
  getCustomId(_id: string): AnyHandlerCustomIdReturn {
    const parsed_id = _id.match(/\w*$/g);

    return {
      arguments: _id.match(/({.*?})/g),
      id: parsed_id,
    };
  }

  /**
   * @param {RegExpMatchArray|null|undefined} _params
   * @returns {Arguments[]}
   * @description Converts string options to more read-able options (?)
   */
  applyArguments(
    _params: RegExpMatchArray | null | undefined,
  ): Arguments[] | undefined {
    if (!_params) return;
    const argument: Arguments[] = [];

    for (const param of _params) {
      const exec = param.split(this.prefix);
      argument.push({
        name: exec.at(0)?.split(this.separator).at(1),
        value: exec.at(1)?.replace("}", ""),
      });
    }

    return argument;
  }

  private formatPath(_p: string, info: AnyHandlerInitReturn) {
    const id = info.id?.[0] ? info.id[0] : info.options.getOption("_dev", true);
    return _p
    .replace(`{{_id}}`, id!);
  }
}
