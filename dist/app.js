"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const battlenetApi_1 = require("./api/battlenetApi");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const blizzardAPI = new battlenetApi_1.BlizzardAPI(process.env.BLIZZARD_API_CLIENT_ID, process.env.BLIZZARD_API_CLIENT_SECRET);
console.log('BLIZZARD_CLIENT_ID', process.env.BLIZZARD_API_CLIENT_ID);
app.get('/wow-token', async (req, res) => {
    try {
        const data = await blizzardAPI.fetchWoWTokenIndex();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve WoW Token data' });
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
