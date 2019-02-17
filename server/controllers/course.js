const courseService = require('./../services/course');
const courseCode = require('./../codes/course');

/**
 * 获取课程方向
 */
var fn_getCourseDirection = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null,
    code: ''
  };

  let allCourseDirection = await courseService.getCourseDirection();
  if ( allCourseDirection ) {
    result.data = allCourseDirection;
    result.success = true;
    result.code = 1;
  } else {
    result.message = courseCode.FAIL_GET_COURSE_DIRECTION;
  }

  ctx.body = result;
};

/**
 * 根据课程方向获取课程分类
 * 如果没有课程方向，默认获取全部课程分类
 */
var fn_queryAllCourseCategory = async (ctx, next) => {
  let ctxQuery = ctx.query;

  let result = {
    success: false,
    message: '',
    data: null,
    code: ''
  };

  let allCourseDirection = await courseService.queryAllCourseCategory(ctxQuery.courseDirectionId);
  if ( allCourseDirection ) {
    result.data = allCourseDirection;
    result.success = true;
    result.code = 1;
  } else {
    result.message = courseCode.FAIL_GET_COURSE_DIRECTION;
  }

  ctx.body = result;
};

/**
 * 获取课程所有难度
 */
var fn_queryCourseDifficult = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null,
    code: ''
  };

  let allCourseDifficult = await courseService.queryCourseDifficult();
  if ( allCourseDifficult ) {
    result.data = allCourseDifficult;
    result.success = true;
    result.code = 1;
  } else {
    result.message = courseCode.FAIL_GET_COURSE_Difficult;
  }

  ctx.body = result;
};

module.exports = {
  'GET /course/getCourseDirection': fn_getCourseDirection,
  'GET /course/queryAllCourseCategory': fn_queryAllCourseCategory,
  'GET /course/queryCourseDifficult': fn_queryCourseDifficult,
};