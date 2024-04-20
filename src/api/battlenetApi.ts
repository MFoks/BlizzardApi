import axios, { AxiosInstance } from 'axios'

export class BlizzardAPI {
  private client: AxiosInstance;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private accessToken: string | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.client = axios.create({
      baseURL: 'https://us.api.blizzard.com/',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async authenticate(): Promise<void> {
    try {
      const response = await axios.post(`https://us.battle.net/oauth/token`, null, {
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
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with Blizzard API');
    }
  }

  async fetchWoWTokenIndex(): Promise<any> {
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
    } catch (error) {
        console.error('Failed to fetch WoW Token Index:', error);
        throw error;
    }
  }
}