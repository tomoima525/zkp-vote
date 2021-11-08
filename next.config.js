const withTM = require("next-transpile-modules")(["zokrates-js"]);
/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => {
    // From https://github.com/rustwasm/wasm-pack/issues/835#issuecomment-772591665
    config.experiments = {
      syncWebAssembly: true,
    };
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/sync",
    });

    return config;
  },
});
