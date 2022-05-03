import { useCookies } from "react-cookie";

const ACCESS_TOKEN = "authToken_new";
const REFRESH_TOKEN = "refreshToken";

export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([ACCESS_TOKEN]);

    const setAuthToken = (authToken: string) => {
        setCookie(ACCESS_TOKEN, authToken);
    };
    const removeAuthToken = () => {
        removeCookie(ACCESS_TOKEN);
    };

    return [cookies[ACCESS_TOKEN], setAuthToken, removeAuthToken];
};

export const useRefreshToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies([REFRESH_TOKEN]);

    const setAuthToken = (authToken: string) => {
        setCookie(REFRESH_TOKEN, authToken);
    };
    const removeAuthToken = () => {
        removeCookie(REFRESH_TOKEN);
    };

    return [cookies[REFRESH_TOKEN], setAuthToken, removeAuthToken];
};
