import {
  PermissionsString,
  ChatInputCommandInteraction,
  InteractionCollector,
} from "discord.js";
import { Options } from "./handlers/utils/Options";

interface KojoCommand {
  dev?: boolean;
  category?: string;
  options?: {
    dm_permissions?: boolean;
    permissions?: {
      client?: PermissionsString[];
      member?: PermissionsString[];
    };
  };

  command: any;
  run?: (ctx: ChatInputCommandInteraction) => any;
}

interface Arguments {
  name: string | undefined;
  value: string | undefined;
}

interface AnyHandlerOptions {
  args?: {
    separator: string;
    prefix: string;
  };
}

interface AnyHandlerCustomIdReturn {
  id: RegExpMatchArray | null;
  arguments?: RegExpMatchArray | null;
}

interface AnyHandlerInitReturn {
  id: RegExpMatchArray | null;
  arguments: RegExpMatchArray | null | undefined;
  options: Options;
  parsed: {
    arguments: Arguments[] | undefined;
  };
}

export {
  KojoCommand,
  AnyHandlerCustomIdReturn,
  AnyHandlerOptions,
  AnyHandlerInitReturn,
  Arguments,
};
