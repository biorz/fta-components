import RollupCommonjs from '@rollup/plugin-commonjs'
import RollupJson from '@rollup/plugin-json'
import RollupNodeResolve from '@rollup/plugin-node-resolve'
import NodePath from 'path'
import RollupCopy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import RollupTypescript from 'rollup-plugin-typescript2'

const resolveFile = (path) => NodePath.resolve(__dirname, path)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
  'taro-ui',
]

const pkg = require(process.cwd() + '/package.json')

export default {
  external: externalPackages,
  plugins: [
    postcss({
      extract: (pkg && pkg.style) || true,
    }),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    RollupCommonjs({
      include: /\/node_modules\//,
      namedExports: {
        // This is needed because `react/jsx-runtime` exports `jsx` on the module export.
        // Without this mapping the transformed import `import {jsx as _jsx} from 'react/jsx-runtime'` will fail.
        'react/jsx-runtime': ['jsx', 'jsxs', 'Fragment'],
        'react/jsx-dev-runtime': ['jsxDEV', 'Fragment'],
      },
    }),
    RollupJson(),
    RollupTypescript({
      tsconfig: resolveFile('tsconfig.rollup.json'),
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {},
      },
    }),
    RollupCopy({
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('dist'),
        },
      ],
    }),
  ],
}
