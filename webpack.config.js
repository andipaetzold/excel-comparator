const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
var HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = (env, options) => {
    const dev = options.mode === "development";

    return {
        entry: {
            app: "./src/index.tsx"
        },
        devServer: {
            historyApiFallback: true
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [path.resolve("./node_modules"), path.resolve("./src")]
        },
        output: {
            path: path.join(__dirname, "/dist"),
            filename: dev ? "[name].js" : "[name].[hash].js",
            chunkFilename: dev ? "[name].js" : "[name].[hash].js",
            publicPath: "/"
        },

        devtool: dev ? "source-map" : "none",

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        useCache: true,
                        forceIsolatedModules: true
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true,
                        priority: 1
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    cache: dev,
                    sourceMap: dev,
                    parallel: true
                })
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new HardSourceWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ]
    };
};
