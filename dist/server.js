"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/config.env' });
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000', 10);
const mode = process.env.NODE_ENV;
app.listen(PORT, () => {
    console.log(`Server Listening at PORT ${PORT} in ${mode} mode`);
});
