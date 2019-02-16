const userInfoService = require('./../services/userInfo');
const userCode = require('./../codes/user');

/**
 * 登录操作
 * @param  {obejct} ctx 上下文对象
 */
var fn_signIn = async (ctx, next) => {
  let formData = ctx.request.body;

  let result = {
    success: false,
    message: '',
    data: null,
    code: ''
  };

  let userResult = await userInfoService.signIn( formData );

  if ( userResult ) {
    if ( formData.userName === userResult.name ) {
      result.success = true
    } else {
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR;
      result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
    }
  } else {
    result.code = 'FAIL_USER_NO_EXIST';
    result.message = userCode.FAIL_USER_NO_EXIST
  }

  if ( result.success === true ) { //  formData.source === 'form' &&
    console.log('ctx.session', ctx.session);
    let session = ctx.session;
    session.isLogin = true;
    session.userName = userResult.name;
    session.userId = userResult.id;
    ctx.body = result;
  } else {
    ctx.body = result;
  }
};

/**
 * 注册操作
 * @param   {obejct} ctx 上下文对象
 */
var fn_signUp = async (ctx, next) => {
  let formData = ctx.request.body;
  let result = {
    success: false,
    message: '',
    data: null
  };

  let validateResult = userInfoService.validatorSignUp( formData );

  if ( validateResult.success === false ) {
    result = validateResult;
    ctx.body = result;
    return false;
  }

  let existOne  = await userInfoService.getExistOne(formData);
  console.log( existOne );

  if ( existOne  ) {
    if ( existOne .name === formData.userName ) {
      result.message = userCode.FAIL_USER_NAME_IS_EXIST;
      ctx.body = result;
      return false;
    }
    if ( existOne .email === formData.email ) {
      result.message = userCode.FAIL_EMAIL_IS_EXIST;
      ctx.body = result;
      return false;
    }
  }


  let userResult = await userInfoService.create({
    email: formData.email,
    password: formData.password,
    name: formData.userName,
    create_time: new Date().getTime(),
    level: 1,
  });

  console.log( userResult );

  if ( userResult && userResult.insertId * 1 > 0) {
    result.success = true
  } else {
    result.message = userCode.ERROR_SYS
  }

  ctx.body = result;
};

/**
 * 获取用户信息
 * @param    {obejct} ctx 上下文对象
 */
var fn_getLoginUserInfo = async (ctx, next) => {
  let session = ctx.session;
  let isLogin = session.isLogin;
  let userName = session.userName;

  console.log( 'session=', session );

  let result = {
    success: false,
    message: '',
    data: null,
  };
  if ( isLogin === true && userName ) {
    let userInfo = await userInfoService.getUserInfoByUserName( userName );
    if ( userInfo ) {
      result.data = userInfo;
      result.success = true;
    } else {
      result.message = userCode.FAIL_USER_NO_LOGIN;
    }
  } else {
    // TODO
  }

  ctx.body = result;
};

/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
var fn_validateLogin = async (ctx, next) => {
  let result = {
    success: false,
    message: userCode.FAIL_USER_NO_LOGIN,
    data: null,
    code: 'FAIL_USER_NO_LOGIN',
  };
  let session = ctx.session;
  if( session && session.isLogin === true  ) {
    result.success = true;
    result.message = '';
    result.code = '';
  }
  ctx.body = result;
};

module.exports = {
  // 'GET /userInfo/:name': fn_signIn,
  'POST /user/signIn': fn_signIn,
  'POST /user/signUp': fn_signUp,
  'GET /user/getLoginUserInfo': fn_getLoginUserInfo,
  'GET /user/validateLogin': fn_validateLogin,
};
