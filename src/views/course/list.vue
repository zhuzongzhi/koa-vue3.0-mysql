<template>
    <div class="course-list-container">
        <!--搜索条件-->
        <div class="list-condition">
            <div class="list-condition-inner">
                <div class="rowOne">
                    <img src="../../assets/course/logo-course.png" alt="Logo" />
                    <img src="../../assets/course/course-top.png" alt="Logo" />

                    <el-input placeholder="搜索感兴趣的内容" v-model="keyword" class="searchKey">
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
                        <el-button @click="choseCategoryIdx = index"
                                   :class="{isActive: index === choseCategoryIdx}">
                            {{category.name}}
                        </el-button>
                    </span>
                </div>

                <div class="rowFour">
                    <span class="subtitle">难度：</span>
                    <span v-for="(difficult, index) in allDifficult" :key="index">
                         <el-button @click="choseDifficultIdx = index"
                                    :class="{isActive: index === choseDifficultIdx}">
                            {{difficult.name}}
                        </el-button>
                    </span>
                </div>

            </div>
        </div>

        <!--课程列表-->
        <div class="list-content">
            <div>
                <el-button round @click="isLastest = true" size="mini"
                           :class="{isActive: isLastest}">最新</el-button>
                <el-button round @click="isLastest = false" size="mini"
                           :class="{isActive: !isLastest}">最热</el-button>
            </div>

            <div class="list-card">
                <el-row>
                    <el-col :span="4" v-for="(course, index) in allCourses" :key="index"
                            :offset="(index > 0 && index%5) ? 1 : 0" style="margin-bottom: 15px;">
                        <el-card :body-style="{ padding: '0px', height: '260px' }">
                            <img :src="course.imgUrl" class="image">
                            <div style="padding: 14px;">
                                <span>{{course.name}}</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ new Date() }}</time>
                                    <el-button type="text" class="button">详情</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

                <el-pagination
                        style="width: 30%; margin: 0 auto; "
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>

        <div class="footer">
            <p>Copyright © 2019 imooc.com All Rights Reserved | 京ICP备 12003892号-11</p>
            <p>如有侵权，请及时联系网站管理员立即删除。</p>
        </div>
    </div>
</template>

<script>
  export default {
    name: "list",
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
          allCourses: [
            {
              name: '社交类App设计入门',
              briefIntroduction: '综合案例带你详细透析社区产品交互设计',
              imgUrl: require("../../assets/course/demo1.jpg"),
              keywords: ['App', '产品交互'],
              difficultIdx: '初级',
              hot: 1290,
            }, {
              name: '自然语言处理（NLP）入门与实践',
              briefIntroduction: '一步步教你轻松学习自然语言处理基础与实践',
              imgUrl: require("../../assets/course/demo2.jpg"),
              keywords: ['机器学习', '自然语言处理'],
              difficultIdx: '初级',
              hot: 2314,
            },{
              name: '社交类App设计入门',
              briefIntroduction: '综合案例带你详细透析社区产品交互设计',
              imgUrl: require("../../assets/course/demo1.jpg"),
              keywords: ['App', '产品交互'],
              difficultIdx: '初级',
              hot: 1290,
            }, {
              name: '自然语言处理（NLP）入门与实践',
              briefIntroduction: '一步步教你轻松学习自然语言处理基础与实践',
              imgUrl: require("../../assets/course/demo2.jpg"),
              keywords: ['机器学习', '自然语言处理'],
              difficultIdx: '初级',
              hot: 2314,
            },{
              name: '社交类App设计入门',
              briefIntroduction: '综合案例带你详细透析社区产品交互设计',
              imgUrl: require("../../assets/course/demo1.jpg"),
              keywords: ['App', '产品交互'],
              difficultIdx: '初级',
              hot: 1290,
            }, {
              name: '自然语言处理（NLP）入门与实践',
              briefIntroduction: '一步步教你轻松学习自然语言处理基础与实践',
              imgUrl: require("../../assets/course/demo2.jpg"),
              keywords: ['机器学习', '自然语言处理'],
              difficultIdx: '初级',
              hot: 2314,
            },{
              name: '社交类App设计入门',
              briefIntroduction: '综合案例带你详细透析社区产品交互设计',
              imgUrl: require("../../assets/course/demo1.jpg"),
              keywords: ['App', '产品交互'],
              difficultIdx: '初级',
              hot: 1290,
            }, {
              name: '自然语言处理（NLP）入门与实践',
              briefIntroduction: '一步步教你轻松学习自然语言处理基础与实践',
              imgUrl: require("../../assets/course/demo2.jpg"),
              keywords: ['机器学习', '自然语言处理'],
              difficultIdx: '初级',
              hot: 2314,
            },{
              name: '社交类App设计入门',
              briefIntroduction: '综合案例带你详细透析社区产品交互设计',
              imgUrl: require("../../assets/course/demo1.jpg"),
              keywords: ['App', '产品交互'],
              difficultIdx: '初级',
              hot: 1290,
            }, {
              name: '自然语言处理（NLP）入门与实践',
              briefIntroduction: '一步步教你轻松学习自然语言处理基础与实践',
              imgUrl: require("../../assets/course/demo2.jpg"),
              keywords: ['机器学习', '自然语言处理'],
              difficultIdx: '初级',
              hot: 2314,
            },
          ],
          currentPage4: 1,

        }
    },
    methods: {
      async init() {
        let vm = this;

        await vm.queryCourseDirection();
        await vm.queryAllCourseCategory();
        await vm.queryCourseDifficult();
      },

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

      async queryAllCourseCategory() {
        let vm = this;

        this.$store
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

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      handleDirection (index) {
        let vm = this;
        vm.choseDirectionIdx = index;
        vm.allCategory = [{id: 0, name: '全部'}];
        vm.queryAllCourseCategory();
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
            margin: 0 auto;

            .isActive {
                background-color: #ECF5FF;
                color: #409EFF;
            }

            .list-card {
                margin: 15px 0 15px 0;


                .image {
                    width: 100%;
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