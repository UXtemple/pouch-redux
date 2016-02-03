import babel from 'rollup-plugin-babel';

export default {
  dest: 'dist/next.js',
  entry: 'index.js',
  format: 'es6',
  moduleName: 'pouch-redux',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [
        "external-helpers",
        "transform-es2015-parameters",
        "transform-es2015-destructuring",
        "transform-export-extensions",
        "transform-object-rest-spread"
      ],
      runtimeHelpers: false
    })
  ],
  sourceMap: true
};
