<template>
	<div class="text-center outcontainer finish-wrap">
		<div class="container row" style="background-color:pink;">

			<!--
          	作者：offline
          	时间：2018-09-07
          	描述:登录样式
         -->
			<div class="col-lg-5 col-md-5 col-sm-6 leftcontain" style="height: 480px; text-align: center;margin: 0 auto;">
				<img src="../assets/images/logo.png" class="logo" />
				<div>
					<h3>登录</h3>
				</div>

				<div class="login">
					<b-form class="form" @submit="Login">

						<b-form-group id="exampleInputGroup1" label-for="exampleInput1">
							<b-form-input id="exampleInputusername" style="border-bottom:  solid 1px #616161;background-color: pink;" type="text" v-model="form.username" placeholder="邮箱/手机号">

							</b-form-input>

							<div style="display: none;color: blue;" class="username-error">请输入手机号或者邮箱<label class="username-lable">　　　　　　</label></div>
						</b-form-group>

						<b-form-group id="exampleInputGroup2" label-for="exampleInput2">
							<b-form-input id="exampleInputpassword" style="border-bottom:  solid 1px #616161;background-color: pink;" type="password" v-model="form.password" placeholder="密码">
							</b-form-input>

							<div style="display: none;color: blue;" class="password-error"><label class="password-lable">密码由6-16位数字和大小写字母组成</label></div>
						</b-form-group>
						<div>
							<b-button class="b-btn" type="submit" style="margin: 0px auto;" variant="danger">登录</b-button>
						</div>
						<div class="wxl"><img src="../assets/images/weixin.png" class="weixin" style="margin-top: 15px;"/><span class="wxlogin">微信登陆</span></div>
						<div><span id="forgetpws" @click="findbackpws" v-b-modal.mymo style="font-size: 16px;">忘记密码</span></div>

					</b-form>
					<div id="mymodal">
		            <b-modal id="mymo" visible hide-backdrop no-close-on-backdrop hide-backdrop no-fade no-close-on-esc  no-enforce-focus header-bg-variant="danger" size="lg" title="邮箱验证" v-model="show" hide-footer>
                        <div slot="modal-header" class="w-100">
			          	 
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="delmodal">
			          	 </span>
			            </div>
							<b-form v-if="show" @submit="onSubmit" @reset="onReset">

								</b-form-group>
								<b-form-group id="exampleInputGroup3" label-for="exampleInput3">
									<b-form-input id="exampleInput3" type="text" v-model="form.email" placeholder="请输入邮箱">
									</b-form-input>
									<div style="display: none;" class="email-error"><label class="email-lable">请输入邮箱正确格式</label></div>
								</b-form-group>

								<b-button type="submit" variant="primary" id="buttonsub">提交</b-button>
								<b-button type="reset" variant="danger">重置</b-button>
							</b-form>

						</b-modal>
					</div>
				</div>

			</div>
			<!--
            	作者：offline
            	时间：2018-09-19
            	描述：错误提示框
            -->
			<div id="moe">
				<b-modal  id="mymoe" visible hide-backdrop no-close-on-backdrop hide-backdrop no-fade no-close-on-esc  no-enforce-focus header-bg-variant="danger" size="lg" title="邮箱验证" v-model="showe" hide-footer>
                        <div slot="modal-header" class="w-100">
			          	 
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="delmodale">
			          	 </span>
			            </div>							                                
                    <span style="color: red;">用户名或密码错误  </span>                       
						</b-modal>
				
			</div>

			<img src="../assets/images/link.jpg" class="col-lg-7 col-md-7 col-sm-6 beauty" style="height: 480px;padding: 0px;margin: 0px;" />

		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				form: {
					username: '',
					password: '',
					email: ''
				},
				show: false,
				showe:false
			}
		},
		created: function() {
			 
			/**
			 * 微信登录
			 */
			//router.beforeEach((to, from, next) => {
			//if(window.location.href.indexOf('code')>=0){
			//  //如果url中包含code,则保存到store中
			//  let code = window.location.href.split("?")[1];
			//  code = code.substring(5,code.indexOf('&'));
			//  store.state.code = code;
			//}
			// 
			//if(to.path == '/login' && store.state.user) {
			//  next('/')
			//  return false
			//}else if((!sessionStorage.getItem("userid") || !store.state.user) && to.path != '/login'){
			//  // 第一次进入项目
			//  //store.state.beforeLoginUrl = to.fullPath; // 保存用户进入的url
			//  next('/login')
			//  return false
			//}else if(!store.state.user && to.path != '/login'){
			//  // 之前有获取过授权
			//  next('/login')
			//  return false
			//}
			//next()
			//})
			/**
			 * 判断vuex中有没有保存登录状态
			 */
			//	this.url = 'https://open.weixin.qq.com/connect/qrconnect?appid='+this.appid + '&redirect_uri='+ this.redirect_uri +'&response_type=code&scope=snsapi_login#wechat_redirect';
			//    /*************************************************************/
			//    if(sessionStorage.getItem("userid")){
			//      this.login();
			//      //如果sessionStorage中有userid,执行login
			//    } else if(this.$store.state.code){
			//      //如果只是有code
			//     let _self = this;
			//      //发请求，用code换token
			//      this.$axios({
			//        method: 'post',
			//        url: this.baseURL + "/login",
			//        data: {
			//          code: this.$store.state.code
			//        }
			//      })
			//      .then(function(response){
			//      //token和登录状态先保存在sessionStorage里
			//        sessionStorage.setItem("token",response.data.token);
			//        sessionStorage.setItem("userid",response.data.userid);
			//    })
			//    .catch(function(error){
			//      console.log(error);
			//    })
			//    }
			//    else{
			//      let self=this;
			//      if (self && !self._isDestroyed) {
			//        //如果失败了还是弹二维码
			//        window.location = self.url;
			//      }
			//    }

		},
		
		mounted: function() {
			 /*hover添加pointer效果*/
		      $("#forgetpws").mouseover(function(event) {
		        $(this).css("cursor","pointer");
		      });
		},

		methods: {
			/**
			 * 微信登录
			 */
			//			login() {
			//      let userid = {'userid': sessionStorage.getItem("userid")};
			//      //token放到header里，一定要加Bearer空格
			//      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("token");
			//      console.log('axios headers Authorization set!');
			//      let _self = this;
			//      //登录请求
			//      this.$axios({
			//        method: 'get',
			//        url: this.baseURL + "xxx",//向后端请求的地址
			//        data: {
			//          userid: sessionStorage.getItem("userid")
			//        }
			//      })
			//      .then(response => {
			//        if(response.status==200){
			//          _self.$store.state.user = response;
			//          _self.$router.push('/');
			//          beforeLoginUrl+_self.$store.state.adminNav);
			// 
			//        } else{
			//          if(sessionStorage.getItem("userid")){
			//            window.location = _self.url;
			//          }
			//        }
			//      })
			//      .catch(function(error){
			//        console.log(error);
			//        window.location = _self.url;
			//})
			/**
			 * 登录
			 */
			Login(evt) {
				var self = this;
				evt.preventDefault();
				var Sha1 = require('../../node_modules/sha.js').sha1
				// 添加的混淆信息
				var extra = "cn%voa$foj/pal&slfj!imz3pa?vnohao";
				//密码加密
				var password = new Sha1().update(this.form.password + extra).digest('hex');
				// console.log(password);
				//用户名正则验证手机号验证或者邮箱验证
				var regUN1 = {
					regUsername1: /^1(3|4|5|7|8)\d{9}$/
				};
				var regUsername1 = regUN1.regUsername1.test(this.form.username);
				var regUN2 = {
					regUsername2: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
				};
				var regUsername2 = regUN2.regUsername2.test(this.form.username);
				if(!regUsername1 && !regUsername2) {
					$('.username-lable').text('');

					$(".username-error").show();
				} else {
					$('.username-error').hide();
				}
				$("#exampleInputusername").blur(function() {
					var username = $("#exampleInputusername").val();
					if(!(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/).test(username)&&!(/^1(3|4|5|7|8)\d{9}$/).test(username)) {
						$('.username-lable').text('');
                        
						$(".username-error").show();
					} else {
						$('.username-error').hide();
					}
				});
				//密码正则验证
				var regPWD = {
					regPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/
				};
				var regPasswords = regPWD.regPassword.test(this.form.password);
				if(!regPasswords) {
					$('.paswword-lable').text('');

					$(".password-error").show();
				} else {
					$('.password-error').hide();
				}
				$("#exampleInputpassword").blur(function() {

					var userpassword = $("#exampleInputpassword").val();
					
					if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/).test(userpassword)) {

						
                         
						$(".password-error").show();
					} else {
						$('.password-error').hide();
					}
				});
				
				this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/login/login',
						dataType: 'json',
						contentType: 'application/json',
						data: {
							username: this.form.username,
							password: password
						}
					}).then(function(data) {
						if(data.data.status == 'error') {
							this.showe=true;
						} else {
							console.log(data);
							console.log("前一页token:")
							this.token = data.data.token;

							this.usermsg = data.data;
							this.usermsg = JSON.stringify(this.usermsg);
							window.localStorage.setItem('usermsg', this.usermsg)

							console.log(window.localStorage.getItem('usermsg'));
							this.$router.push({
								name: 'home1',
								params: {
									usermsg: this.usermsg
								}
							});
							console.log(data.data.type);
							         if(data.data.type==''){
							         	this.$router.push({name: 'choice',params: {usermsg:this.usermsg}});
							         }else{
							         	this.$router.push({name: 'homeThree',params: {usermsg:this.usermsg}});
							         }

						}
						console.log(data.data.status)
					}.bind(this))
					.catch(function(err) {
						alert("登录失败");
						console.log(err)
					}.bind(this))

			},
			findbackpws: function() {
				this.form.email = '';
			},
			delmodal:function(){
				this.show=false;
			},
			delmodale:function(){
			    this.showe=false;
		    },
			/**
			 * 发送邮件找回密码
			 */
			onSubmit(evt) {
				evt.preventDefault();
				JSON.stringify(this.form);
				var formdata = JSON.stringify(this.form);
				var obj = eval("(" + formdata + ")")
				var email = obj.email;
				var regEmail = {
					regEmail1: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
				};
				var regEmail2 = regEmail.regEmail1.test(email);
				if(!regEmail2) {
					$('.email-lable').text('');
					$('').blur();
					$(".email-lable").append("请您输入正确邮箱格式");
					$(".email-error").show();
				} else {
					$(".email-error").hide();
				}
				this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/users_management/user/sendEmail',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': this.token
						},
						data: {
							email: email,
						}

					}).then(function(response) {
						if(response.data.state == 'success') {
							// self.myData = data;
							//console.log("前一页token:")
							//this.token = data.data.token;
							//global_.token = this.token;
							//console.log(this.token);
							//window.localStorage.setItem('token', this.token)
							// this.$router.push({n: 'home1',params: { token: this.token,searchShow:true }});
							// console.log(data.data.status);
							this.show = false;
							alert("请您查看邮箱修改新密码");
							window.location.href = '';
						} else {
							alert("邮箱不存在");
							//this.show = false;
							this.form.email = '';
						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))
			},
			onReset(evt) {
				evt.preventDefault();
				this.form.email = '';

			}
		}
	}
