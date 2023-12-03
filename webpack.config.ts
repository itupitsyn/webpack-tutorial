import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    isDev,
    isProd,
    paths,
    analyzer: env.analyzer,
  });
  return config;
};