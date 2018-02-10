import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: './src/index.js',
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'zipkin-instrumentation-miniapp-request',
  },
  plugins: [
    commonjs({
      include: [ "./src/index.js", "node_modules/**" ],
      sourceMap: false
    }),
    resolve(),
  ],
}