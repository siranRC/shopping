<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{ required : true,regex:/^1\d{10}$/ }" :class="{invalid:errors.has('phone')}">
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="{ required : true,regex:/^\d{6}$/ }" :class="{invalid:errors.has('code')}">
        <button style="width:100px; height=38px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password"  @keyup="veriPassword(this)">
        <span class="error-msg">{{ errMsg1}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1"  @keyup="veriPasswordSec(this)">
        <span class="error-msg">{{errMsg2}}</span>
      </div>
      <div class="controls">
        <input  type="checkbox" v-model="agree" name="agree" v-validate="{ required : true,'tongyi':true }" :class="{invalid:errors.has('agree')}"> 
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegiste">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        //手机号
        phone: '',
        //验证码
        code:'',
        //密码
        password:'',
        //确认密码
        password1:'',
        //同意协议
        agree:true,
        //错误信息
        errMsg1:'',
        errMsg2:''
      };
    },
    methods:{
      //获取验证码
      //ajax请求是异步的,awit会等待请求完成，阻塞后面的代码，等请求回数据再执行后续代码 ，不写awit，awit后语句直接拿数据，数据却没返回，渲染页面导致更新延迟（多次触发事件，数据才渲染页面）。
     async getCode(){
        //简单判断一下
        try {
           const {phone} = this
        phone && await this.$store.dispatch('getCode',phone)
        //将组件的code值变为仓库中的验证码
        this.code = this.$store.state.user.code
        } catch (error) {
          alert(error.message)
        }
       
      },
      //用户注册
     async userRegiste(){
      const success = await this.$validator.validateAll();
      //全部表单验证成功，再向服务器发请求
      if(success){
        try {
          //如果成功，路由跳转（到登录界面）
         const {phone,code,password,password1} = this;//提醒一下，如果你的vue代码风格都是不加分号';'，这里(phone&&code&&。。。。)是小括号开头，要注意分号问题。不然会报错。
       /* (phone&&code&&password==password1)&& */await this.$store.dispatch('userRegister',{phone,code,password}) 
        this.$router.push('/login')
       } catch (error) {
          alert(error.message)
        }
      }      
      },
      //密码验证
      veriPassword(){
        let reg =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ //字母数字
       let result = reg.test(this.password)
        if(result){
        this.errMsg1 = ''
          return true
        }else{
        this.errMsg1 = '格式不正确'
        }
       
      },
      //密码再次确认
      veriPasswordSec(){
        if(this.password == this.password1){
          this.errMsg2 = ''
          return true
        }else{
          this.errMsg2 = '密码不一致'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>