"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
const DB = "mongodb+srv://hames:hames@atlascluster.xvj1a2v.mongodb.net/";
mongoose_1.default
    .connect(DB)
    .then(() => {
    console.log("Connection Successful");
})
    .catch((e) => {
    console.log(e);
});
app.use(express_1.default.json());
app.use(auth_1.authRouter);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
