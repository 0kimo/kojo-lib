import { 
    PermissionsString,
    ChatInputCommandInteraction,
    InteractionCollector,
} from 'discord.js'
import { Options } from './handlers';


interface KojoCommand {
    dev?: boolean
    category?: string;
    options?: {
        dm_permissions?: boolean;
        permissions?: {
            client?: PermissionsString[];
            member?: PermissionsString[];
        }
    };

    command: any;
    run?: (ctx: ChatInputCommandInteraction) => any;
}

interface Arguments {
    name: string | undefined,
    value: string | undefined
}

interface ButtonHandlerOptions {
    args?: {
        separator: string,
        prefix: string
    }
}

interface ButtonHandlerCustomIdR {
    id?: string,
    arguments?: RegExpMatchArray | null
}

interface ButtonHandlerInitOptions {
    id: string | undefined,
    arguments: RegExpMatchArray | undefined | null,
    options: Options,
    parsed: {
        arguments: Arguments[] | undefined
    }
}

export {
    KojoCommand,
    ButtonHandlerCustomIdR,
    ButtonHandlerOptions,
    ButtonHandlerInitOptions,
    Arguments
}