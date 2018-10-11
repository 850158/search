<template>
	<div class="web-wrap">
	<!-- <div class="page-header text-left">
	      <img src="../assets/images/logo.png" @click="toHome" class="logo pointer"
	       style="float: left;" />
	      
	      <b-form @submit="toSearchSubmit" class="input-search">
	       <b-form-input type="text"
	               id="keyword"
	               v-model="form.keyword"
	               placeholder="请输入搜索关键词"
	               class="keyword-in keyword-in-sm"
	               >
	        </b-form-input>
	       <b-button class="search-btn search-btn-sm" type="submit">搜索</b-button>
	      </b-form>
	      <b-nav class="nav">
              <li><a href="#" class="">信息图表</a></li>
              <li><a href="#" v-if="role==1" @click="toAdmin">后台管理</a></li>
          </b-nav>
	       <img src="../assets/images/person.png" class="logo per-ico pointer profile-icon" 
	       style="float:right;">
	       <div class="mes-icon">
              <img src="../assets/images/notifications.png" 
              class="logo lingdang-ico pointer" 
              v-b-popover.hover.bottom="msgTip">
              <span class="dot">{{msgNum}}</span>
           </div>  
    </div> -->
    <Headermodal></Headermodal>
	<div class="person-main">
		<b-row>
			<b-col md="2">
				<b-img
                   rounded="circle"
                   :src="person.profile"
                   title="点击更换头像"
                   class="m-2 profile-img"
                   @click="changProfile"
                   />
			</b-col>
			<b-col md="8" class="text-left name-zone" style="line-height: 100px;" >
				<span class="person-name" v-show="!nameInputShow">{{person.name}}</span>
				<img
					v-show="!nameInputShow"
					src="../assets/images/edit.png"
					class="edit-png pointer"
					@click="nameInputShow=true"
				/>
				<b-form inline v-show="nameInputShow" class="name-form">
				<b-form-input 	
					type="text"
                    class="name-input"
                    v-model="person.name"
                    @blur.native="nameBlur"
                    required
                    placeholder="请输入姓名"/>
                <b-btn 
                class="nameBtn"
                size="md" 
                type="button" 
                variant="danger"  
                @click="handName">
            	确认</b-btn>
            	</b-form>
            	<span class="nameErrMsg" ref="nameErrorMsg"></span>
			</b-col>
			<b-col md="2">
				<span class="goInfo pointer" @click="toPersonInfo">返回我的主页></span>
			</b-col>
		</b-row>
		<div class="person-list w-100">
			<b-row >
				<b-col md="2"></b-col>
				<b-col md="8" class="list-conent text-left first-list">
					<span class="person-list-key">关注地区</span>
					<span class="person-list-value" v-show="!areaInputShow">{{person.area}}</span>
					<img
						v-show="!areaInputShow"
						src="../assets/images/edit.png"
						class="pointer list-png"
						@click="areaInputShow=true"
					/>
					<b-form inline v-show="areaInputShow" class="form-margin">
						 <b-form-select 
						 		style="height:35px;"
						 		v-model="person.area"
						 		class="area-select"
                                :options="areas">
                    	</b-form-select>
		                 <b-btn 
			                class="nameBtn"
			                size="md" 
			                type="button" 
			                variant="danger"  
			                @click="handArea">
			            	确认
			            </b-btn>
					</b-form>
				</b-col>
			</b-row>
			<b-row >
				<b-col md="2"></b-col>
				<b-col md="8" class="list-conent text-left">
					<span class="person-list-key">关注类型</span>
					  <div class="type-conent">
						<span class="person-list-value" 
							v-for= "(type,index) of person.likeType">
							#{{type.tag_name}}
							<sup>
								<img src="../assets/images/cancel.png" height="15px" 
								width="15px" class="pointer" @click="delType(index)">
							</sup>
						</span>
						<img
							v-show="add"
							src="../assets/images/add_circle_outline.png"
							class="pointer add-png"
							@click="handAddType"
						/>
					</div>
					<b-form inline v-show="typeInputShow" 
					style="margin:20px 0px 0px 120px">
						 <b-form-select 
						 		style="height:35px;"
						 		v-model="selected"
						 		class="select-type"
                                :options="types">
                    	</b-form-select>
		                 <b-btn 
			                class="type-btn"
			                size="md" 
			                type="button" 
			                variant="danger"  
			                @click="handType">
			            	确认
			            </b-btn>
			            <b-btn
			               size="md"
			               type="button"
			               class="type-btn"
			               variant="info"
			               @click="typeInputShow=false">
			            	取消
			            </b-btn>
					</b-form>
				</b-col>
			</b-row>
			<b-row >
				<b-col md="2"></b-col>
				<b-col md="8" class="list-conent text-left">
					<span class="person-list-key">密码</span>
					<img
						src="../assets/images/edit.png"
						class="pointer list-img"
						@click="openModel"
					/>
				</b-col>
			</b-row>
			<b-row >
				<b-col md="2"></b-col>
				<b-col md="8" class="list-conent text-left">
					<span class="person-list-key">邮箱</span>
					<span 
						class="person-list-value"  
						v-show="!emailInputShow">
					{{person.email}}</span>
					<img
						src="../assets/images/edit.png"
						class="pointer list-png"
						v-show="!emailInputShow"
						@click="emailInputShow=true"
					/>
					<b-form inline v-show="emailInputShow" class="form-margin">
						<b-form-input 
							type="text"
		                    class="email-input"
		                    v-model="person.email"
		                    @blur.native="emailBlur"
		                    required
		                    placeholder="请输入邮箱"
						/>
						<b-btn 
			                class="email-btn"
			                size="md" 
			                type="button" 
			                variant="danger"  
			                @click="handEmail">
			            	确认
			            </b-btn>
					</b-form>
					<span class="emailErrMsg" ref="emailErrorMsg"></span>
				</b-col>
			</b-row>
			<b-row >
				<b-col md="2"></b-col>
				<b-col md="8" class="list-conent text-left">
					<span class="person-list-key">手机号码</span>
					<span 
						class="person-list-value"
						v-show="!telephoneInputShow"
						>{{person.telephone}}
					</span>
					<img
						src="../assets/images/edit.png"
						class="pointer list-png"
						v-show="!telephoneInputShow"
						@click="telephoneInputShow=true"
					/>
					<b-form inline v-show="telephoneInputShow" class="form-margin">
						<b-form-input 
							type="text"
		                    class="telephone-input"
		                    v-model="person.telephone"
		                    @blur.native="telephoneBlur"
		                    required
		                    placeholder="请输入手机号"
						/>
						<b-btn 
			                class="telephone-btn"
			                size="md" 
			                type="button" 
			                variant="danger"  
			                @click="handTelephone">
			            	确认
			            </b-btn>
					</b-form>
					<span class="telephoneErrMsg" ref="telephoneErrorMsg"></span>
				</b-col>
			</b-row>
		</div>
	</div>
 	<b-modal 
          id="updateProfileModal" 
          header-bg-variant="danger"
          header-text-variant="light"
          size="lg"
          no-close-on-esc
          no-close-on-backdrop
          body-class="text-center"
          v-model="show">
          <div slot="modal-header" class="w-100">
          	 <span class="float-left">更换头像</span>
          	 <span class="float-right pointer">
          	 	<img src="../assets/images/esc.png" class="esc-img" 
          	 	    @click="show=false">
          	 </span>
          </div>
          <div class="text-left">
          	<div>
          	 <b-btn size="md" type="button" @click="selectImg">
          	 	上传头像
          	 </b-btn>
          	 <p style="display: inline-block;padding-left: 10px;">
          	 支持JPG、PNG格式图片，不超过5M。</p>
          	</div>
          	 <div  class="cropper-img">
              <vue-cropper
               ref='cropper'
               :guides="true"
              :view-mode=2
              :drag-mode="crop"
              :height=200
              :auto-crop-area="0.5"
              :min-container-width=250
              :min-container-height=180
              :background=true
              :src="person.profile"
              alt="Source Image"
              :crop="cropImage"
              :cropmove="cropImage"
              >
              </vue-cropper>   
            </div>
             <h6 class="text-center proview">头像预览</h6>
             <img
                :src="cropImg"
                class="origin-img"
                alt="Cropped Image"
            />
          	<input type="file" id="btn-file" 
          			name="" accept="image/*" 
          			v-show="false"  @change="setImage">
          </div>
         <div slot="modal-footer" class="w-100 text-center">
        	<b-btn size="md" type="button" 
        			style="margin-right: 10px"
        			id="profileBtn"
                    variant="danger" @click="photoSubmit" v-show="save">保存
            </b-btn>
            <b-btn size="md" type="button" 
        			style="margin-right: 10px"
                    variant="danger" disabled v-show="!save">保存
            </b-btn>
            <b-btn size="md" type="button"
            		style="margin-left: 10px"
                    variant="info" @click="hidenUpdataImg">取消
            </b-btn>
        </div>
     </b-modal>
     <b-form @submit="updatePassword()">
      <b-modal 
                      id="updatePasswordModal" 
                      header-bg-variant="danger"
                      header-text-variant="light"
                      no-close-on-esc
                      no-close-on-backdrop
                      body-class="text-center"
                      v-model="showPasswordModal">
			          <div slot="modal-header" class="w-100">
			          	 <span class="float-left">修改密码</span>
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="showPasswordModal=false">
			          	 </span>
			          </div>
                      <b-container fluid>
                          <b-form-group id="oldPaword" class="text-center">
                              <b-form-input id="old-password-input"
                                            type="password"
                                            required
                                            @focus.native="allok=false"
                                            @blur.native="checkPassword"
                                            placeholder="请输入旧密码"
                                            v-model="password"
                                           >
                              </b-form-input>
                              <span class="errMsg" v-show="error" ref="errMsg"></span>
                          </b-form-group>
                          <b-form-group id="newPaword" class="text-center">
                              <b-form-input id="new-password-input"
                                            type="password"
                                            required
                                            @focus.native="allok=false"
                                            @blur.native="checkNewPawd"
                                            placeholder="请输入新密码"
                                            v-model="newPaword"
                                           >
                              </b-form-input>
                              <span class="errMsg" v-show="unlike" ref="unlike"></span>
                          </b-form-group>
                           <b-form-group id="confirmNewPaword" class="text-center">
                              <b-form-input id="confirm-new-password-input"
                                            type="password"
                                            required
                                             @blur.native="confirmPawd"
                                             @focus.native="allok=false"
                                            placeholder="确认密码"
                                            v-model="confirmNewPaword"
                                           >
                              </b-form-input>
                              <span class="errMsg" v-show="ok" ref="msg"></span>
                              <span class="errMsg" v-show="allok" ref="allmsg"></span>
                          </b-form-group>
                      </b-container>
                      <div slot="modal-footer" class="w-100 text-center">
                               <b-btn size="md" type="submit" 
                                variant="danger">提交
                               </b-btn>
                      </div>
                  </b-modal>
               </b-form>                
