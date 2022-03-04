import NodePath from 'path'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupTypescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import RollupCopy from 'rollup-plugin-copy'

const resolveFile = (path) => NodePath.resolve(__dirname, path)

const externalPackages = ['react', 'react-dom', '@tarojs/components']

export default {
  input: './src/index.tsx',
  output: [
    {
      file: './lib/index.js',
      format: 'es',
    },
  ],
  external: externalPackages,
  plugins: [
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
    }),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.json'),
    }),
    postcss({
      extract: false,
    }),
    RollupCopy({
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('lib'),
        },
      ],
    }),
  ],
}
