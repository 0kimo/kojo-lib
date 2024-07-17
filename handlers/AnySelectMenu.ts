/**
 * @author {0Saphhy}
 * Last Updated: 11 M JUL 15 2024
 */

import { ChatInputCommandInteraction } from "discord.js";
import { AnyHandlerInitReturn, AnyHandlerOptions, Arguments } from "../types";
import { Options } from "./utils/Options";
import path from "path";

export class AnySelectMenuHandler {
  prefix: string;
  separator: string;

  constructor(options: AnyHandlerOptions) {
    if (options.args) {
      this.prefix = options.args.prefix;
      this.separator = options.args.separator;
    } else {
      this.prefix = "=";
      this.separator = ":";
    }
  }

  init(_id: string): AnyHandlerInitReturn {
    return {
      id: this.getCustomId(_id).id,
      arguments: this.getCustomId(_id).arguments,
      options: new Options(
        this.applyArguments(this.getCustomId(_id).arguments),
      ),
      parsed: {
        arguments: this.applyArguments(this.getCustomId(_id).arguments),
      },
    };
  }

  executeThis(
    info: AnyHandlerInitReturn,
    interaction: ChatInputCommandInteraction,
    path?: string,
  ) {
    try {
      const p = path ? path : this.getPath(info);
      require(p)(interaction, info);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @param {string} _id
   */
  getCustomId(_id: string) {
    return {
      id: _id.match(/\w*$/g),
      arguments: _id.match(/({.*?})/g),
    };
  }

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

  private getPath(_i: AnyHandlerInitReturn) {
    return `./src/SelectMenu/${_i.id}`;
  }
}
