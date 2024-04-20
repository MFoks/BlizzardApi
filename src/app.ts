import express, { Request, Response } from 'express'
import { BlizzardAPI } from './api/battlenetApi'
import dotevn from 'dotenv'

dotevn.config()

const app = express();
const port = process.env.PORT || 3000;
const blizzardAPI = new BlizzardAPI(process.env.BLIZZARD_API_CLIENT_ID!, process.env.BLIZZARD_API_CLIENT_SECRET!);

console.log('BLIZZARD_CLIENT_ID',process.env.BLIZZARD_API_CLIENT_ID)

app.get('/wow-token', async (req: Request, res: Response) => {
    try {
        const data = await blizzardAPI.fetchWoWTokenIndex();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve WoW Token data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});