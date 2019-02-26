<template>
    <div class="login-container">
        <div class="loginTitle">
            <span style="margin-right: 16px;" @click="handleTitle" :class="{activeCls: isActive}">登录</span>
            <span @click="handleTitleRegister" :class="{activeCls: !isActive}">注册</span>
        </div>

        <!--登录-->
        <div v-show="isloginOrRegister">
            <el-form ref="loginform" :rules="loginRules" :model="loginform" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="loginform.username" placeholder="请输入登录手机号/邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginform.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" style="color: #9199a1;">七天内自动登录</el-checkbox>
                <span style="color: #9199a1;float: right;cursor: pointer;" @click="retrievePassword">找回密码</span>

                <div>
                    <el-button type="danger" round style="width: 100%;margin-top: 15px;" @click="handleLogin">登录</el-button>
                </div>

            </el-form>
        </div>

        <!--注册-->
        <div v-show="!isloginOrRegister">
            <el-form ref="regform" :model="regform" label-width="0px">
                <el-form-item prop="email">
                    <el-input placeholder="请输入注册邮箱" v-model="regform.email" style="width: 60%;"></el-input>
                    <el-select v-model="regform.emailAppend" placeholder="请选择" style="width: 40%;">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="password1">
                    <el-input placeholder="请输入密码(数字+字母，6-12位)" v-model="regform.password1" ></el-input>
                </el-form-item>

                <el-form-item prop="password2">
                    <el-input placeholder="请再次输入密码(数字+字母，6-12位)" v-model="regform.password2" ></el-input>
                </el-form-item>

                <el-form-item prop="verificationCode">
                    <el-input placeholder="请输入验证码" v-model="regform.verificationCode" ></el-input>
                </el-form-item>

                <div>
                    <el-button type="danger" round style="width: 100%;margin-top: 15px;" @click="handleRegister">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
  import { isvalidUsername } from "@/utils/validate";

  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error("请输入正确的用户名"));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      const validateEmail = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        isloginOrRegister: true, // 默认登录
        loginform: {
          username: '',
          password: '',
          verificationCode: '',

        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", validator: validateUsername },
          ],
          password: [
            { required: true, trigger: "blur", validator: validatePass }
          ]
        },
        regform: {
          email: '',
          password1: '',
          password2: '',
          emailAppend: '@qq.com',
          verificationCode: '',
        },
        regRules: {
          email: [
            { required: true, trigger: "blur", validator: validateEmail }
          ],
          password1: [
            { required: true, trigger: "blur", validator: validatePass }
          ],
          password2: [
            { required: true, trigger: "blur", validator: validatePass }
          ],
          verificationCode: [
            { required: true, trigger: "blur", validator: validateCode }
          ],
        },
        isActive: true,
        checked: false,
        options: [
          {
            label: '@qq.com',
            value: '@qq.com'
          },
          {
            label: '@163.com',
            value: '@163.com'
          },
          {
            label: '@139.com',
            value: '@139.com'
          },
          {
            label: '@gmail.com',
            value: '@gmail.com'
          },
          {
            label: '@yahoo.com',
            value: '@yahoo.com'
          },
        ],
      }
    },
    methods: {
      handleTitle() {
        let vm = this;

        vm.isActive = true;
        vm.isloginOrRegister = true;
      },

      handleTitleRegister() {
        let vm = this;

        vm.isActive = false;
        vm.isloginOrRegister = false;
      },

      // 找回密码
      retrievePassword() {
        let vm = this;


      },

      // 登录
      handleLogin() {
        let vm = this;


      },

      // 注册
      handleRegister() {
        let vm = this;


      },

    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .login-container {
        .loginTitle {
            font-size: 16px;
            color: #787d82;
            font-weight: bold;
            cursor: pointer;
            margin-top: -40px;
            margin-bottom: 24px;

            .activeCls {
                color: red;


            }
        }


    }
</style>