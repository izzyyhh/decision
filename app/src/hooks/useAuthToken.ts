import { useCookies } from 'react-cookie'

const ACCESS_TOKEN = "authToken";

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
