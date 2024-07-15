import { ChatInputCommandInteraction } from "discord.js";
import { ButtonHandler } from "./handlers";

const handler = new ButtonHandler();

const info = handler.init(`{A:user=0Sapphy}-hi`);
handler.executeButton(info);