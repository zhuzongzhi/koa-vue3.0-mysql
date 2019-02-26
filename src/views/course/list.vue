<template>
    <div class="course-list-container">
        <!--头部-->
        <div class="header">
            <div class="header-inner">
                <el-row>
                    <el-col :offset="23" :span="1" v-show="!isLogin" class="loginCls">
                        <span @click="loginIn" class="login" style="cursor: pointer;">登录</span>
                        <span style="margin-right: 5px;">/</span>
                        <span @click="loginOut" class="login" style="font-weight: bold;cursor: pointer;">注册</span>
                    </el-col>

                    <el-col :offset="23" :span="1" v-show="isLogin">
                        <i class="iconfont icon-tongzhi" style="margin-right: 10px;height: 40px;line-height: 40px;cursor: pointer;"></i>

                        <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover">
                            <div class="userInfo">
                                用户信息
                            </div>
                            <img src="../../assets/course/user.jpg" alt="头像" style="cursor: pointer;"
                                 @mouseover="handleMouseOver"
                                 @mouseout="handleMouseOut"
                                 slot="reference"
                            >
                        </el-popover>

                    </el-col>
                </el-row>
            </div>
        </div>

        <!--搜索条件-->
        <div class="list-condition">
            <div class="list-condition-inner">
                <div class="rowOne">
                    <img src="../../assets/course/logo-course.png" alt="Logo" />
                    <img src="../../assets/course/course-top.png" alt="Logo" />

                    <el-input placeholder="搜索感兴趣的内容" v-model="keyword" class="searchKey"
                              @keyup.enter.native='keySearch' clearable >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>

                <div class="rowTwo">
                    <span class="subtitle">方向：</span>
                    <span v-for="(direction, index) in allDirection" :key="index">
                        <el-button @click="handleDirection(index)"
                                :class="{isActive: index === choseDirectionIdx}">
                            {{direction.name}}
                        </el-button>
                    </span>
                </div>

                <div class="rowThree">
                    <span class="subtitle">分类：</span>
                    <span v-for="(category, index) in allCategory" :key="index">
                        <el-button @click="handleCategory(index)"
                                   :class="{isActive: index === choseCategoryIdx}">
                            {{category.name}}
                        </el-button>
                    </span>
                </div>

                <div class="rowFour">
                    <span class="subtitle">难度：</span>
                    <span v-for="(difficult, index) in allDifficult" :key="index">
                         <el-button @click="handleDifficult(index)"
                                    :class="{isActive: index === choseDifficultIdx}">
                            {{difficult.name}}
                        </el-button>
                    </span>
                </div>

            </div>
        </div>

        <!--课程列表-->
        <div class="list-content">
            <div v-show="!noRecord">
                <div>
                    <el-button round @click="handleNew" size="mini"
                               :class="{isActive: isLastest}">最新</el-button>
                    <el-button round @click="handleHot" size="mini"
                               :class="{isActive: !isLastest}">最热</el-button>
                </div>

                <div class="list-card">
                    <el-row>
                        <el-col :span="4" v-for="(course, index) in allCourses" :key="index"
                                :offset="(index > 0 && index%5) ? 1 : 0"
                                style="margin-bottom: 15px;cursor: pointer;"
                                @click.native="viewDetail(course.id)"
                                >
                            <el-card :body-style="{ padding: '0px', height: '260px' }" >
                                <img src="../../assets/course/demo3.jpg" class="image">
                                <div style="padding: 14px;">
                                    <span class="courseName">{{course.name}}</span>
                                    <span class="courseDirectionName">{{course.difficult_name}}</span>

                                    <i class="iconfont icon-redupaixu"></i>
                                    <span class="courseStudyNum">{{course.study_num}}</span>

                                    <div class="courseBriefIntro">{{course.brief_introduction}}</div>

                                    <!--<div class="bottom clearfix">
                                        <time class="time">{{ new Date() }}</time>
                                        <el-button type="text" class="button">详情</el-button>
                                    </div>-->
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>

                    <el-pagination
                            style="width: 30%; margin: 0 auto; "
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageNo"
                            :page-sizes="[10, 20, 30, 50, 100]"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="totalCount">
                    </el-pagination>
                </div>
            </div>

            <div v-show="noRecord" class="noRecordCls">
                暂无数据
            </div>
        </div>

        <div class="footer">
            <p>Copyright © 2019 windmill.com All Rights Reserved | 京ICP备 12003892号-11</p>
            <p>如有侵权，请及时联系网站管理员立即删除。</p>
        </div>

        <el-dialog
            :visible.sync="dialogVisible"
            width="20%"
            :before-close="handleDialogClose">
            <Login ref="login" ></Login>
        </el-dialog>

    </div>
