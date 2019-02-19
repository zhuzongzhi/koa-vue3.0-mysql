import { queryCourseDirection, queryAllCourseCategory, queryCourseDifficult, queryCourseList} from '@/api/course'

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

    // 获取课程分类信息
    QueryAllCourseCategory({commit, state}, courseDirectionId) {
      return new Promise((resolve, reject) => {
        queryAllCourseCategory(courseDirectionId).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取课程难度信息
    QueryCourseDifficult({commit, state}) {
      return new Promise((resolve, reject) => {
        queryCourseDifficult().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 获取课程列表
    QueryCourseList({commit, state}, params) {
      return new Promise((resolve, reject) => {
        queryCourseList(params).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

  }
};

export default course;
