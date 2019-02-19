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
    if (parseInt(courseDirectionId)) {
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

  /**
   * 查询课程列表
   * sort：排序方式 0：最新  1：最热
   */
  async queryCourseList(query) {
    let _sql = `
      select a.*, b.name as direction_name 
      from course_list a left join course_difficult b on a.direction_id = b.id
      where 1 = 1 and a.deleted = 0 
    `;

    if (parseInt(query.direction_id)) {
      _sql += ` and a.direction_id = ${query.direction_id} `;
    }
    if (parseInt(query.category_id)) {
      _sql += ` and a.category_id = ${query.category_id} `;
    }
    if (parseInt(query.difficult_id)) {
      _sql += ` and a.difficult_id = ${query.difficult_id} `;
    }

    if (query.keyword) {
      _sql += ` and a.name like '%${query.keyword}%' `;
    }

    if (!parseInt(query.isLastest)) {
      _sql += ` order by a.create_time DESC `;
    } else {
      _sql += ` order by a.study_num DESC `;
    }

    _sql += ` LIMIT ${(query.pageNo-1)*query.pageSize} , ${query.pageSize} `;
    console.log('_sql', _sql);

    return await dbUtils.query(_sql);
  },

  async queryCourseListCount(query) {
    let _sql = `
      select count(*) as count 
      from course_list where 1 = 1 and deleted = 0 
    `;

    if (parseInt(query.direction_id)) {
      _sql += ` and direction_id = ${query.direction_id} `;
    }
    if (parseInt(query.category_id)) {
      _sql += ` and category_id = ${query.category_id} `;
    }
    if (parseInt(query.difficult_id)) {
      _sql += ` and difficult_id = ${query.difficult_id} `;
    }

    if (query.keyword) {
      _sql += ` and name like '%${query.keyword}%' `;
    }
    console.log('_sql', _sql);

    return await dbUtils.query(_sql);
  },
};

module.exports = course;
