module.exports = {
    "app/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix admin run lint:eslint",
    "app/**/*.{ts,tsx}": () => "npm --prefix admin run lint:tsc",
    "api/**/*.{ts,tsx,js,jsx,json,css,scss,md}": () => "npm --prefix api run lint:eslint",
    "api/**/*.{ts,tsx}": () => "npm --prefix api run lint:tsc",
    "*": () => "npx prettier -c .",
};
