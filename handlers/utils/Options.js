"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
class Options {
  constructor(_arguments) {
    this.data = _arguments;
  }
  getOption(_n, full) {
    var _a;
    const argument =
      (_a = this.data) === null || _a === void 0
        ? void 0
        : _a.find((i) => i.name === _n);
    if (!argument) return null;
    if (full) {
      return argument;
    } else {
      return argument.value ? argument.value : null;
    }
  }
}
exports.Options = Options;
