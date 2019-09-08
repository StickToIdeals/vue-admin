import request from '@/utils/request'

export function getVersionList(params) {
  return request({
    url: '/version/list',
    method: 'get',
    params
  })
}
