import NodePath from 'path'
import commonConfig from '../../../../config/rollup.config'
import Package from './package.json'

const resolveFile = (path) => NodePath.resolve(__dirname, path)

export default {
  ...commonConfig,
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
      sourcemap: true,
    },
  ],
}
