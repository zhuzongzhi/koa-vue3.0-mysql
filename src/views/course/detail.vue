<template>
    <div class="course-detail-container">
        <div class="course-detail-title">
            <el-row style="padding-top: 6px;">
                <el-col :span="6">
                    <!--面包屑-->
                    <Breadcrumb></Breadcrumb>
                </el-col>

                <el-col :offset="12" :span="6">
                    <div class="share">
                        <span style=";">
                            <i class="iconfont icon-shoucang"></i>
                            收藏
                        </span>
                        <span>
                            <i class="iconfont icon-weixin "></i>
                        </span>
                        <span>
                            <i class="iconfont icon-qq"></i>
                        </span>
                        <span>
                            <i class="iconfont icon-xinlang"></i>
                        </span>
                    </div>
                </el-col>
            </el-row>




        </div>


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

      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .course-detail-container {
        background-color: #2B4466;
        position: relative;
        width: 100%;
        height: 200px;

        .course-detail-title {
            display: block;
            width: 60%;
            margin: 0 auto;
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
</style>