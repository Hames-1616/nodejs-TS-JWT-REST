"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                return value.match(re);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        required: true,
        type: String
    },
    address: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "user"
    },
});
const user = mongoose_1.default.model("user", userSchema);
exports.user = user;
