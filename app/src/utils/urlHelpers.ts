import { useSearchParams } from "react-router-dom";

const buildUrl = (path: string, params: Object): string => {
    const url = new URL(path, document.baseURI);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    return url.href.replace(document.location.origin, "");
};

export { useSearchParams as useSearchParams, buildUrl as buildUrl };
