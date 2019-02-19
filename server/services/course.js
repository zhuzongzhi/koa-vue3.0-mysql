/**
 * 课程业务操作
 */

const validator = require('validator');
const courseModel = require('./../models/course');
const courseCode = require('./../codes/course');

const course = {
  /**
   * 查询所有课程方向
   */
  async getCourseDirection() {
    return await courseModel.getCourseDirection();
  },

  async queryAllCourseCategory(courseDirectionId) {
    return await courseModel.queryAllCourseCategory(courseDirectionId);
  },

  async queryCourseDifficult() {
    return await courseModel.queryCourseDifficult();
  },

  async queryCourseList(query) {
    let course_list = await courseModel.queryCourseList(query);
    let totalCount = await courseModel.queryCourseListCount(query);
    return {course_list, totalCount: totalCount[0].count};
  },
};

module.exports = course;
