import axios from "../api/axios";
import { authUpdateUser } from "../store/auth/auth-slice";
import { getToken, saveToken } from "../utils/auth";

export default function useRefreshToken() {
    async function refresh() {
        const { refresh_token } = getToken();
        if (!refresh_token) return null;
        const response = await axios.post("/auth/refresh_token", {
            refresh_token,
        });
        saveToken(
            response.data.tokens.accessToken,
            response.data.tokens.refreshToken
        );
        authUpdateUser((prev) => ({
            ...prev,
            accessToken: response?.data?.tokens?.accessToken || "",
        }));
        return response?.data?.tokens?.accessToken || "";
    }

    return refresh;
}
