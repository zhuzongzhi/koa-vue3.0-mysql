const dbUtils = require('./../utils/db-util');

const course = {
  /**
   * 查询所有课程方向
   */
  async getCourseDirection() {
    return await dbUtils.select(
      'course_direction',
      ['id', 'name', 'deleted', 'create_time', 'creator', 'modified_time', 'modifier' ]);
  },

  async queryAllCourseCategory(courseDirectionId) {
    let _sql = `
      select * from course_category where 1 = 1 and deleted = 0 
    `;
    if (courseDirectionId) {
      _sql += ` and direction_id = "${courseDirectionId}" `;
    }
    console.log('_sql', _sql);

    return await dbUtils.query(_sql);
  },

  async queryCourseDifficult() {
    return await dbUtils.select(
      'course_difficult',
      ['id', 'name', 'deleted', 'create_time', 'creator', 'modified_time', 'modifier' ]);
  },
};

module.exports = course;
