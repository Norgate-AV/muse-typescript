import { getConfig } from "../utils/getConfig";

export class AppConfig {
    private static instance: AppConfig = null;

    public name: string;

    public static getInstance(): AppConfig {
        if (this.instance === null) {
            this.instance = new AppConfig();
        }

        return this.instance;
    }

    private constructor() {
        const [config, error] = getConfig("config.json");

        if (error !== null) {
            throw error;
        }

        this.name = config.name;
    }
}