</div>
</template>
<style scoped>
	@import '../assets/css/search.css';
	.person-main{
		margin: 50px 110px 10px;
		padding-bottom: 30px;
		border: solid 1px #DADADA;
		border-top:solid 1px #fff; 
		box-shadow: 1px 1px 5px #DADADA;
	}
	.profile-img{
		  width: 100px;
		  height: 100px;
	}
	.person-name{
		display: inline-block;
		 font-size: 1.3em;
		 font-weight: bold;
		 margin-left: 65px;
		 padding-top: 18px;
	}
	.name-input{
		 width: 200px;
		 margin-left: 60px;
		 height: 34px;
	}
	.person-list-key{
		 display:inline-block; 
		 font-size: 1.3em;
		 font-weight: bold;
		 margin-right: 20px;
		 width: 100px;
		}
	.person-list-value{
		  font-size: 1.3em;
		 font-weight: bold;
		 color: #e64035;
		 margin-right: 20px;
	 }
	 .person-list-type{
	 	 font-size: 1.3em;
		 font-weight: bold;
		 color: #e64035;
	 }
	.pointer{
		cursor: pointer;
	}
	.edit-png{
		margin-left: 20px;
	}
	.name-form{
		margin-top: 50px;
	}
	.nameBtn,.email-btn,.telephone-btn,.type-btn{
		margin-left: 20px;
	}
	.proview{
		display: block;
	}
	.nameErrMsg{
	   color: red;
	   margin-left: 60px;
	   display: block;
	   line-height: 20px;
	   height: 20px;
	}
	.emailErrMsg,.telephoneErrMsg{
		 color: red;
		 margin-left: 120px;
	}
	.goInfo{
		 display: inline-block;
		 padding-top: 50px;
		 font-size: 1.4em;
	}
	.person-list{
		margin-top: 30px;
	}
	.list-conent{
		padding: 20px 50px 20px 78px; 
		border-bottom: 1px solid #DADADA;
	}
	.list-png{
		width: 18px;
		height: 18px;
	}
	.form-margin{
    	margin: -30px 0px 0px 120px;
	}
	.type-conent{
		display: block;
		margin-left: 120px;
		margin-top: -27px;
	}
	.add-png{
		width: 18px;
		height: 18px;
	}
	.cropper-img{
		width: 300px;
		height: 300px; 
		display: inline-block;
		float: left;
		margin-top: 20px;
		margin-bottom: 0px;
		overflow: hidden;
	}
	.origin-img{
		width: 100px; 
		height: 100px; 
		border: 1px solid gray;
		border-radius: 50%;
		margin-left: 200px;
		margin-top: 38px;
	}
	.errMsg{
    float: left;
    color: red;
  }
  .esc-img{
  	width: 10px;
  	height: 10px;
  }
	@media (min-width: 0) and (max-width: 500px) {
		.person-main{
			margin: 20px 30px 5px;
		}
		.name-zone{
			text-align: center;
            margin-top: -40px;
		}
		.goInfo{
		 display: inline-block;
		 padding-top: 0px;
		 font-size: 1.0em;
		 float: right;
		 margin-top:-80px;
		 margin-right: 40px;
		}
		.name-input{
		    width: 100px;
		}
		.nameBtn{
		    margin-left: 10px;
		    height: 30px;
		    width: 50px;
		    font-size: 12px;
		}
		.list-conent{
		    padding: 0px 0px 5px 30px;
		    margin: 0px 12px;
		}
		.first-list{
			margin-top: -20px;
		}
		.area-select{
			width: 85px;
		}
		.person-list-key{
			margin-right: 0px;
		}
		.telephone-input,.email-input{
			margin-top: 5px;
			margin-left: -20px;
			width: 90px;
		}
		.type-btn,.telephone-btn,.email-btn{
			width: 50px;
			height: 30px;
			font-size: 12px;
			margin-left: 10px;
		}
		.type-btn{
			margin-top: 5px;
		}
		.select-type{
			margin-right: 10px;
		}
		.proview{
			float: right;
			margin-right: 140px;
		}
		.origin-img{
			margin-left: 110px;
			margin-top: 5px;
		}
	}
