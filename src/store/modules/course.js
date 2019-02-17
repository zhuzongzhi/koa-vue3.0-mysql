import { queryCourseDirection } from '@/api/course'

const course = {
  state: {

  },

  mutations: {

  },

  actions: {
    // 获取课程方向信息
    QueryCourseDirection({commit, state}) {
      return new Promise((resolve, reject) => {
        queryCourseDirection().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
  }
};

export default course;
