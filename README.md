# ts-blank-loader

[![npm version](https://badgen.net/npm/v/ts-blank-loader)](https://npm.im/ts-blank-loader) [![npm downloads](https://badgen.net/npm/dm/ts-blank-loader)](https://npm.im/ts-blank-loader)

Typescript compilation using [`ts-blank-space`](https://github.com/bloomberg/ts-blank-space) with your favourite bundler.

## Install

```bash
npm i ts-blank-loader
```

## Usage in Rspack & Webpack

### Typescript

```javascript
// rspack.config.js (or webpack.config.js)

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-blank-loader",
      },
    ],
  },
}
```

### TSX

**Rspack**

```javascript
// rspack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: true,
                },
              },
            },
          },
          "ts-blank-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
```

**Webpack**

```javascript
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "babel-loader", // Use Babel loader for transpiling JavaScript
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"], // Use presets for modern JavaScript and React
            },
          },
          "ts-blank-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
```

## License

MIT &copy;