@media (min-width: 500px) and (max-width: 1200px) {
	.goInfo{
		 font-size: 1.0em;
		 width: 100px;
		 margin-left: -70px;
	}
	.person-list-key{
		margin-left: -100px;
	}
	.area-select{
		width: 100px;
		margin-left: -100px;
	}
	.telephone-input,.email-input{
		width: 158px;
		margin-left: -100px;
	}
	.type-btn{
			margin-left: 10px;
			margin-top: 5px;
	}
	.name-input{
		width: 160px;
	}
	.proview{
		float: right;
		margin-top: 5px;
		margin-right: 300px;
	}
	.origin-img{
		margin-left: 85px;
		margin-top: 5px;
	}
}
</style>
<script>
	import Headermodal from './header'
	import VueCropper from 'vue-cropperjs'
	export default{
		data:function(){
			return{
				form: {
		          keyword: ''
		        },
		        role:null,
				msgNum:"14",
		        msgTip:{
		           title: '我的最近消息',
		           content: 'Popover Content'
		         },
		         person:{
		            profile:null,
		            name:null,
		            likeType:[],
		            area:null,
		            email:null,
          			telephone:null,
         		},
         		nameInputShow:false,
         		areaInputShow:false,
         		emailInputShow:false,
         		telephoneInputShow:false,
         		show:false,
         		showPasswordModal:false,
         		typeInputShow:false,
         		error:false,
		        unlike:false,
		        ok:false,
		        allok:false,
		        add:true,
		        save:false,
         		cropImg:'',
      			crop:'',
      			imgSrc:'',
      			password:"",
        		newPaword:'',
        		confirmNewPaword:'',
        		areas:[{value:null,text:'请选择关注的地区',disabled: true},{value:'北京',text:'北京'},{value:'天津',text:'天津'},{value:'上海',text:'上海'},{value:'重庆',text:'重庆'},{value:'河北',text:'河北'},{value:'山西',text:'山西'},{value:'辽宁',text:'辽宁'},{value:'吉林',text:'吉林'},{value:'黑龙江',text:'黑龙江'},{value:'江苏',text:'江苏'},{value:'浙江',text:'浙江'},{value:'安徽',text:'安徽'},{value:'福建',text:'福建'},{value:'江西',text:'江西'},{value:'山东',text:'山东'},{value:'河南',text:'河南'},{value:'湖北',text:'湖北'},{value:'湖南',text:'湖南'},{value:'广东',text:'广东'},{value:'海南',text:'海南'},{value:'四川',text:'四川'},{value:'贵州',text:'贵州'},{value:'云南',text:'云南'},{value:'陕西',text:'陕西'},{value:'甘肃',text:'甘肃'},{value:'青海',text:'青海'},{value:'台湾',text:'台湾'},{value:'内蒙古',text:'内蒙古'},{value:'广西',text:'广西'},{value:'西藏',text:'西藏'},{value:'宁夏',text:'宁夏'},{value:'新疆',text:'新疆'},{value:'香港',text:'香港'},{value:'澳门',text:'澳门'}],
        		selected:null,
        		types:[{
        			text:"选择类型",
        			value:null,
        			disabled: true
        		}]
			}
		},
		 components:{
	      Headermodal
	    },
		 created:function(){
		 	var self = this;
            self.usermsg = window.localStorage.getItem('usermsg');
            var usermsg = self.usermsg;
            var usermsg = eval("(" + usermsg + ")");
            self.usermsg = usermsg;
            self.token = self.usermsg.token;
            self.role = self.usermsg.role;
            var token = self.token;
            /*获取用户信息*/
           var self = this;
		    	var token =this.token;
		    	 self.$ajax({
	        	headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : token
	          	},
		        method:"POST",
		        url:"https://recruitment.cqcyit.com:8090/users_management/update/getuser",
		        dataType: 'json'
		        }).then(function(data){
	          	if(data.data.state == "false") {
	            console.log("获取类型失败！");
	            console.log("失败原因："+data.data.reason);
		          } else {
		          var person = data.data.data;
		          //设置页面变量
		          self.name = person.name;
		          self.area = person.area;
		          self.email = person.email;
		          self.telephone = person.telephone;
		          self.email = person.email;
		          self.profile = "https://recruitment.cqcyit.com:8090/users_management/getProfilePhoto/"+person.id
		          //赋值
		          self.person.id = person.id;
		          self.person.name = person.name;
		          self.person.area = person.area;
		          self.person.email = person.email;
		          self.person.telephone = person.telephone;
		          self.person.likeType = data.data.type;
		          self.person.profile = "https://recruitment.cqcyit.com:8090/users_management/getProfilePhoto/"+person.id;
		         self.cropImg = self.person.profile;
		         self.imgSrc = self.person.profile;
		            }
		      }.bind(this))
		        .catch(function(err){
		        console.log("err:"+err)
		      }.bind(this));
         /*获取全部标签*/
       self.$ajax({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"GET",
        url:"https://recruitment.cqcyit.com:8090/userservice/tags/list",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("获取类型失败！");
            console.log("失败原因："+data.data.reason);
          } else {
              var typeList = data.data.data;
              for(var i=0;i<typeList.length;i++){
              	 var typeObj ={};
              	 typeObj.text = typeList[i].tagName;
              	 typeObj.value = typeList[i].id;
              	 self.types.push(typeObj);
              }
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
		 },
		methods:{
			  toSearchSubmit: function(evt) {
		        evt.preventDefault();
		        this.toSearch(this.form.keyword);
		      },

		      toSearch: function() {
		        this.$router.push({name:'home1',params:{token:this.token,keyword: this.form.keyword}});
		      },

		      toHome: function() {
		        this.$router.push({name:'home1',params:{token:this.token}});
		      },

		      toAdmin: function() {
		        this.$router.push({name:'admin',params:{token:this.token}});
		      },
		      toPersonInfo:function(){
		      	this.$router.push({name:'personalInfo',params:{token:this.token}});
		      },
		      changProfile:function(){
		      	this.show=true;
		      	this.cropImg = this.person.profile;
         		/*this.imgSrc = this.person.profile;*/
		      },
		      selectImg:function(){
		      	$("#btn-file").click();
		      },
		      setImage(e){
      				const file = e.target.files[0];
      				/*判读是否选择图片*/
      				if(typeof(file)!=undefined){
      					this.save=true;
      				}
                    if (!file.type.includes('image/')) {
                       alert('Please select an image file');
                     return;
             		}
        			if (typeof FileReader === 'function') {
		            const reader = new FileReader();
		            reader.onload = (event) => {
		                this.imgSrc = event.target.result;
		                // rebuild cropperjs with the updated source
		                this.$refs.cropper.replace(event.target.result);
		            };
		            reader.readAsDataURL(file);
		        } else {
		            alert('Sorry, FileReader API not supported');
		        }
    		},
    		hidenUpdataImg:function(){
    			this.show=false;
    			this.person.profile =this.profile;
    			
    		},
    		 cropImage () {
	          // get image data for post processing, e.g. upload or setting image src
	         /* this.cropImg = this.person.profile;*/
	          this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    		},
		    photoSubmit(){
		      //ajax传给后台
		      var data = this.cropImg;
		      data = data.split(',')[1];
		      data = window.atob(data);
		      var ia = new Uint8Array(data.length);
		      for (var i=0;i<data.length;i++) {
		        ia[i] = data.charCodeAt(i);
		      }
		      var fdss = new FormData();
		      //canvas.toDataURL 返回的默认格式就是image/png
		      var blob = new Blob([ia],{type:"image/png"});
		      fdss.append('profile',blob,'image.png');
		      var token =this.token;
		       /*ajax传给后台*/
		        this.$ajax({
		        headers: {
		           /* 'Content-Type': 'application/json',*/
		            'Authorization' : token
		          },
		        method:"POST",
		        url:"https://recruitment.cqcyit.com:8090/users_management/uploadProfile",
		        data:fdss,
		        dataType: 'json'
		        }).then(function(data){
		          if(data.data.state == "error") {
		            console.log("获取类型失败！");
		            console.log("失败原因："+data.data.reason);
		          } else {
		          	 this.show = false;
		          	 this.person.profile = this.cropImg;
		          	 /*this.getUserInfo();*/
		           }
		      }.bind(this))
		        .catch(function(err){
		        console.log("err:"+err)
		      }.bind(this));
		    },
		    /*处理提交姓名*/
       		handName:function(){
       			var nameErrorMsg = this.$refs.nameErrorMsg.innerHTML;
       			if(nameErrorMsg==""){
       				this.nameInputShow=false;
       				var name = this.person.name;
       				var email = this.email;
       				var area = this.area;
       				var telephone = this.telephone;
       				var type = this.person.likeType
       				this.postPersonInfo(name,email,telephone,area,type);
       			}
       		},
		    /*姓名的验证*/
		     nameBlur:function(){
       				 var person = this.person;
			         //姓名的正则表达式
			         var nameReg = /^[\u4e00-\u9fa5_a-zA-Z_]{2,20}$/;
			          if(!nameReg.test(person.name)){
			          	this.$refs.nameErrorMsg.innerHTML="中文、字母长度为2-20位";
			          	$(".nameBtn").attr("disabled",true);
			          }else{
			          	this.$refs.nameErrorMsg.innerHTML="";
			          	$(".nameBtn").attr("disabled",false);
			          }
       		},
       		/*处理地区*/
       		handArea:function(){
       			this.areaInputShow=false;
       			var name = this.name;
   				var email = this.email;
   				var area = this.person.area;
   				var telephone = this.telephone;
   				var type = this.person.likeType;
   				this.postPersonInfo(name,email,telephone,area,type);
       		},
       		/*处理提交邮箱*/
       		handEmail:function(){
       			var emailErrorMsg = this.$refs.emailErrorMsg.innerHTML;
       			if(emailErrorMsg==""){
       				this.emailInputShow=false;
       				var name = this.name;
       				var email = this.person.email;
       				var area = this.area;
       				var telephone = this.telephone;
       				var type = this.person.likeType;
       				this.postPersonInfo(name,email,telephone,area,type);
       			}
       		},
       		emailBlur:function(){
       			var person = this.person;
         		//判断邮箱是否有效
            	//邮箱的正则表达式
          		var emailReg =
           		/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

       			if(!emailReg.test(person.email)){
   					this.$refs.emailErrorMsg.innerHTML="请输入正确邮箱格式";
		          	$(".email-btn").attr("disabled",true);
		          }else{
		          	if(person.email!=this.email){
	                //发送AJAX请求
	                var token = this.token;
	                 this.$ajax({
	                      headers: {
                              'Content-Type': 'application/json',
                              'Authorization' : token
                            },
                      method:"POST",
                      url:"https://recruitment.cqcyit.com:8090/users_management/addDel/searchUserByEmail",
                      data:{
                        email:person.email
                      },
                      dataType: 'json'
                    }).then(function(data){
                        if(data.data. would == "false") {
                           this.$refs.emailErrorMsg.innerHTML="该邮箱已经存在！";
                           $(".email-btn").attr("disabled",true);
                        } else {
                      this.$refs.emailErrorMsg.innerHTML="";
                              }
                    }.bind(this))
                     .catch(function(err){
                      console.log(err)
                      }.bind(this));
               
              }else{
                	this.$refs.emailErrorMsg.innerHTML="";
		          	$(".email-btn").attr("disabled",false);
              }
		          }
       		},
       		/*处理提交手机*/
       		handTelephone:function(){
       			var telephoneErrorMsg = this.$refs.telephoneErrorMsg.innerHTML;
       			if(telephoneErrorMsg==""){
       				this.telephoneInputShow=false;
       				var name = this.name;
       				var email = this.email;
       				var area = this.area;
       				var telephone = this.person.telephone;
       				var type = this.person.likeType;
       				this.postPersonInfo(name,email,telephone,area,type);
       			}
       		},
       		telephoneBlur:function(){
       			 var person = this.person;
         		//判断手机是否有效
            	//手机的正则表达式
	          var phoneReg =
	           /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	           if(!phoneReg.test(person.telephone)){
   					this.$refs.telephoneErrorMsg.innerHTML="请输入正确手机号码";
		          	$(".telephone-btn").attr("disabled",true);
		          }else{
		          	 if(person.telephone!=this.telephone){
	                //发送AJAX请求
	                var token = this.token;
	                 this.$ajax({
	                      headers: {
                              'Content-Type': 'application/json',
                              'Authorization' : token
                            },
                      method:"POST",
                      url:"https://recruitment.cqcyit.com:8090/users_management/addDel/searchUserByTelephone",
                      data:{
                        telephone:person.telephone
                      },
                      dataType: 'json'
                    }).then(function(data){
                        if(data.data. would == "false") {
                            this.$refs.telephoneErrorMsg.innerHTML="该手机号码已经存在！";
                           $(".telephone-btn").attr("disabled",true);
                        } else {
                       this.$refs.telephoneErrorMsg.innerHTML="";
                              }
                    }.bind(this))
                     .catch(function(err){
                      console.log(err)
                      }.bind(this));
               
              }else{
                    this.$refs.telephoneErrorMsg.innerHTML="";
		          	$(".telephone-btn").attr("disabled",false);
              }
		          }

       		},
       		/*删除类型*/
       		delType:function(index){
       			var length = this.person.likeType.length;
       			var types = this.person.likeType;
       			if(length>1){
       				types.splice(index,1);
       				//可以添加
       				var name = this.name;
       				var email = this.email;
       				var area = this.area;
       				var telephone = this.telephone;
       				var type = this.person.likeType;
       				this.postPersonInfo(name,email,telephone,area,type);
       				this.add=true;
       			}else{
       				alert("求求你,别删了,没有了");
       			}
       			
       		},
       		handAddType:function(){
       			this.typeInputShow=true;
       			this.selected = null;
       			//移除已经选择的类型
       			var likeType = this.person.likeType;
       			var types = this.types;
       			for(var i=0;i<likeType.length;i++){
       				for(var j=0;j<types.length;j++){
       					if(types[j].value==likeType[i].id){
       						types.splice(j,1);
       					}
       				}
       			}
       			this.types = types;
       		},
       		handType:function(){
       			var likeTypes = this.person.likeType;
       			var addType = this.selected;
       			if(addType==null){
       				alert("请选择一个类型");
       			}else{
       				var typeObj={};
       				typeObj.id = addType;
       				/*读取type中id对应的值*/
       				for(var i=0;i<this.types.length;i++){
       					if(this.types[i].value==addType){
       						typeObj.tag_name = this.types[i].text;
       					}
       				}
       				likeTypes.push(typeObj);
       				this.typeInputShow=false;
       				var name = this.name;
       				var email = this.email;
       				var area = this.area;
       				var telephone = this.telephone;
       				var type = likeTypes;
       				this.postPersonInfo(name,email,telephone,area,type);
       			}

       		},
       		/*提交用户信息给后台*/
       		postPersonInfo:function(name,email,telephone,area,type){
       			/*var this = _this;*/
       			var token = this.token;
		          //发送AJAX 请求
		          this.$ajax({
		            method:"POST",
		            url:"https://recruitment.cqcyit.com:8090/users_management/update/updateuser",
		            dataType: 'json',
		            headers: {
		                'Content-Type': 'application/json',
		                'Authorization' : token,
		                 "charset":"UTF-8"
		              },
		            data:{
		              name: name,
		              email: email,
		              telephone: telephone,
		              area: area,
		              type: type
		            },
		            contentType: 'application/json'
		          }).then(function(data){
		              if(data.data.state == 'fasle') {
		              alert("失败原因："+data.data.reason);
		              } 
		          }.bind(this))
		           .catch(function(err){
		            alert("修改失败，请重新修改！");
		            console.log(err)
		            }.bind(this));
       		},
		      /*打开模态框，并清空内容*/
	      openModel:function(){
	        this.showPasswordModal = true;
	        this.error = false;
	        this.unlike = false;
	        this.ok = false;
	        this.allok = false;
	        this.newPaword="";
	        this.password="";
	        this.confirmNewPaword="";
	      },
	      /*检查旧密码的格式*/
      checkPassword:function(){
        var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/;
        var Sha1 = require('../../node_modules/sha.js').sha1
        // 添加的混淆信息
        var extra="cn%voa$foj/pal&slfj!imz3pa?vnohao";
        if(!passwordReg.test(this.password)){
          this.error = true;
          this.$refs.errMsg.innerHTML = "密码格式不正确！请输入6-14位至少包含大小字母、数字的密码！";
        }else{
          //旧密码Hash加密
          var oldPawd = new Sha1().update(this.password+extra).digest('hex');
          var token = this.token;
             //发送AJAX请求
            this.$ajax({
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                  },
            method:"POST",
            url:"https://recruitment.cqcyit.com:8090/users_management/update/sureoldpassword",
            data:{
              id:this.usermsg.uid,
              password:oldPawd
            },
            dataType: 'json'
          }).then(function(data){
              if(data.data.state == "false") {
                this.error=true;
                this.$refs.errMsg.innerHTML = "密码错误，请重新修改！"
              } else {
              this.error=false;
                    }
          }.bind(this))
           .catch(function(err){
            alert("修改失败，请重新修改！");
            console.log(err)
            }.bind(this));
        }
      },
      /*检查新密码*/
      checkNewPawd:function(){
          var passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/;
          if(!passwordReg.test(this.newPaword)){
            this.unlike = true;
            this.$refs.unlike.innerHTML = "密码格式不正确！请输入6-14位至少包含大小字母、数字的密码！";
          }else{
            if(this.newPaword==this.password){
              this.unlike = true;
              this.$refs.unlike.innerHTML = "请不要与原密码一致！"
            }else{
              this.unlike =false;
            }
        }
        //调用确认密码的方法
        // this.confirmPawd();
        if(this.confirmNewPaword!=""&&this.newPaword!=this.confirmNewPaword){
            this.ok=true;
            this.$refs.msg.innerHTML="两次密码不一致";
          }else{
            this.ok = false;
          }
      },
      /*确认密码*/
      confirmPawd:function(){
        if(this.newPaword!=this.confirmNewPaword){
          this.ok=true;
          this.$refs.msg.innerHTML="两次密码不一致";
        }else{
          this.ok = false;
        }
      },
      /*修改密码：*/
      updatePassword:function(e){
          var theEvent = e || window.event;  
          theEvent.preventDefault();
          var _this = this
          var Sha1 = require('../../node_modules/sha.js').sha1
          // 添加的混淆信息
          var extra="cn%voa$foj/pal&slfj!imz3pa?vnohao";
          //新密码Hash加密
          var newPawd = new Sha1().update(this.newPaword+extra).digest('hex');
          //旧密码Hash加密
          var oldPawd = new Sha1().update(this.password+extra).digest('hex');
          var token = _this.token;
          if(!this.ok&&!this.error&&!this.unlike){
            this.ok=false
            //发送AJAX请求 
            this.$ajax({
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                  },
            method:"POST",
            url:"https://recruitment.cqcyit.com:8090/users_management/update/updatepassword",
            data:{
              id:this.usermsg.uid,
              oldpassword:oldPawd,
              password:newPawd
            },
            dataType: 'json'
          }).then(function(data){
              if(data.data.state == "false") {
                alert("服务器出现了小问题,请稍后再试！");
                this.newPaword="";
                this.confirmNewPaword="";
                this.password="";
                console.log("失败原因："+data.data.reason);
              } else {
              alert("密码修改成功!");
              this.showPasswordModal=false;
                    }
          }.bind(this))
           .catch(function(err){
            alert("修改失败，请重新修改！");
            console.log(err)
            }.bind(this));
         }else{
          this.ok=false;
          this.allok=true;
          this.$refs.allmsg.innerHTML="请所有信息正确填写后再提交！";
         }
       }
		},
		 mounted:function(){
		    this.$nextTick(function () {
		      $(".pointer").mouseover(function(event) {
		        $(this).css("cursor","pointer");
		      });
    })}
	}
</script>