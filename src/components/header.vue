<template>
		<div class="page-header text-left">
			<img src="../assets/images/logo.png" class="logo" @mouseover="toPointer($event)" @click="toSearch"/>
        	<b-input type="text"
               id="keyword"
               required
               v-model="form.keyword"
               
               placeholder="请输入搜索关键词"
               class="keyword-in keyword-in-sm"
               >
        	</b-input>
        	<b-button class="search-btn search-btn-sm" type="button"  @mouseover="toPointer($event)" @click="sentKeyword()"  >搜索</b-button> 
            <b-nav>
             	<!-- <li>
             		<a class="" @click="toMesExcell" @mouseover="toPointer($event)">信息图表</a>
             	</li> -->
             	<li>
             		<a   @mouseover="toPointer($event)" @click="toHome">首页</a>
             	</li>
             	<li>
             		<a  v-if="role==1" @click="toAdmin" @mouseover="toPointer($event)">后台管理</a>
             	</li>
            </b-nav>


            <ul id="nav">
				<li>
        	 		<div class="logo per-ico pointer"><img src="../assets/images/person.png" ></div>
	               <ul  class="header-select per-header-select" >


	                <li v-for="" style="float: left;background-color: white;margin-left: 20px;text-align: center;"><a class="pername text-center" @mouseover="toPointer($event)" @click="toPersonal" style="margin-left: 20%">{{name}}</a></li>

	                <!-- <li style="margin-left: px"><b-btn variant="danger" class="text-center" @click="toLogin" @mouseover="toPointer($event)"style="font-size: 14px;margin-left: 20%;">退出登录</b-btn></li> -->
	                 <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;" @mouseover="toPointer($event)" @click="toPersonal" class="Notify-ico"><img src="../assets/images/personal.png" class="logo" style="width: 24px;height: 24px;">个人主页</li>

	                <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;" @mouseover="toPointer($event)" @click="toPersonalUpdate" class="Notify-ico"><img src="../assets/images/update.png" class="logo" style="width: 24px;height: 24px;">修改资料</li>

	                <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;margin-bottom: 5%;" @mouseover="toPointer($event)" @click="toLogin" class="Notify-ico"><img src="../assets/images/signout.png" class="logo" style="width: 24px;height: 24px;">退出登录</li>
        	 	

	               </ul>   
	            </li>  

             	<li>
        	 		<div style=""><img src="../assets/images/notifications.png" style="margin-top: 20px" class="logo lingdang-ico pointer">
        	 			<span class="dot">{{msgNum}}</span>
        	 		</div>
	                <ul  class="header-select" v-if="msgNum!=0">
	                 <li  v-for="Notify in Notifys"><a class="Notify-ico text-center" @mouseover="toPointer($event)">{{Notify}}</a></li>
	                 <li><b-btn class="pointer msgMore text-center"variant="danger"  @mouseover="toPointer($event)" @click="toPersonalMes" style="font-size: 14px;">查看更多</b-btn></li>
	                </ul>
        	 	</li>

            </ul> 	
		</div>
</template>
<style scoped>
	@import '../assets/css/search.css';
	.msgMore{
		margin-left: 30%;
	}
	#nav {
    display: inline;
    float: none;
	}

	#nav li { float: right; display: block; background: none; position: relative; z-index: 999; margin: 0 10px; }

	#nav li a { display: block; padding: 0; font-weight: 700; line-height: 50px; text-decoration: none; color: #818ba3; zoom: 1; padding: 0px 12px; }
	.Notify-ico:hover{ background-color: #DADADA;color: #576482; text-decoration:underline;}
	#nav ul { position: absolute; left: -70px; display: none; margin:0; ; padding: 0; list-style: none;  padding-bottom: 3px;border: 1px solid #DADADA }
	#nav .header-select li {
	    text-align: left;
	    clear: both;
	    float: none;
	    font-size: 14px;
	}
	.header-select{
	  width: 200px;
	  margin-right: 10px;
	  margin-top: 15px;
	  background-color: white;
	}
	.per-header-select{
	 /* margin-top: 60px*/
	 top:45px;
	}
	.msg-ico {
	    width: 22px;
	    height: 22px;
	}

