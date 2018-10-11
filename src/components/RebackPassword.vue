<template>
  <div class="container">
    
    <div class="row">
       <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
      <div class="col-xs-8 col-sm-8 col-md-6 col-lg-6" id="rebackPassworHead">
          <img src="../assets/images/logo.png" class="logo"/>
          <p class="p"><b>找回密码</b></p>
    </div>
  </div>

    <div class="row">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 "></div>
      <div class="col-xs-8  col-sm-8 col-md-8   col-lg-8">
        <b-form @submit="rebackPassword">
          <b-form-group class="newPassword">
            <b-form-input id="passwordInput1"
                          type="password"
                          v-model="form.newpassword"
                          required
                          placeholder="请输入您的新密码"
                          >
            </b-form-input>
            <div class="passwordNotNull1">
                <label>密码不能为空</label>
              </div>
              <div class="passwordErr1">
                <label>密码为6-14位大小写字母、数字组合</label>
              </div>
          </b-form-group>
          <b-form-group id="confirmPassword">
            <b-form-input id="passwordInput2"
                          type="password"
                          v-model="form.confirmPassword"
                          required
                          placeholder="请确认您的密码">
            </b-form-input>
            <div class="passwordNotNull2">
                <label>密码不能为空</label>
              </div>
              <div class="passwordErr2">
                <label>密码为6-14位大小写字母、数字组合</label>
              </div>
              <div class="passwordRepeace">
                <label>两次密码不一致</label>
              </div>
          </b-form-group>
          <b-button type="submit" variant="danger" class="confirmButton">确认</b-button>
        </b-form>
      </div>
    </div>    
  </div>
</template>

<style type="text/css" scoped>
   .container {
    width: 50%;
    height: ;
    margin-top: 5%;
    margin-left: 25%;
    border: 1px solid #000;
  }
  #rebackPassworHead{
    margin-top: 10%;
  }
   .logo {
    margin-top: %;
    margin-bottom: 10%;
    size: 20px;
    float:left;
    display: block;
    max-width: 150%;
  }
  .p{
    margin-top: %;
    margin-left: 5%;
    color:#e64035;
    position:relative;
    float:left;
  } 
  @media(min-width: 768px){
    .p{
      font-size: 30px;
    }
    .logo{
      size: 10px;
      float: left;
      display: block;
     max-width: 150%;
    }

  }
    @media(max-width: 993px){
    .p{
      font-size: 20px;
    }
    .logo{
      float: left;
    }
    .container{
      width: 80%;
      height: 100%;
      margin-left: 10%;
      margin-top: 25%; 
    }
  }

  #passwordInput1{
    margin-top: 10%;
  }
  #passwordInput2{
    margin-top: 5%;
  }
  .confirmButton{
    margin-top: 5%;
    margin-bottom: 15%
  }
  .passwordNotNull1,.passwordErr1,.passwordNotNull2,.passwordErr2,.passwordRepeace{
    color:  #e64035;
    display: none;
  }
</style>
<script scoped>
export default {
  data () {
    return {
      form: {
        newpassword: '',
        confirmPassword: ''
      },

      show: true
    }
  },
  created:function(){
    var self =this;
    var url = window.location.href;
       var theRequest = new Object(); 
       if (url.indexOf("=") != -1) { 
          var str = url.substr(url.indexOf("=")+1);
          var sss=str.replace("%20"," ");
       self.token=sss;
       }
  },
  mounted:function(){
    var self=this;

     $('#passwordInput1').blur(function(){
        $('.passwordNotNull1').css("display","none");
        $('.passwordErr1').css("display","none");
        if (self.form.newpassword!=='') {
        var regPWD = {regPassword:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/};
        var regPasswords = regPWD.regPassword.test(self.form.newpassword);
        if (!regPasswords) {
          $('.passwordNotNull1').css("display","none");
          $('.passwordErr1').css("display","inline-block");
        }else{
          $('.passwordErr1').css("display","none");
        }
        }else{
          $('.passwordNotNull1').css("display","inline-block");
        }
      });

     $('#passwordInput2').blur(function(){
        $('.passwordNotNull2').css("display","none");
        $('.passwordErr2').css("display","none");
        if (self.form.confirmPassword=='') {
         $('.passwordNotNull2').css("display","inline-block");
        }else if (self.form.confirmPassword!==self.form.newpassword) {
          $('.passwordNotNull2').css("display","none");
          $('.passwordRepeace').css("display","inline-block");
        }else{
          $('.passwordRepeace').css("display","none");
        }
      });
  },
  methods: {
    rebackPassword (evt) {
      evt.preventDefault();
      var Sha1 = require('../../node_modules/sha.js').sha1
      var extra="cn%voa$foj/pal&slfj!imz3pa?vnohao";
      var newpwd=new Sha1().update(this.form.newpassword+extra).digest('hex');
        
      this.$ajax({
        method: 'post',
        url: 'https://recruitment.cqcyit.com:8090/users_management/update/resetpassword',
        dataType: 'json',
        headers:{
           'Content-Type': 'application/json',
           'Authorization':this.token
        },
        data: {
          password: newpwd
        }
      }).then(function(data){
        alert("您已修改密码，请重新登录!");
        window.location.href='';
      }.bind(this))
       .catch(function(err){
            alert("发送失败");
            console.log(err)
          }.bind(this));
     }
  }
}
</script>