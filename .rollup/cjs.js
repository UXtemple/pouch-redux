import babel from 'rollup-plugin-babel';

export default {
  dest: 'dist/cjs.js',
  entry: 'index.js',
  format: 'cjs',
  moduleName: 'pouch-redux',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      "plugins": [
        "transform-export-extensions",
        "transform-object-rest-spread"
      ],
      presets: [
        "es2015-rollup"
      ],
      runtimeHelpers: true
    })
  ],
  sourceMap: true
};
