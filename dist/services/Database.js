"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGO_URI;
if (!URI) {
    console.log("Please provide a Mongodb URI".red);
    process.exit(1);
}
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(URI, { dbName: "rydeu" }).then((res) => {
            console.log("Database connected".blue.bold);
        });
    }
    catch (error) {
        console.log("Error connecting to Database".red + error);
    }
});
exports.initDB = initDB;
