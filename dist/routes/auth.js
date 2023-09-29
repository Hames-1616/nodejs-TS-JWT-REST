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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/api/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const exist = yield user_1.user.findOne({ email });
        if (exist) {
            return res
                .json({ msg: "User with same email already exists" })
                .status(400);
        }
        const hashedpassword = yield bcryptjs_1.default.hash(password, 8);
        let usr = new user_1.user({
            name,
            email,
            password: hashedpassword
        });
        usr = yield usr.save();
        res.json(usr);
    }
    catch (e) {
        res.status(500)
            .json({ error: e.message });
    }
}));
authRouter.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const usr = yield user_1.user.findOne({ email });
        if (!user_1.user) {
            return res
                .status(400)
                .json({
                msg: "user with this email does not exits"
            });
        }
        const isMatched = yield bcryptjs_1.default.compare(password, usr.password);
        if (!isMatched) {
            return res
                .status(400)
                .json({
                msg: "Incorrect password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: usr._id }, "passwordKey");
        return res.json({ access: token });
    }
    catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
}));
authRouter.post("/tokenvalid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("auth");
        if (!token)
            return res.status(401).json(false);
        const verified = jsonwebtoken_1.default.verify(token, "passwordKey");
        if (!verified)
            return res.status(401).json(false);
        const currentUser = yield user_1.user.findById(verified.id);
        if (!currentUser)
            res.json(false);
        res.json(true);
    }
    catch (E) {
        res.status(500).json({ error: "Error" });
    }
}));
