import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: options.isDev
          ? "[path][name]__[local]"
          : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      options.isProd ? MiniCssExtractPlugin.loader : "style-loader",
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const imageLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              { name: "convertColors", params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  };

  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [options.isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //         transpileOnly: options.isDev,
  //       },
  //     },
  //   ],
  // };

  const babelLoader = buildBabelLoader(options);

  return [
    imageLoader,
    svgrLoader,
    scssLoader,
    //  tsLoader,
    babelLoader,
  ];
};
