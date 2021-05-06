import styles from "rollup-plugin-styles";
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel';
import image from '@rollup/plugin-image';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';


import pkg from './package.json'

export default {
  input: 'src/App.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    image(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/preset-react'],
      extensions: ['.js', '.svg'],
    }),
    styles(),
    builtins(),
    commonjs(),
    typescript()
    ],
  external: ['react', 'react-dom']
}
