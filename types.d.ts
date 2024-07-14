import { 
    PermissionsString,
    ChatInputCommandInteraction,
    InteractionCollector,
} from 'discord.js'


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

interface ButtonHandlerCustomIdR {
    id?: string,
    arguments?: RegExpMatchArray | null
}

export {
    KojoCommand,
    ButtonHandlerCustomIdR,
    Arguments
}