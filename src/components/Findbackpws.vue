<template>
	<div style="background-color: red; " class="outcontainer finish-wrap">
	<div class="container">
		<div>
			<img src="../assets/images/logo.png" class="logo" />
		</div>
		<div><h3 style="color: red;">找回密码</h3></div>
		<div>
			<b-form  class="form">
					    <b-form-group id="exampleInputGroup1"
	                    label="新的密码:"
	                    label-for="exampleInput1">
	       	 				<b-form-input id="exampleInput1" style="border-bottom:  solid 1px #616161;background-color:lightpink;"
	                      type="password"
	                      v-model="form.password"
	                      required
	                     >
	        				</b-form-input>
	        				 <div style="display: none;color: red;" class="password-error"><label class="password-lable" >　　　　　</label></div>
	      				</b-form-group>
      
	      			
	         		 <b-form-group id="exampleInputGroup2"
	                    label="确认密码:"
	                    label-for="exampleInput2">
	        			<b-form-input id="exampleInput2" style="border-bottom:  solid 1px #616161;background-color: lightpink;"
	                      type="password"
	                      v-model="form.newpassword"
	                      required
	                      >
	        			</b-form-input>
	        		 <div style="display: none;color: red;" class="newpassword-error"><label class="newpassword-lable" ></label></div>
	      			</b-form-group>
	      			
				     <b-button type="submit" class="b-btn" variant="primary" style="margin-top: 20px;" @click="updatepws">确认</b-button>
			</b-form>
		</div>
	</div>
	</div>
</template>

<script>
	export default{
	 data:function(){
	 	return{
	 		form:{
	 			password:'',
	 			newpassword:'',
	 		},
	 	}
	 	
	     
	   
	 },
	 
	 created:function(){
	 		
   	   	//页面加载获取用户信息
 	   		var self = this;
			self.usermsg = window.localStorage.getItem('usermsg');			
			var usermsg = self.usermsg;
			var usermsg = eval("(" + usermsg + ")");
			self.usermsg = usermsg;
			self.token = self.usermsg.token;
			var token = self.token;
			
	 },
	 
	 methods:{
	 	  updatepws(evt){
	 	  		  	var _this = this;
				    var token = _this.token;
	 	  	 		evt.preventDefault();
	 	  	 		
	 	            JSON.stringify(this.form);
				    var formdata= JSON.stringify(this.form);
				   	var obj = eval( "(" + formdata+ ")" )
        			var password=obj.password;
        			var newpassword=obj.newpassword;
			        var regPWD = {regPassword:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/};
		            var regPassword1 = regPWD.regPassword.test(password);
		           
		            var regPassword2=regPWD.regPassword.test(newpassword);
		            
		            if (regPassword1==false) {
		            	$('.password-lable').text('');
		                $('.password-lable').append("密码必须包括6至16位的大小写字母和数字");
		                $('.password-error').show();
		            } else{
	            	    $('.password-lable').text('');
	                    $('.password-error').hide();
		            }
		            if (regPassword2==false) {
		            	
		            	$('.newpassword-lable').text('');
		                $('.newpassword-lable').append("密码必须包括6至16位的大小写字母和数字");
		                $('.newpassword-error').show();
		            } else{
		            	$('.newpassword-lable').text('');
		                $('.newpassword-error').hide();
		            }
    			if (password==newpassword&&regPassword1==true&&regPassword2==true) {
    				var Sha1 = require('../../node_modules/sha.js').sha1
		           // 添加的混淆信息
		            var extra="cn%voa$foj/pal&slfj!imz3pa?vnohao";
		           //密码加密
		            var newpwd=new Sha1().update(this.form.password+extra).digest('hex');
		           // console.log(password);
		           console.log(newpwd);		        
     			  	this.$ajax({       
			          method: 'post',  
			          url: 'https://recruitment.cqcyit.com:8090/cqcyit.users_management/update/resetpassword',
			          headers: {
			            'Content-Type': 'application/json',
			            'Authorization' : this.token
			          },
			          data: {
			           password:newpwd,
			          
			          }
			          
			        }).then(function(response){
			          if(response.data.state=='error'){
			            this.form.password='';
			            this.form.newpassword='';
			            alert("密码重置出现错误，请重试");
			          }else{
			            this.form.password='';
			            this.form.newpassword='';
			            this.show=false;
			             alert("恭喜您密码已经重置");
			          }        
			        }.bind(this))
			        .catch(function(err){           
			          console.log(err)
			        }.bind(this))
     				
     			}else if(password!=newpassword){
     				   
		                alert("两次密码不一样");
		               
     			}else{
     					//$('.newpassword-lable').text('');
		                //$('.newpassword-error').hide();
     			}
	 	  }
	 	 }
	 
}
</script>

<style scoped>
	.finish-wrap{
	 	 background-color:red;
         height: 100%;
         position: fixed;
         width: 100%;
         margin-top: -60px;
         
	 }
	.logo{
		margin-left: -540px;
	}
	.container{
		border:none;
		border-radius: 5px;
		width: 600px;
		height: 500px;
		margin-top: 100px;
		background-color: lightpink;
		
		
	}
	.form-control{
		text-align: center;
		border-radius: none;
		border: none;
		border-bottom-color: white;
		border-top-color: white;
		
	}
	.form{
		margin-top: 50px;
		padding: 20px;
	}
	hr{
		background-color: red;
		margin-top: 20px;
		width: 240px;
	}
	@media (min-width: 0px) and (max-width: 600px){
		.container{
			width: 70%;
			margin-left: 60px;
		}
		hr{
			width: 70%;
		}
		.logo{
			width: 15%;
			margin-left: -190px;
		}
	}
</style>