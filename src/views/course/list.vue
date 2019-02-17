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
                    <span>方向：</span>
                    <span v-for="(direction, index) in allDirection" :key="index">
                        <el-button @click="choseDirectionIdx = index"
                                :class="{isActive: index === choseDirectionIdx}">
                            {{direction}}
                        </el-button>
                    </span>
                </div>

                <div class="rowThree">
                    <span>分类：</span>
                    <span v-for="(category, index) in allCategory" :key="index">
                        <el-button @click="choseCategoryIdx = index"
                                   :class="{isActive: index === choseCategoryIdx}">
                            {{category}}
                        </el-button>
                    </span>
                </div>

                <div class="rowFour">
                    <span>难度：</span>
                    <span v-for="(difficult, index) in allDifficult" :key="index">
                         <el-button @click="choseDifficultIdx = index"
                                    :class="{isActive: index === choseDifficultIdx}">
                            {{difficult}}
                        </el-button>
                    </span>
                </div>

            </div>
        </div>

        <!--课程列表-->
        <div>

        </div>
    </div>
</template>

<script>
  export default {
    name: "list",
    data() {
        return {
          keyword: '',
          allDirection: ['全部', '前端开发', '后端开发', '移动开发', '算法&数学', '前沿技术', '云计算&大数据', ],
          allCategory: ['全部', '微服务', '区块链', '以太坊', '人工智能', '机器学习', ],
          allDifficult: ['全部', '入门', '初级', '中级', '高级'],
          choseDirectionIdx: 0,
          choseCategoryIdx: 0,
          choseDifficultIdx: 0,
        }
    },
    methods: {
      active: {

      }
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
                    border-bottom: 1px solid #edf1f2;
                }

                button {
                    border: none;
                    margin-right: 16px;
                }

                .isActive {
                    border-radius: 4px;
                    background-color: #ECF5FF;
                    color: #409EFF;
                }
            }


        }
    }
</style>