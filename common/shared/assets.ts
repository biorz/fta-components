import { deepMerge } from '../utils/deep-merge'
import { DeepPartial } from './types'

const Assets = {
  // 关闭
  close: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
    circle:
      'https://image.ymm56.com/ymmfile/operation-biz/1e270684-078d-49c8-9e69-23fbe607404a.png',
    circleFull:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/c4aa5762-5aad-40c8-9fab-9912569aec6c.png',
    circleBlack:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/957bbc97-e1f9-40b5-8173-15283538291e.png',
  },
  // 箭头
  arrow: {
    true: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    right:
      'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    down: 'https://image.ymm56.com/ymmfile/operation-biz/27653ee0-6dc6-446a-a60c-38c322e280cc.png',
    up: 'https://image.ymm56.com/ymmfile/operation-biz/4193cb2e-863f-471f-b3bf-80f49c22069a.png',
    left: 'http://image.ymm56.com/boss/2018/1212/1544598761',
    grey: 'https://imagecdn.ymm56.com/ymmfile/static/resource/a7fa220a-80f0-422f-b447-118052752d07.png',
  },
  // 信息提示
  tip: {
    success:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/a826715a-5d51-4bb9-8cd3-a2f75c03d1b7.png',
    error:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/9c1dd2fc-40be-4363-ad7c-1038efba8f23.png',
    waiting:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f99ecdf5-66d2-4e59-9b20-425affff0f68.png',
    warning:
      'https://image.ymm56.com/ymmfile/operation-biz/ef9aa9a9-710f-40a6-922b-ac044ae168fb.png',
    info: 'https://image.ymm56.com/ymmfile/operation-biz/62398c75-bcc3-40c0-be5e-db16031c0fc5.png',
  },
  // 空白页&错误页面
  empty: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/4469e30e-fe6b-4673-952c-c6a2d92ddc7b.png',
    error: 'https://image.ymm56.com/ymmfile/operation-biz/49c712cb-69cc-4e80-9ca8-d752605c403e.png',
  },
  // 对号
  check: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f1b19e18-3105-4951-8e95-f0de00b221d2.png',
    primary:
      'https://imagecdn.ymm56.com/ymmfile/common-operation/d5c09873-f788-4fe8-8d46-669fb5bbce91.png',
  },
  // 加载中
  loading: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
    blue: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
  },
  // 相机📷
  camera: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/2361a262-9f06-420b-9514-0d12e3a26d12.png',
    blue: 'https://image.ymm56.com/ymmfile/operation-biz/218ba18d-5ab4-4a83-92bb-731802693ad8.png',
  },
  // 小图标
  icon: {
    question:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f9c00240-d826-44a4-89be-39f8284c3243.png',
    warning:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/54eca927-239b-48f4-ab28-fa4b65da6c5f.png',
    waiting:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/38e7d189-35ef-45e9-840c-7b39ae88c2dd.png',
    triangle:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/83e4d14b-b386-4f9a-a320-dbd5e243b7a8.png',
  },
  // 搜索图标
  search: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/51a99429-1d69-4faa-a15a-50b4ef461f75.png',
    grey: 'https://imagecdn.ymm56.com/ymmfile/static/resource/dcb5f526-9e59-4789-a98e-69270c6cb38f.png',
  },
}

const mergeAssets = (newAssets: DeepPartial<typeof Assets>) => {
  deepMerge(Assets, newAssets)
}

export { Assets, mergeAssets }
