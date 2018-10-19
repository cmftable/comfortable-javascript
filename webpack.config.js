const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const fileName = 'comfortable';
  const isProduction = argv.mode === 'production';

  const baseConfig = {
    entry: [
      'cross-fetch/polyfill',
      'promise-polyfill/src/polyfill',
      path.join(__dirname, './src/index.ts')
    ],
    externals: [{
      'cross-fetch/polyfill': {
        root: 'cross-fetch/polyfill',
        commonjs: 'cross-fetch/polyfill',
        commonjs2: 'cross-fetch/polyfill',
        amd: 'cross-fetch/polyfill',
      }
    }],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `${fileName + (isProduction ? '.min' : '')}.js`,
      libraryTarget: 'umd',
      library: 'Comfortable',
      umdNamedDefine: true,
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'ts-loader',
          exclude: [
            /node_modules/,
            /test/
          ],
          options: {
            compilerOptions: {
              declaration: true,
              declarationDir: "./d.ts"
            }
          }
        }
      ],
    },
    plugins: [
    ],
  };

  return baseConfig;
}
