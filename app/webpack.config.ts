import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

import environment from "./src/environment";

interface Configuration extends WebpackConfiguration {
    devSever?: WebpackDevServerConfiguration;
}

interface IEnvironment {
    production: boolean;
}

const config = ({ production }: IEnvironment): Configuration => {
    const publicPath = "/";

    const plugins = [
        new HtmlWebpackPlugin({
            template: "public/index.ejs",
            templateParameters: {
                environmentValues: environment.map((env) => ({ key: env, value: process.env[env] })),
            },
            hash: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, "./locales"), to: path.resolve(__dirname, "./build/locales") },
                { from: path.resolve(__dirname, "./public/manifest.json"), to: path.resolve(__dirname, "./build/manifest.json") },
                // { from: path.resolve(__dirname, "./public/icons"), to: path.resolve(__dirname, "./build/icons") },
            ],
        }),
    ];

    return {
        mode: production ? "production" : "development",
        entry: {
            "react-admin-starter": ["./src/polyfills.ts", "./src/pre-loader.ts", "./src/loader.ts"],
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "files/",
                        name: "[name].[ext]",
                    },
                },
                {
                    test: /\.svg$/,
                    loader: "@svgr/webpack",
                },
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        customize: require.resolve("babel-preset-react-app/webpack-overrides"),
                        babelrc: false,
                        configFile: false,
                        presets: [require.resolve("babel-preset-react-app")],
                        plugins: [
                            [
                                require.resolve("babel-plugin-styled-components"),
                                {
                                    displayName: !production,
                                    fileName: !production,
                                },
                            ],
                        ],
                        cacheDirectory: true,
                    },
                },
                {
                    test: /\.(js|mjs)$/,
                    exclude: /@babel(?:\/|\\{1,2})runtime/,
                    loader: require.resolve("babel-loader"),
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [[require.resolve("babel-preset-react-app/dependencies"), { helpers: true }]],
                        cacheDirectory: true,
                        sourceMaps: false,
                    },
                },
                {
                    test: /\.css?$/,
                    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
                },
            ],
        },
        plugins,
        optimization: {
            sideEffects: true,
            usedExports: true,
            minimize: true,
        },
        resolve: {
            modules: ["node_modules"],
            descriptionFiles: ["package.json"],
            mainFields: ["browser", "module", "main"],
            extensions: ["*", ".mjs", ".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@generated": path.resolve(__dirname, "generated/"),
                "@components": path.resolve(__dirname, "src/components/"),
                "@theme": path.resolve(__dirname, "src/themes/"),
                "@assets": path.resolve(__dirname, "src/assets/"),
                "@pages": path.resolve(__dirname, "src/pages/"),
                "@context": path.resolve(__dirname, "src/context/"),
                "@utils": path.resolve(__dirname, "src/utils/"),
                "@hooks": path.resolve(__dirname, "src/hooks/"),
                "@app": path.resolve(__dirname, "src/"),
            },
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
            chunkFilename: "[id].chunk.js?v=[chunkhash]",
            publicPath,
        },
        devServer: {
            host: "0.0.0.0",
            port: 8080,
            historyApiFallback: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
    };
};

export default config;
