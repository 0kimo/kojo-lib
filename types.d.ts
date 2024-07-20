import { ChatInputCommandInteraction, Message, PermissionsString } from "discord.js"

export enum Categories {
    Bot = "bot",
    Moderation = "moderation",
    Fun = "fun",
    NONE = "none"
}

export interface ChatInputCommand {
    options: {
        category: Categories;

        useAbleIn?: {
            direct_messages?: boolean;
        }

        permissions?: {
            client?: PermissionsString[];
        }
    }

    command: any;
    run: (interaction: ChatInputCommandInteraction) => {};
}

export interface MessageCommand {
    command: {
        name: string;
        description: string;
        catgory: Categories | string;
        usage: string | null
    }

    options?: {
        useAbleIn?: {
            direct_messages?: boolean;
        }

        permissions?: {
            client?: PermissionsString[];
            user?: PermissionsString[];
        }
    }

    run: (message: Message, args: string[]) => {};
}