</template>

<script>
  import Login from '@/components/Login'

  export default {
    name: "list",
    components: {
      Login,

    },
    data() {
        return {
          keyword: '',
          allDirection: [{id: 0, name: '全部'}],
          allCategory: [{id: 0, name: '全部'}],
          allDifficult: [{id: 0, name: '全部'}],
          choseDirectionIdx: 0,
          choseCategoryIdx: 0,
          choseDifficultIdx: 0,
          isLastest: true,
          allCourses: [],

          pageSize: 10,
          pageNo: 1,
          totalCount: 0,

          noRecord: false,

          isLogin: false,
          dialogVisible: true,

        }
    },
    methods: {
      // 初始化
      async init() {
        let vm = this;

        await vm.queryCourseDirection();
        await vm.queryAllCourseCategory();
        await vm.queryCourseDifficult();
        await vm.queryCourseList();
      },

      // 查询课程方向
      async queryCourseDirection() {
        let vm = this;

        await this.$store
          .dispatch("QueryCourseDirection")
          .then((res) => {
            console.log('res', res);
            let data = res.data;
            data.forEach(item => {
              vm.allDirection.push(item);
            });
          })
          .catch(() => {

          });
      },

      // 查询课程分类
      async queryAllCourseCategory() {
        let vm = this;

        await this.$store
          .dispatch('QueryAllCourseCategory', vm.allDirection[vm.choseDirectionIdx].id)
          .then(res => {
            console.log(res);

            let data = res.data;
            if (data) {
              data.forEach(item => {
                vm.allCategory.push(item);
              })
            }

          })
          .catch(() => {

          });
      },

      // 查询课程难度
      async queryCourseDifficult() {
        let vm = this;

        this.$store
          .dispatch("QueryCourseDifficult")
          .then(res => {
            console.log(res);
            if (res.data) {
              res.data.forEach(item => {
                vm.allDifficult.push(item);
              })
            }
          }).catch((err) => {console.log(err)})
      },

      // 处理分页,每页长度
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        let vm = this;
        vm.pageSize = val;
        vm.queryCourseList();
      },

      // 处理分页，当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        let vm = this;
        vm.pageNo = val;
        vm.queryCourseList();
      },

      // 点击课程方向
      async handleDirection (index) {
        let vm = this;

        vm.choseDirectionIdx = index;
        vm.allCategory = [{id: 0, name: '全部'}];
        vm.choseCategoryIdx = 0;
        vm.choseDifficultIdx = 0;

        await vm.queryAllCourseCategory();
        await vm.queryCourseList();
      },

      // 点击课程分类
      async handleCategory (index) {
        let vm = this;

        vm.choseCategoryIdx = index;
        vm.choseDifficultIdx = 0;

        vm.queryCourseList();
      },

      // 点击课程难度
      async handleDifficult (index) {
        let vm = this;
        vm.choseDifficultIdx = index;
        vm.queryCourseList();
      },

      // 关键词搜索
      keySearch () {
        let vm = this;

        if (vm.keyword) {
          vm.keyword = vm.keyword.trim();
        }
        vm.queryCourseList();
      },

      // 查询课程列表
      async queryCourseList () {
        let vm = this;
        let params = {
          direction_id: vm.allDirection[vm.choseDirectionIdx].id,
          category_id: vm.allCategory[vm.choseCategoryIdx].id,
          difficult_id: vm.allDifficult[vm.choseDifficultIdx].id,

          keyword: vm.keyword,
          isLastest: vm.isLastest ? 0 : 1,
          pageSize: vm.pageSize,
          pageNo: vm.pageNo,
        };

        await this.$store
          .dispatch("QueryCourseList", params)
          .then(res => {
            console.log(res);

            let data = res.data;
            if (data) {
              vm.allCourses = [];
              data.course_list.forEach(item => {
                vm.allCourses.push(item);
              });

              vm.totalCount = data.totalCount;

              vm.noRecord = !vm.totalCount;
            }
          }).catch(err => {console.log(err)})
      },

      // 最新
      handleNew () {
        let vm = this;
        vm.isLastest = true;
        vm.pageNo = 1;
        vm.queryCourseList();
      },

      // 最热
      handleHot () {
        let vm = this;
        vm.isLastest = false;
        vm.pageNo = 1;
        vm.queryCourseList();
      },

      // 查看详情
      viewDetail(courseId) {
        let vm = this;
        vm.$router.push({path: '/courseDetail', query: {id: courseId}});
      },

      // mouseOver
      handleMouseOver() {
        let vm = this;


      },

      // mouseout
      handleMouseOut() {
        let vm = this;

      },

      // 登录
      loginIn () {
        let vm = this;

        vm.dialogVisible = !vm.dialogVisible;
      },

      // 注册
      loginOut () {

      },

      // 弹出框关闭
      handleDialogClose () {
        let vm = this;

        vm.dialogVisible = false;
      },

    },
    mounted() {
      let vm = this;

      vm.init();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .course-list-container {
        background-color: #f3f5f7;

        .header {
            background-color: #07111b;
            height: 40px;
            width: 100%;

            .header-inner {
                width: 80%;
                margin: 0 auto;

                .loginCls {
                    color: white;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    font: 'PingFang SC',"微软雅黑","Microsoft YaHei",Helvetica,"Helvetica Neue",Tahoma,Arial,sans-serif;

                    .login {
                        margin-right: 5px;
                        font-weight: bolder;
                    }

                    .login:hover {
                        color: red;
                    }
                }

                div {
                    height: 40px;
                }

                img {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    border: 2px solid #4d5559;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }

        .list-condition {
            background-color: white;
            width: 100%;
            box-shadow: 0 4px 8px 0 rgba(28,31,33,.1);

            .list-condition-inner {
                display: block;
                width: 80%;
                margin: 0 auto;

                .rowOne {
                    border-bottom: 1px solid #edf1f2;

                    img {
                        height: 60px;
                        margin-right: 16px;
                    }

                    .searchKey {
                        float: right;
                        margin-top: 15px;
                        width: 30%;
                    }
                }

                .rowTwo {
                    margin: 15px 0 15px 0;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #edf1f2;
                }

                .rowThree {
                    margin: 15px 0 15px 0;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #edf1f2;
                }

                .rowFour {
                    margin: 15px 0 15px 0;
                    padding-bottom: 15px;
                    /*border-bottom: 1px solid #edf1f2;*/
                }

                button {
                    border: none;
                    margin: 5px 16px 5px 0;
                }

                .subtitle {
                    width: 52px;
                    height: 20px;
                    line-height: 30px;
                    font-weight: 700;
                    font-size: 14px;
                    color: #07111b;
                    text-align: left;
                    margin-right: 16px;
                }

                .isActive {
                    border-radius: 4px;
                    background-color: #ECF5FF;
                    color: #409EFF;
                }
            }


        }

        .list-content {
            width: 80%;
            min-height: 600px;
            margin: 0 auto;

            .noRecordCls {
                text-align: center;
                font-size: 18px;
                color: grey;
            }

            .isActive {
                background-color: #ECF5FF;
                color: #409EFF;
            }

            .list-card {
                margin: 15px 0 15px 0;


                .image {
                    width: 100%;
                }

                .courseName {
                    font-size: 16px;
                    color: #07111b;
                    line-height: 24px;
                    word-wrap: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    max-height: 46px;
                    transition: all .3s;
                }

                .courseDirectionName {
                    font-size: 12px;
                    color: #93999f;
                    line-height: 24px;
                    margin-top: 8px;
                    font-weight: 400;
                    margin-right: 10px;
                }

                .courseStudyNum {
                    font-size: 12px;
                    color: #93999f;
                    line-height: 24px;
                    margin-top: 8px;
                    font-weight: 400;
                }

                .courseBriefIntro {
                    font-size: 12px;
                    color: #93999f;
                    line-height: 24px;
                    margin-top: 2px;
                    margin-bottom: 2px;
                    font-weight: 400;
                }
            }
        }

        .footer {
            background-color: #001528;
            height: 50px;
            color: white;

            p {
                margin-top:4px;
                margin-bottom: 4px;
                line-height: 1.8;
                font-size: 12px;
                color: #787d82;
                text-align: center;
            }
        }
    }
</style>