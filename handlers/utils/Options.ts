import { Arguments } from "../../types";

export class Options {
  protected data;

  constructor(_arguments: Arguments[] | undefined) {
    this.data = _arguments;
  }

  getOption(_n: string, required?: boolean) {
    const argument = this.data?.find((i) => i.name === _n);

    if (required) {
      if (!argument) {
        throw new Error("Argument was set to be required but got none.");
      }

      return argument.value;
    } else {
      return argument?.value;
    }
  }
}
