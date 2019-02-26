<template>
    <div class="course-detail">
        <div class="course-detail-container">
            <div class="course-detail-title">
                <el-row style="padding-top: 6px;">
                    <el-col :span="6">
                        <!--面包屑-->
                        <Breadcrumb></Breadcrumb>
                    </el-col>

                    <el-col :offset="12" :span="6">
                        <div class="share">
                            <span v-show="!course.isCollection"><i class="iconfont icon-shoucang"></i>收藏</span>
                            <span v-show="course.isCollection"><i class="iconfont icon-shoucang-tianchong"></i>取消</span>

                            <span v-for="(item, index) in shares" :key="index">
                            <i :class="item.clsName" @click="shareLink(item.id)"></i>
                        </span>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <h1 class="courseTitle">{{course.courseTitle}}</h1>
                </el-row>

                <el-row style='margin-top: 50px;'>
                    <el-col :span="6">
                        <div style="position: relative;">
                            <img :src="user.imgNick" alt="头像" class="imgNick">
                            <span style="position: absolute;color: #fff;padding-left: 16px;" >{{user.nickName}}</span>
                            <span style="color: #fff;padding-left: 16px;padding-bottom: 10px;position: absolute;top: 22px;">{{user.position}}</span>
                        </div>
                    </el-col>

                    <el-col :span="12" :offset="6" class="courseInfo">
                        <span>难度：{{course.difficult}}</span>
                        <span>时长：{{course.study_time_len}}分钟</span>
                        <span>学习人数：{{course.study_num}}人</span>
                        <span>综合评价：{{course.evaluation}}</span>
                    </el-col>
                </el-row>

            </div>
        </div>

        <!--四个目录-->
        <div class="course-mulu-outer">
            <div class="course-mulu-inner">
                <el-row>
                    <el-col :span="6"><span class="subtilte" :class="{activeCls: 0 === choseIndex}" @click="choseIndex = 0">课程章节</span></el-col>
                    <el-col :span="6"><span class="subtilte" :class="{activeCls: 1 === choseIndex}" @click="choseIndex = 1">问答评论</span></el-col>
                    <el-col :span="6"><span class="subtilte" :class="{activeCls: 2 === choseIndex}" @click="choseIndex = 2">用户评价</span></el-col>
                    <el-col :span="6"><span class="subtilte" :class="{activeCls: 3 === choseIndex}" @click="choseIndex = 3">WIKI</span></el-col>
                </el-row>
            </div>
        </div>

        <!--课程章节-->
        <div class="course-content">
            <el-card class="box-card">
                {{course.jianjie}}
            </el-card>

            <el-card class="box-card" v-for="(item, index) in course.zhanjie" :key="index">
                <div style="color: #1c1f21;font-size: 16px;font-weight: 700;line-height: 24px;">
                    第{{index+1}}章 {{item.title}}
                </div>
                <div style="margin-top: 2px; font-size: 12px; color: #545c63; line-height: 18px;">{{item.jianjie}}</div>
                <div v-for="(item2, index2) in item.children" :key="index2" style="padding-left: 16px;margin-top: 15px;">
                    <span style="color: #1c1f21;font-size: 16px;">{{index+1}}-{{index2+1}} {{item2.title}}</span>
                </div>
            </el-card>
        </div>

        <!--问答评论-->

        <!--用户评价-->

        <!--WIKI-->

    </div>

</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: "detail",
    components: {
      Breadcrumb,
    },
    data() {
      return {
        choseIndex: 0,
        course: {
          isCollection: false,
          courseTitle: '逻辑回归原理与应用',
          difficult: '初级',
          study_time_len: 120,
          study_num: 300,
          evaluation: 8.2,

          jianjie: '简介：本门课程会带大家从Http基础知识包括Http协议，HttpURLConnection类的使用以及get、post、put、delete请求的处理开始，学习掌握json数据格式及解析方式，学习封装okhttp框架来适应现在主流app的使用，最后还会为大家总结Android中网络处理的常见问题和经验技巧。',
          zhanjie: [{
            title: '课程介绍及目标',
            jianjie: '课程介绍及课程目标',
            children: [{
              title: '课程介绍',

            },{
              title: '课程目标',

            }]
          },{
            title: 'HTTP基础',
            jianjie: '本章将带大家学习Android中Http基础内容，包括http协议的基本概念，协议特点，三次握手，HttpURLConnection类的使用，为大家演示get、post、put、delete请求操作处理，分析Http协议结构',
            children: [{
              title: 'http协议',
            },{
              title: 'http特点',
            },{
              title: 'HttpUrlConnection介绍及get请求-1',
            },{
              title: 'HttpUrlConnection介绍及get请求-2',
            },{
              title: 'post请求操作',
            },{
              title: 'put_delete请求操作',
            },{
              title: 'http协议结构解析',
            }]
          },]
        },
        user: {
          nickName: 'nickcau',
          imgNick: require('../../assets/course/touxiang.jpg'),
          position: '全栈工程师',
          study_num: '',

        },
        shares: [
          {
            id: 'weixin',
            clsName: 'iconfont icon-weixin',
          },
          {
            id: 'qq',
            clsName: 'iconfont icon-qq',
          },
          {
            id: 'xinlang',
            clsName: 'iconfont icon-xinlang',
          },
        ],
      }
    },
    methods: {
      // 分享链接
      shareLink(id) {
        let vm = this;
        console.log('分享链接', id);

      },

    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .course-detail {
        .course-detail-container {
            background-color: #2B4466;
            position: relative;
            width: 100%;
            height: 200px;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font: 14px/1.5 "PingFang SC","微软雅黑","Microsoft YaHei",Helvetica,"Helvetica Neue",Tahoma,Arial,sans-serif;

            .course-detail-title {
                display: block;
                width: 60%;
                margin: 0 auto;

                .courseInfo {
                    color: #fff;

                    span {
                        margin-right: 16px;
                        height: 40px;
                        line-height: 40px;

                    }
                }

                .imgNick {
                    width: 48px;
                    height: 48px;
                    border-radius: 100%;
                }

                .courseTitle {
                    font-weight: 100;
                    position: relative;
                    z-index: 1;
                    margin-bottom: 8px;
                    line-height: 48px;
                    font-size: 32px;
                    color: #fff;
                }

                .share {
                    color: rgba(255,255,255,.6);
                    font-size: 12px;
                    height: 50px;
                    line-height: 50px;
                    display:flex;
                    align-items:center;
                    justify-content: center;
                    width: 100%;

                    span {
                        margin-right: 16px;
                        display:flex;
                        align-items:center;
                        justify-content: center;
                        width: 100%;
                        cursor: pointer;

                        i {
                            font-size: 24px;
                        }
                    }
                }
            }

            .el-row {
                height: 40px;
            }
        }

        .course-mulu-outer {
            width: 100%;
            height: 68px;
            line-height: 68px;
            box-shadow: 0 4px 8px 0 rgba(28,31,33,.1);

            .course-mulu-inner {
                width: 60%;
                margin: 0 auto;

                .subtilte {
                    color: #1c1f21;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 16px;
                }

                .subtilte:hover {
                    color: red;
                }

                .activeCls {
                    color: red;
                }
            }
        }

        .course-content {
            margin-top: 15px;
            width: 100%;

            .box-card {
                width: 60%;
                margin: 0 auto;
                margin-top: 15px;
                line-height: 28px;
                padding: 24px 32px 32px;
            }
        }
    }

</style>