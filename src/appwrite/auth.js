import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.setProject);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            await this.account.create(ID.unique(), email, password, name);
            return this.login(email, password);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async login({email, password}) {
        try {
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async logout() {
        
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new AuthService()

export default authService