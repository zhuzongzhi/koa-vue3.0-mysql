import request from '@/utils/request'

export function queryCourseDirection() {
  return request({
    url: '/course/getCourseDirection',
    method: 'get',
    params: {}
  })
}
