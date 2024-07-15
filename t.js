"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
const handler = new handlers_1.ButtonHandler();
const info = handler.init(`{A:user=0Sapphy}-hi`);
handler.executeButton(info);
