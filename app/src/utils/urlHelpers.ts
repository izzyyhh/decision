import { useSearchParams } from "react-router-dom";

const buildUrl = (path: string, params: Object, replace: boolean = true): string => {
    const url = new URL(path, document.baseURI);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    if(replace) {
        return url.href.replace(document.location.origin, "");
    }
    return url.href
};

export { useSearchParams as useSearchParams, buildUrl as buildUrl };
