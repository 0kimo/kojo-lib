"use strict";
/**
 * @author {0Saphhy}
 * Last Updated: 11 M JUL 15 2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnySelectMenuHandler = void 0;
const Options_1 = require("./utils/Options");
class AnySelectMenuHandler {
  constructor(options) {
    if (options.args) {
      this.prefix = options.args.prefix;
      this.separator = options.args.separator;
    } else {
      this.prefix = "=";
      this.separator = ":";
    }
  }
  init(_id) {
    return {
      id: this.getCustomId(_id).id,
      arguments: this.getCustomId(_id).arguments,
      options: new Options_1.Options(
        this.applyArguments(this.getCustomId(_id).arguments),
      ),
      parsed: {
        arguments: this.applyArguments(this.getCustomId(_id).arguments),
      },
    };
  }
  executeThis(info, interaction, path) {
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
  getCustomId(_id) {
    return {
      id: _id.match(/\w*$/g),
      arguments: _id.match(/({.*?})/g),
    };
  }
  applyArguments(_params) {
    var _a, _b;
    if (!_params) return;
    const argument = [];
    for (const param of _params) {
      const exec = param.split(this.prefix);
      argument.push({
        name:
          (_a = exec.at(0)) === null || _a === void 0
            ? void 0
            : _a.split(this.separator).at(1),
        value:
          (_b = exec.at(1)) === null || _b === void 0
            ? void 0
            : _b.replace("}", ""),
      });
    }
    return argument;
  }
  getPath(_i) {
    return `./src/SelectMenu/${_i.id}`;
  }
}
exports.AnySelectMenuHandler = AnySelectMenuHandler;
