import Cookies from "js-cookie";
const accessTokenKey = "crow_access_token";
const refreshTokenKey = "crow_refresh_token";
const objCookies = {
    expires: 30,
    domain: "127.0.0.1",
};

export const saveToken = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
        Cookies.set(accessTokenKey, access_token, {
            ...objCookies,
        });
        Cookies.set(refreshTokenKey, refresh_token, {
            ...objCookies,
        });
    } else {
        Cookies.remove(accessTokenKey, {
            ...objCookies,
            path: "/",
            domain: "127.0.0.1",
        });
        Cookies.remove(refreshTokenKey, {
            ...objCookies,
            path: "/",
            domain: "127.0.0.1",
        });
    }
};

export const getToken = () => {
    const access_token = Cookies.get(accessTokenKey);
    const refresh_token = Cookies.get(refreshTokenKey);
    return {
        access_token,
        refresh_token,
    };
};
export const logOut = () => {
    const access_token = Cookies.get(accessTokenKey);
    if (access_token) {
        Cookies.remove(accessTokenKey, {
            ...objCookies,
            path: "/",
            domain: "127.0.0.1",
        });
        Cookies.remove(refreshTokenKey, {
            ...objCookies,
            path: "/",
            domain: "127.0.0.1",
        });
    }
};