#loading
{
	position:fixed;
	top:40%;
	left:45%;
	z-index:999;
}
</style>
<script >
	name:'Headermodal'
	export default{
		
		data:function(){
			return{
				form:{
					keyword:''
				},
				msgNum:'',
				 //我的消息
				 Notifys:['','','','','','',],
				 	//用户名
				name:'',
				usermsg:[],
				token:'',

				time:'',
				industry:'',
				place:'',
				type:'',
				qualification:'',
				certification:'',
				operator:'',
				tag:[],
				startDate:'',
		        endDate:'',

		       
			}
		},
		props:['role'],
		created:function(){
			var self = this;
	        console.log("子页面权限");
	        console.log(self.role);

	        self.usermsg = window.localStorage.getItem('usermsg');
	        if(self.usermsg==null){
	        	self.toLogin();
	        }
	        var usermsg = self.usermsg;
	        var usermsg = eval("(" + usermsg + ")");
	        self.usermsg = usermsg;
	        self.token = self.usermsg.token;
	        var token = self.token;
	        console.log(token);

	         //动态加载我的消息
	       this.$ajax({
	        method: 'post',
	        url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/seacrhNewNotify',
	        dataType: 'json',
	        headers: {
	          'Content-Type': 'application/json',
	          'Authorization' : token
	        },
	        data:{
	        	page:1,
	        	num:5
	        }
	      }).then(function(data){
	      	console.log("我的消息");
	        console.log(data.data.data.content);
	        var content=data.data.data.content;
	        // var i = 0;
	        var contentArr=[];
	        for (var i = 0; i < data.data.data.content.length; i++) {
	        	contentArr.push(content[i].title)
	        	// console.log(contentArr);
	        }
	        self.Notifys=contentArr;
	      }.bind(this))
	      .catch(function(err){
	        // alert("失败");
	        console.log(err)
	      }.bind(this));
	      //动态加载消息总量
	        this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/getNotifyNum',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : token
            }
          }).then(function(data){
            console.log("数量");
            console.log(data.data.notifyNum);
            var msgNum = data.data.notifyNum;
            this.msgNum = msgNum;
          }.bind(this))
          .catch(function(err){
            // alert("失败");
            console.log(err)
          }.bind(this));
           //动态获取用户名称
           this.$ajax({
	          method: 'post',
	          url: 'https://recruitment.cqcyit.com:8090/users_management/update/getuser',
	          dataType: 'json',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : this.token
	          }
	        }).then(function(data){
	        	console.log("获取用户信息");
	        	console.log(data.data.data.name);
	        	var name = data.data.data.name;
	        	this.name = name;
	        }.bind(this))
	        .catch(function(err){
	          // alert("失败");
	          console.log(err)
	        }.bind(this))
		},
		mounted:function(){
			var self = this;


		

			 $(document).ready(function() { 
	         $('#nav li').hover(function() {
	          $('ul', this).slideDown(200);
	          $(this).children('a:first').addClass("hov");
	         }, function() {
	          $('ul', this).slideUp(100);
	          $(this).children('a:first').removeClass("hov");  
	         });
	        });

			 // 触发更新查找信息
			setInterval(function(){
				var token = self.token;
				console.log("定时获取消息");
				self.$ajax({
			        method: 'post',
			        url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/addNotifyByUser',
			        dataType: 'json',
			        headers: {
			            'Content-Type': 'application/json',
			            'Authorization' : token
			        },
			        }).then(function(data){
			        	console.log(data.data.state);
			        	if (data.data.state=="success") {
			        		self.$ajax({
					        method: 'post',
					        url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/seacrhNewNotify',
					        dataType: 'json',
					        headers: {
					          'Content-Type': 'application/json',
					          'Authorization' : token
					        },
					        data:{
					        	page:1,
					        	num:5
					        }
					      }).then(function(data){
					      	console.log("我的消息");
					      	console.log(data);
					        console.log(data.data.data.content);
					        var content=data.data.data.content;
					        var totalElement = data.data.data.totalElements;
					        // var i = 0;
					        var contentArr=[];
					        for (var i = 0; i < data.data.data.content.length; i++) {
					        	contentArr.push(content[i].title)
					        	// console.log(contentArr);
					        }
					        self.Notifys=contentArr;
					        self.msgNum = totalElement;
					      }.bind(this))
					      .catch(function(err){
					        // alert("失败");
					        console.log(err)
					      }.bind(this));
			        	}
			        }.bind(this))
			        .catch(function(err){
			          // alert("失败");
			          console.log(err)
			        }.bind(this))
			    },1800000);

			
		},
		methods:{
			 toSearch:function(){
	      	console.log("==================路由跳转，home界面=========================");
	      	this.$router.push({name:'homeThree',params:{token:this.token}});
	      },
			toLogin:function(){
	      	console.log("==================路由跳转，登录界面=========================");

	      	var storage=window.localStorage;
			storage.clear();
	      	this.$router.push({name:'Login'});
	      	console.log(this.usermsg);
	      },
	      toHome:function(){
			console.log("==================路由跳转，Home息界面=========================");
	      	this.$router.push({name:'homeThree'});
	      	// this.$router.push({name:'mesExcell',params:{usermsg:this.usermsg}});
	      },
	      toMesExcell:function(){
			console.log("==================路由跳转，个人信息界面=========================");
	      	// this.$router.push({path:'/personal',params:{usermsg:this.usermsg}});
	      	// this.$router.push({name:'mesExcell',params:{usermsg:this.usermsg}});
	      },
	      toPersonal:function(){
	      	console.log("==================路由跳转，个人信息界面=========================");
	      	this.$router.push({path:'/personalInfo',params:{usermsg:this.usermsg}});

	      },

	      toPersonalMes:function(){
	      	console.log("==================路由跳转，个人消息界面=========================");
	       var personalMes = 'personalMes';


	       let routeData = this.$router.resolve({
			   path: "/personalInfo",
			   // query: params,
			   query:{personalMes:personalMes}
			});
			window.open(routeData.href, '_blank');
	      	// this.$router.push({name:'personalInfo',params:{personalMes:personalMes}});
	      },

	      toAdmin:function(){
	      	console.log("==================路由跳转，管理员界面=========================");
	      	this.$router.push({name:'admin',params:{token:this.token}});
	      },

	       toPersonalUpdate:function(){
	      	console.log("==================路由跳转，修改个人信息界面=========================");
	      	this.$router.push({name:'personalUpdate',params:{token:this.token}});
	      },

	       toPointer : function ($event) {
	         $event.target.classList.add("over-pointer");
	      },
	      // setKeyword:function(){
	      // 	this.$emit('transferKeyword',this.form.keyword)
	      // },
	      //搜索
	      // search:function(from){
	      // 	this.autoSearch = false;
	      //   this.$ajax({
	      //     method: 'post',
	      //     url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/search',
	      //     dataType: 'json',
	      //     headers: {
	      //       'Content-Type': 'application/json',
	      //       'Authorization' : this.token
	      //     },
	      //     data: {   
	      //       key: this.form.keyword,
	      //       lower_issue_time: this.startDateStr,
	      //       upper_issue_time: this.endDateStr,
	      //       area: this.place,
	      //       type: this.type,
	      //       qualification:this.qualification,
	      //       construction_industry: this.industry,
	      //       certification:this.certification,
	      //       operators: this.operator,
	      //       tag:this.tag,
	      //       from: from,
	      //       size: 20
	      //     }
	      //   }).then(function(response){
	      //   	console.log(response);
	      //     var results = response.data.data.hits;
	      //     console.log("搜索结果：");
	      //     console.log(results);
	      //     // console.log(results[0]._source.id);
	      //     this.total = response.data.data.total; 
	      //     this.currentTotal = this.total/2;

	      //     var i=0;
	      //     var productNamesArr = []; 
	      //     var tags = [];
	      //     var productNamesStr = '';
	      //     var tagsStr = '';
	      //     var highlightTitle = true;
	      //     var highlightContent = true;
	      //     for (i;i<results.length;i++) {
	      //       productNamesStr = results[i]._source.tender_product_name;
	      //       tagsStr = results[i]._source.tender_tags;
	      //       if(productNamesStr!=''&&productNamesStr!=null) {
	      //         productNamesArr = productNamesStr.split(",");
	      //       } else {
	      //         productNamesArr=[]
	      //       }

	      //       if(tagsStr!=''&&tagsStr!=null) {
	      //         tags = results[i]._source.tender_tags.split(",");
	      //         tags.pop();
	      //       } else {
	      //         tags=[]
	      //       }
	            
	            
	      //       results[i].productNamesArr=productNamesArr;
	      //       results[i].tagsArr=tags;

	      //       if(!( "highlight" in results[i])) {
	      //         highlightTitle = false;
	      //         highlightContent = false;

	      //         var highlight = {};
	      //         highlight.tender_title ='';
	      //         highlight.tender_content ='';
	      //         results[i].highlight = highlight;
	      //       } else { 
	      //         if(!("tender_title" in results[i].highlight)) {
	      //           highlightTitle = false;

	      //           results[i].highlight.tender_title = "";
	      //         } else {
	      //           highlightTitle = true;

	      //           var tenderTitle = results[i].highlight.tender_title;
	      //           tenderTitle = tenderTitle.join(" "); 
	      //           results[i].highlight.tender_title = tenderTitle;
	      //         }
	      //         if(!("tender_content" in results[i].highlight)){
	      //           highlightContent = false;

	      //           results[i].highlight.tender_content = "";
	      //         } else {
	      //           highlightContent = true;

	      //           var tenderContent = results[i].highlight.tender_content; 
	      //           tenderContent = tenderContent.join(" ");             
	      //           results[i].highlight.tender_content = tenderContent;              
	      //         }
	      //       }
	      //       results[i].highlightTitle = highlightTitle;
	      //       results[i].highlightContent = highlightContent; 
	      //     }

	      //     var j=0;
	      //     for(j;j<results.length;j++) {
	      //       var reg1 = /<span>/g;
	      //       var reg2 = /<\/span>/g
	      //       var title = results[j].highlight.tender_title;
	      //       var title = title.replace(reg1,"<span style='color:#63B8FF;'>");
	      //       var title = title.replace(reg2,"</span>");

	      //       var content = results[j].highlight.tender_content;
	      //       var content = content.replace(reg1,"<span style='color:#63B8FF;'>");
	      //       var content = content.replace(reg2,"</span>");

	      //       results[j].highlight.tender_title = title;
	      //       results[j].highlight.tender_content = content;
	      //     }
	      //     this.results = results;
	      //     document.documentElement.scrollTop = 400;
	      //   }.bind(this))
	      //   .catch(function(err){
	      //     alert("失败");
	      //     console.log(err)
	      //   }.bind(this))
	        
	      //   var jsonObj = {}
	      //   jsonObj.key = this.form.keyword;
	      //   jsonObj.lower_issue_time = this.startDate;
	      //   jsonObj.upper_issue_time = this.endDate;
	      //   jsonObj.area = this.place;
	      //   jsonObj.type = this.tpye;
	      //   jsonObj.qualifications = this.qualification;

	      //   jsonObj.construction_industry = this.industry;
	      //   jsonObj.certification = this.certification;
	      //   jsonObj.operators = this.operator;
	      //   jsonObj.tag=this.tag;

	      //   var json = JSON.stringify(jsonObj);
	      //   this.$ajax({
	      //     method: 'post',
	      //     url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/saveuserhabits',
	      //     dataType: 'json',
	      //     headers: {
	      //       'Content-Type': 'application/json',
	      //       'Authorization' : this.token,
	      //     },
	      //     data: {
	      //       searchcontent : json
	      //     }
	      //   }).then(function(res){
	      //   }.bind(this))
	      //   .catch(function(err){
	      //     alert("失败");
	      //     console.log(err)
	      //   }.bind(this))
	      // },

	      sentKeyword:function(keyword){
	      	var keyword = this.form.keyword;
	      	console.log("我输入的");
	      	console.log(keyword);

	      	let routeData = this.$router.resolve({
			   path: "/homeThree",
			   // query: params,
			   query:{token:this.token,keyword:keyword}
			});
			window.open(routeData.href, '_blank');
	      }
		}
	}
</script>