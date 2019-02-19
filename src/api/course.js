import request from '@/utils/request'

export function queryCourseDirection() {
  return request({
    url: '/course/getCourseDirection',
    method: 'get',
    params: {}
  })
}

export function queryAllCourseCategory(courseDirectionId) {
  return request({
    url: '/course/queryAllCourseCategory',
    method: 'get',
    params: {
      courseDirectionId,
    }
  })
}

export function queryCourseDifficult() {
  return request({
    url: '/course/queryCourseDifficult',
    method: 'get',
    params: {}
  })
}

export function queryCourseList(params) {
  return request({
    url: '/course/queryCourseList',
    method: 'get',
    params: params
  })
}
