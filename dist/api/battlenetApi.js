"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlizzardAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class BlizzardAPI {
    constructor(clientId, clientSecret) {
        this.accessToken = null;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.client = axios_1.default.create({
            baseURL: 'https://us.api.blizzard.com/',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    async authenticate() {
        try {
            const response = await axios_1.default.post(`https://us.battle.net/oauth/token`, null, {
                params: {
                    grant_type: 'client_credentials'
                },
                auth: {
                    username: this.clientId,
                    password: this.clientSecret
                }
            });
            this.accessToken = response.data.access_token;
            this.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
        }
        catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Failed to authenticate with Blizzard API');
        }
    }
    async fetchWoWTokenIndex() {
        if (!this.accessToken) {
            await this.authenticate();
        }
        try {
            const response = await this.client.get('/data/wow/token/index', {
                params: {
                    namespace: 'dynamic-us' // Change this as needed for other regions (dynamic-eu, dynamic-kr, dynamic-tw)
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Failed to fetch WoW Token Index:', error);
            throw error;
        }
    }
}
exports.BlizzardAPI = BlizzardAPI;
