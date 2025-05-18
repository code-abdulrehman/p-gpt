import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import { readFileSync } from 'fs';

// Read package.json manually instead of using assert syntax
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      'react/jsx-runtime',
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions,
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        sourceMap: true,
      }),
      postcss({
        plugins: [],
        minimize: true,
        extract: false,
        inject: false,
      }),
      image(),
      json(),
      terser(),
    ],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      /\.css$/,
    ],
  },
];
