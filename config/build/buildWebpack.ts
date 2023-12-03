import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buldLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  return {
    mode: options.mode,
    entry: options.paths.entry,
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    output: {
      path: options.paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    devtool: options.isDev && "inline-source-map",
    devServer: options.isDev ? buildDevServer(options) : undefined,
  };
};
