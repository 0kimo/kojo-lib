import { 
    PermissionsString,
    ChatInputCommandInteraction,
} from 'discord.js'


interface KojoCommand {
    category?: string;
    options?: {
        dm_permissions?: boolean;
        permissions?: {
            client?: PermissionsString[];
            member?: PermissionsString[];
        }
    };

    command: any;
    run: (ctx: ChatInputCommandInteraction) => any;
}

export {
    KojoCommand
}