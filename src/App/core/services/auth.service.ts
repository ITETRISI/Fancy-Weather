import { UserCredentials } from "App/shared/interfaces/auth.interface";

interface AuthToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export class AuthService {

    static auth = async (authData: UserCredentials): Promise<AuthToken | string> => {
        try {
            const res = await fetch("/proxy/authorize/token", {
                method: "POST",
                body: JSON.stringify(authData)
            });
            const data = await res.json();

            this.setTokenData(data);
            this.setUserData(authData)

            return data;
        } catch (e) {
            localStorage.removeItem("token");

            throw new Error("Check your credentials and try again!");
        }
    };

    static getTokenData(): AuthToken | null {
        const token: string | null = localStorage.getItem("token");
        return token ? JSON.parse(token) : null;
    }

    static setTokenData(data: AuthToken) {
        localStorage.setItem("token", JSON.stringify(data));
    }

    static getUserData(): string | null {
        const userData: string | null = localStorage.getItem("userData");
        return userData ? JSON.parse(userData) : null;
    }

    static setUserData(data: UserCredentials) {
        localStorage.setItem("userData", JSON.stringify(data));
    }

    static get isUserLoggedIn(): boolean {
        return !!this.getTokenData()?.access_token;
    }


}
