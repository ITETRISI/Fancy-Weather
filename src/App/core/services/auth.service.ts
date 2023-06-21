import { UserCredentials } from "App/shared/interfaces/auth.interface";

interface AuthToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export class AuthService {

    static auth = async (authData: UserCredentials):Promise<AuthToken | string> => {
        try {
            const res = await fetch("/proxy/authorize/token", {
                method: "POST",
                body: JSON.stringify(authData)
            });
            const data = await res.json();

            this.setToken(data.access_token);

            return data;
        } catch (e) {
            localStorage.removeItem("token");

            throw new Error("Check your credentials and try again!");
        }
    };

    static getToken(): string | null {
        const token: string | null = localStorage.getItem("token");
        return token ? JSON.parse(token) : null;
    }

    static setToken(data: AuthToken) {
        localStorage.setItem("token", JSON.stringify(data));
    }
}