</script>

<style scoped lang="less">
	/**
	 * 登录的样式
	 */
	.esc-img{
  	width: 10px;
  	height: 10px;
  }
	.finish-wrap {
		background-color: red;
		height: 100%;
		position: fixed;
		width: 100%;
		margin-top: -60px;
	}
	
	#mymodal /deep/ #mymo /deep/ .modal-title {
		margin-left: 350px;
	}
	
	#mymodal /deep/ #mymo {
		margin-top: 200px;
	}
	
	#mymodal /deep/ #mymo /deep/ .form-control {
		border: solid 1px gray;
	}
	#moe /deep/ #mymoe /deep/{
		margin-top: 150px;
		margin-left: 700px;
		text-align: center;
		width: 300px;
		
	}
	.container {
		margin: 0 auto;
		margin-top: 120px;
		padding: 0px;
		width: 1024px;
		height: 480px;
		border-radius: 6px;
	}
	
	.logo {
		float: left;
		margin-left: 15px;
		margin-top: 15px;
	}
	
	.login {
		margin-left: 40px;
		margin-top: 40px;
	}
	
	h3 {
		margin-top: 70px;
		color: red;
		font-family: "微软雅黑";
		font-size: 35px;
		margin-left: 30px;
		text-align: center;
	}
	
	.form-control {
		text-align: center;
		border-radius: none;
		border: none;
		border-bottom-color: white;
		border-top-color: white;
	}
	
	.b-btn {
		width: 200px;
		margin-left: 40px;
		background-color: red;
		font-size: 25px;
	}
	
	.beauty {
		width: 418px;
		height: 480px;
		margin-top: -2px;
		border-bottom-right-radius: 6px;
		border-top-right-radius: 6px;
	}
	
	hr {
		background-color: black;
		margin-top: -34px;
	}
	
	.b-btn {
		width: 80%;
		border: none;
	}
	
	.weixin {
		height: 36px;	
	}
	.mymoe{
		margin-top: 100px;
	}
	.wxlogin{
		display: table-cell;
        vertical-align: bottom;
		font-size: 24px;
		
	}
	.wxl{
		display: table;
		margin: 10px 0 0 100px;
	}
	/**
	 * placeholder属性变色
	 */
	
	input::-webkit-input-placeholder,
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: red;
	}
	
	input:-moz-placeholder,
	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: red;
	}
	
	input::-moz-placeholder,
	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: red;
	}
	
	input:-ms-input-placeholder,
	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: red;
	}
	/**
     * 媒体查询适应不同屏幕大小
     */
	
	@media (min-width: 0px) and (max-width: 600px) {
		.container {
			width: 72%;
			margin-left: 60px;
		}
		.beauty {
			display: none;
			margin-top: 100px;
			width: 100%;
		}
		.h3 {
			margin-left: -10px;
			background-color: red;
		}
		.leftcontain {
			text-align: center;
		}
		hr {
			background-color: black;
			margin-top: -35px;
		}
		.errordel{
		 margin-left: 350px;
	    }
		.weixin {
			
			height: 30px;
			
		}
		.wxlogin{
		 display: table-cell;
         vertical-align: bottom;
		 font-size: 20px;
	   }
	   .wxl{
	   	 display: table;
		 margin: 10px 0 0 50px;
	   }
		#mymodal /deep/ #mymo /deep/ .modal-title {
			margin-left: 40%;
		}
		#moe /deep/ #mymoe /deep/{
		margin-top: 150px;
		margin-left: 70px;
		text-align: center;
		width: 70%;
		
	}
	}
	
	@media (max-width: 320px) and (max-width: 568px) {
		.container {
			width: 76%;
			margin-left: 44px;
		}
		.beauty {
			display: none;
			margin-top: 100px;
			width: 100%;
		}
		.h3 {
			margin-left: -10px;
		}
		.leftcontain {
			text-align: center;
		}
	}
</style>