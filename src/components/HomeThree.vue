<!--搜索页面-->
<template>
	<div class="web-wrap">


		<div id="loading">
		  <img src="../assets/images/loading.gif" class="img-responsive">
		</div>

		<!-- 页面头部 -->
		<div class="page-header text-left">
			<img src="../assets/images/logo.png" class="logo" @click="toSearch"  @mouseover="toPointer($event)"/>
        	<b-input type="text"
               id="keyword"
               required
               v-model="form.keyword"
               placeholder="请输入搜索关键词"
               class="keyword-in keyword-in-sm"

               >
        	</b-input>
        	<b-button class="search-btn search-btn-sm" type="button" @click="search(0)"  @mouseover="toPointer($event)">搜索</b-button> 
            <b-nav>
             	<!-- <li>
             		<a class="" @mouseover="toPointer($event)" @click="toMesExcell">信息图表</a>
             	</li> -->

             	<li>
             		<a  class="text-center" v-if="role==1" @mouseover="toPointer($event)" @click="toAdmin">后台管理</a>
             	</li>
             	<li> 
             		<a  class="text-center" v-if="backstate==1" @mouseover="toPointer($event)" @click="toBackAnnounce">返回详情页</a>
             	</li>
            </b-nav>


            <ul id="nav">
				<li>
        	 		<div class="logo per-ico pointer"><img src="../assets/images/person.png" ></div>
	               <ul  class="header-select per-header-select" >
	                <li v-for="" style="float: left;background-color: white;"><a class="pername text-center" @mouseover="toPointer($event)" @click="toPersonal" style="margin-left: 20%">{{name}}</a></li>

	                <!-- <li style="margin-left: 22%;font-size: 14px;"><b-btn style="font-size: 14px;"variant="danger" class="text-center"@click="toLogin" >退出登录</b-btn></li> -->

	                <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;" @mouseover="toPointer($event)" @click="toPersonal" class="Notify-ico"><img src="../assets/images/personal.png" class="logo" style="width: 24px;height: 24px;">个人主页</li>

	                <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;" @mouseover="toPointer($event)" @click="toPersonalUpdate" class="Notify-ico"><img src="../assets/images/update.png" class="logo" style="width: 24px;height: 24px;">修改资料</li>

	                <li style="margin-left: 15%;font-size: 14px;margin-top: 5%;margin-bottom: 5%;" @mouseover="toPointer($event)" @click="toLogin" class="Notify-ico"><img src="../assets/images/signout.png" class="logo" style="width: 24px;height: 24px;">退出登录</li>

	               </ul>   
        	 	</li>

             	<li  @mouseover="toPointer($event)">
        	 		<div style=""><img src="../assets/images/notifications.png" style="margin-top: 20px" class="logo lingdang-ico pointer">
        	 			<span class="dot pointer">{{msgNum}}</span>
        	 		</div>
	                <ul  class="header-select msg-ul pointer" v-if="msgNum!=0">
	                 <li  v-for="Notify in Notifys"><a class="Notify-ico text-center"  @mouseover="toPointer($event)">{{Notify}}</a></li>
	                 <li ><b-btn style="font-size: 14px" class="pointer msgMore"variant="danger"  @mouseover="toPointer($event)" @click="toPersonalMes">查看更多</b-btn></li>
	                </ul>
	                <ul class="header-select msg-ul" v-if="msgNum==0">
	                	<li ><a class="text-center"  >无未读消息</a></li>
	                 <li ><b-btn style="font-size: 14px;margin-left: 20%" class="pointer msgMore"variant="danger"  @mouseover="toPointer($event)" @click="toPersonalMes">查看所有消息</b-btn></li>
	                </ul>
        	 	</li>


            </ul>

        	
		</div>
		<div class="container">

			<div class="tab-wrap" v-if="">	
				
				<div class="text-left tab-item">
		          <span class="tab-title red">发布时间：</span>
		        
		          	<b-list-group-item v-for="time in times" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-text tag pointer time "><span>{{time}}</span></b-list-group-item>
		    	 
		          <div class="inline tag">
		            <b-form-input v-model="startDate"
		                          type="date"
		                          placeholder="Enter your name"
		                          class="keyword-in money-in time-one-in tag pointer"
		                          id="startDate">
		            </b-form-input>

		            <span style="font-weight:bold;">—</span>

		            <b-form-input v-model="endDate"
		                          type="date"
		                          placeholder="Enter your name"
		                          class="keyword-in money-in time-one-in tag pointer"
		                          id="endDate">
		            </b-form-input>
		          </div>
		          <span id="more-btn" class="more-btn pointer"style="font-size: 15px">更多<img style="width: 12px;height: 12px;margin-left: 4px" class="person-icon" src="../assets/images/down.png"/></span>
		        </div>
				
				<div class="search-message">
					
					<div class="text-left tab-item">
			          <span class="tab-title red">行业分类：</span>
			          <div class="tab-texts ct-type">
			         	 <b-list-group-item v-for="industry in industrys" class=" industry col-lg-1 col-md-2 col-sm-6 tab-sort  tag pointer"><span>{{industry}}</span></b-list-group-item>
			      	  </div>
			        </div>
					
					 <div class="text-left tab-item">
			          <div style="display:inline-block;">
			            <span class="tab-title red ">项目地区：</span>
			          </div>
			          <div class="tab-texts place-wrap">
			            <b-list-group-item v-for="place in places" class="col-lg-2 col-md-2 col-sm-6 tab-sort tab-text tag place pointer"><span>{{place}}</span></b-list-group-item>
			          </div>
			        </div>
			        
			         <div class="text-left tab-item">
			          <div style="display:inline-block;">
			            <span class="tab-title red ">公告标签：</span>
			          </div>
			          <div class="tab-texts tagtype-wrap" >
			          	<b-list-group-item  class="col-lg-2 col-md-2 col-sm-6 tab-sort tab-text tag tagtypess pointer" style="width: auto;margin: ;"><span style="width: auto;">不限</span></b-list-group-item>
			            <b-list-group-item v-for="tagtype in tagtypes" class="col-lg-2 col-md-2 col-sm-6 tab-sort tab-text  tagtype pointer" style="width: auto;margin: ;"><span style="width: auto;">{{tagtype}}</span></b-list-group-item>
			          </div>
			        </div>
					
					<div class="text-left tab-item  info-classify" style="padding-bottom:10px;">
			          <div style="display:inline-block;">
			            <span class="tab-title red inline-b-span ">信息分类：</span>
			          </div>
			          <div class="tab-texts msg-type">
			            <b-list-group-item v-for="type in types" class="col-lg-1 col-md-3 col-sm-6 tab-sort tag type pointer "><span>{{type}}</span></b-list-group-item>
			            <b-form-select v-model="pubSelected" :options="publish" id="pub-select" class="tab-select  info-select pointer " style="height:23px;padding-left: 4px;" />
			          </div>
			        </div>
					
					<div class="text-left tab-item info-classify" style="padding-bottom: 10px;">
						<div style="display: inline-block;">
							<span class="tab-title red inline-b-span">招标资质:</span>
						</div>
						<div class="tab-texts my-qualification">
							<b-list-group-item v-for="qualification in qualifications" class="col-lg-1 col-md-3 col-sm-6 tab-sort tag qualification pointer "><span>{{qualification}}</span></b-list-group-item>	
			           	 	<b-form-select v-model="aptSelected" :options="aptitude" id="apt-select" class=" tab-select info-select pointer " style="height:23px;padding-left: 4px;" />
							<b-form-select v-model="certSelected" :options="certificate" id="cert-select" class=" tab-select info-select pointer" style="height:23px;padding-left: 4px;" />
						</div>

					</div>
					
					 <div class="text-left tab-item" style="padding-bottom: 10px;">
			          <div style="display:inline-block;">
			            <span class="tab-title red">来源：</span>
			          </div>

			          <div class="tab-texts operator">
			            <b-list-group-item v-for="operator in operators" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-text tag pointer"><span>{{operator}}</span></b-list-group-item>
			          </div>



			        </div>
					<div class="text-right tab-item"style="border: none;margin:0;padding: 8px 0 8px 0 ">
						<b-form-select v-model="sortSelected" :options="sorts" id="sort-select" class=" tab-select info-select pointer text-left" style="display: inline-block; margin:0；padding-bottom: 2px;height:30px;padding-left: 4px;float: left;" />

						<div style="display: inline-block; margin:0；padding-bottom: 2px;">
							<b-btn variant='primary' size='sm' @click="clearConditions">清空搜索条件</b-btn>
						</div>
						<div style="display: inline-block;vertical-align: middle;">
							<span id="less-btn"class="less-btn pointer" style="font-size: 15px">收起<img style="width: 12px;height: 12px;margin-left: 4px" class="person-icon"src="../assets/images/up.png"></span>
						</div>
					</div>
				</div>
		    </div>        
			
				
				<div class="tab-wrap total" >
			        <div class="text-left tab-item" style="border:none;">
			          <div style="display:inline-block;">
			            <span class=" red"><a id="total" style="display:inline-block;font-weight: bold;">总数：{{total}}</a></span>
			          </div>
			        </div>
			    </div>
			
				<div class="bid-info " v-for="result in results">
					<div class="pub-bid text-left">
						<div style="display:inline-block;margin-top: 10px">
			            <span class="tab-title inline-b-span" style="width: auto;margin-right: 15px">{{result._source.tender_type}}</span>
			            <b-list-group-item herf="#" @mouseover="toPointer($event)" v-for="tag in result.tagsArr" @click="searchPubBid(tag)" class=" col-md-12 col-sm-12 tab-sort red pointer tab-text tag pointer msg-tag tag-select" style="">#{{tag}}</b-list-group-item>
			          </div>
					</div>
					<div class="bid">
				        <h5   @mouseover="toPointer($event)" @click="browseRecord(result._source.id)" v-show="result.highlightTitle==false" class="text-left pointer" style="margin-left:6px;color:#e64035">
			            <a class="showtwo" target="_blank" style="color:#e64035;width: auto;" v-html="result._source.tender_title">{{result._source.tender_title}}</a><span class="issue-time" style="margin-right:12px;margin-top: 8px; margin-left: 10px; font-size:14px;float: right;">{{result._source.tender_issue_time}}</span>
			          </h5>

			          <h5  @mouseover="toPointer($event)" @click="browseRecord(result._source.id)" v-show="result.highlightTitle==true" class="text-left pointer" style="color:#e64035">
			            <a  target="_blank" style="color:#e64035" v-html="result.highlight.tender_title"></a><span style="margin-right:12px;margin-top: 6px; font-size:14px;float: right;" v-show="result.highlightTitle==true">{{result._source.tender_issue_time}}</span>
			          </h5>
			          
			          <a   @mouseover="toPointer($event)" @click="browseRecord(result._source.id)" v-show="result.highlightContent==false" target="_blank" ><p class="re-content text-left" v-html="result._source.tender_content">
			          </p></a>

			          <a  @mouseover="toPointer($event)" @click="browseRecord(result._source.id)" v-show="result.highlightContent==true" target="_blank" ><p class="re-content text-left" v-html="result.highlight.tender_content">
			          </p></a>
					</div>
					<div class="bid-foot text-right">
						<span class="pointer bid-btn focus  " >
							关注量
						</span>
						<span class="tab-title  followTotal"style="padding-right: 12px;padding-left: 2px ;width: 20px;margin-bottom: 10px">{{result._source.attentionCount}}</span>
						<span class=" pointer bid-btn focus " >浏览量</span>
						<span class="tab-title  followTotal" style="padding-right: 2px;padding-left: 2px ;width: 20px;margin-top: 0px">{{result._source.browseCount}}</span>
					</div>
				</div>
				
				<div>
					 <el-pagination 
					 v-if="currentTotal!=0" 
					 @current-change="handleCurrentChange" 
					 background layout="prev, pager, next, jumper" 
					 :total="currentTotal" 
					 class="currentTotal"
					 :current-page.sync="currentPage"
					 >
	    			 </el-pagination>

				   
				</div>
			
		</div>
	</div>
</template>

<style scoped>
	@import '../assets/css/search.css';

	#loading
	{
		position:fixed;
		top:40%;
		left:45%;
		z-index:999;
	}

	#nav {
    display: inline;
    float: none;
    /*border: 1px solid blue;*/
	}

	#nav li { float: right; display: block; background: none; position: relative; z-index: 999; margin: 0 10px; }

	#nav li a { display: block; height:35px; margin-top:1px ;margin-bottom: 1px;  font-weight: 700; line-height: 35px; text-decoration: none; color: #818ba3; zoom: 1; padding: 0 12px; }
	.Notify-ico:hover{ background-color: #DADADA;color: #576482;text-decoration:underline; }
	#nav ul { position: absolute; left: -70px; display: none; margin:0; ; padding: 0; list-style: none;  padding-bottom: 3px;border: 1px solid #DADADA }
	#nav .header-select li {
	    text-align: left;
	    clear: both;
	    float: none;
	    font-size: 14px;
	}
	.msgMore{
		margin-left: 30%;
		font-size: 5px;
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


	.more-btn,.less-btn {
    color:#e64035;
    display:inline-block;
    float:right;
    margin-left: 4px;
  }

  .more-btn {
    display: none;
  }

  .less-btn {
    color:#63B8FF;
  }

	  .subitem {
	    border:  1px solid #DADADA;
	  }
	.head-mes-btn,.head-manage-btn{
		font-size: 20px;
		margin-bottom: 5px;
		padding-bottom: 2px;
		color: 
	}
	.choiceType{
		display: block;
	}

	.inline {
    display:inline;
  }
  .red {
    color: #e64035;
  }
  .tab-choosed {
    background-color: #e64035;
    color: white;
  }
	/*标签搜索*/
  .money-in {
    width:72%;
    height:23px;
    border:none; 
    border-radius: 5px;
  }

  .time-one-in {
    padding: 0;
    width: 140px;
    border:  1px solid #DADADA;
  }

  .tab-wrap {

    padding:0px 20px;
    font-size: 14px;
    border: 1px dashed #DADADA;
  }

  .tab-item {
    padding: 8px 0;
    border-bottom: 1px dashed #DADADA;
  }

  .tab-title {
    display:inline-block;
    width:86px;
    font-weight: bold;
  }

  .tab-texts {
    display:inline-block;
    padding-right: -14px;
    width:90%;
    vertical-align:top;
  }

  .tab-text {
    display:inline;
    margin-right:14px;
    padding:0;
  }

  .tab-sort {
    display: inline-block;
    width: auto;
    margin-bottom: 4px;
    margin-right:14px;
    padding: 2px 4px;
    text-align: center;
    border-radius: 4px;
    border: none;
  }

  .inline-b-span {
    display: inline-block;
    height:30px;
    line-height: 30px;
  }
  /*总数*/
  .total {
    margin-top:20px;
    margin-bottom: 24px;
    padding:0 20px;
  }
  /*招标信息*/
  .bid-info {
    margin-top: 14px;
    width:90% ;
    margin-left:5%;
    background-color: ;
    border-bottom: 1px solid #DADADA;
    border-left: 1px solid #DADADA;
    border-right: 1px solid #DADADA;
    box-shadow:0px 0px 1px 1px #DADADA ;

    
  }
  .pub-bid,.bid,.bid-tag{
  	margin-left: 20px;
  	margin-top: 0px;
  }
  .followTotal{
  	margin-top: 10px;
  }
  .re-content{
  	margin-top: 10px;
  }
  .fav-ico{
  	margin-bottom: 10px;
  }
  .feedback{
  	float: right;
    display: inline-block;
    margin-right:25px;
    margin-top:10px;    
    text-align:center;
    color:#8E8E8E;
    font-weight:bold;
  }
  .currentTotal{
  	margin-top: 20px;
  	margin-bottom: 20px;
  	color: red;
  }
  .re-content {
  	 margin-bottom: 5px;
    color: #8E8E8E;
  }
  .re-content {position: relative; line-height: 20px; max-height: 60px;overflow: hidden;color: #8E8E8E;}
  .re-content::after{
    content: "..."; 
    position: absolute; 
    bottom: 0; 
    right: 0; 
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
  .time-one-in {
    padding: 0;
    width: 140px;
    border:  1px solid #DADADA;
    color: #8E8E8E;
  }

  .time-one-in-click {
    padding: 0;
    width: 140px;
    border:  1px solid #DADADA;
  }
  .focus{
  	font-size: 18px;
  	color: black;
  }
</style>
<style>
  .el-pagination .el-pager .active {
    background-color: #e64035!important;
  }

  .el-pagination .el-pager :hover {
    color: #e64035!important;
  }
  .close{
		display: none;
	}
</style>

<script >
	export default{
		data:function(){
			return{
				form:{
					keyword:''
				},

				 msgs:['重庆移动变更公告','重庆移动变更公告','重庆移动变更公告'],

				role:0,

				backstate:0,

				state:1,
				states:1,
				msgNum:'',
				// 标签搜索
				total:null,

				followTotal:123,

				currentTotal:null,

				 mess:["11111qqqqqqqqqqq1","2222222222222","33333333"],
				 //我的消息
				 Notifys:['','','','','','',],

				form : {
		          keyword: '',
		          food:null,
		          text:''
		         
		        },
		        // form:0,
				startDate:'',
		        endDate:'',

		         startDateStr:'',
       			 endDateStr:'',

		        startDateBefore:'',
		        endDateBefore:'',

		        choiceTypes:['#设计','#施工','#监理','#ICT系统集成','#IDC','#管线施工','#宽带建设','#网络覆盖','#EPC',],

		        times: ['不限','今天','最近3天','最近7天','最近30天'],

		        industrys:['不限','设计','施工','监管'],

		        places:['不限','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',],

		        tagtypes:['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',],

		        types:['不限',],

		        pubSelected: null,
		        publish: [
		          { value: null, text: '信息类型' },
		          { value: '招标预告', text: '招标预告' },
		          { value: '招标公告', text: '招标公告' },
		          { value: '变更公告', text: '变更公告' },
		          { value: '资质审核', text: '资质审核' },
		          { value: '中标公示', text: '中标公示' },
		          { value: '流标公告', text: '流标公告' },
		        ],

		        resultSelected: null,
		        bidResults: [
		          { value: null, text: '招标结果' },
		          { value: '中标', text: '中标' },
		          { value: '成交', text: '成交' },
		          { value: '废标', text: '废标' },
		          { value: '流标', text: '流标' }
		        ],

		        majorSelected: null,
		        majors: [
		          { value: null, text: '专业领域' },
		          { value: '小区宽带', text: '小区宽带' },
		          { value: '无线网络', text: '无线网络' },
		          { value: '通信工程设备', text: '通信工程设备' },
		          { value: '通信工程管道', text: '通信工程管道' },
		          { value: '搬迁调整', text: '搬迁调整' },
		          { value: '更新改造', text: '更新改造' },
		          { value: '宽带接入', text: '宽带接入' },
		          { value: '网络优化', text: '网络优化' },
		          { value: '系统集成', text: '系统集成' },
		          { value: 'WLAN', text: 'WLAN' },
		        ],

		        aptSelected: null,
		        aptitude: [
		          { value: null, text: '投标资质' },
		          { value: '通信工程施工总承包', text: '通信工程施工总承包' },
		          { value: '信息通信建设企业服务能力', text: '信息通信建设企业服务能力' },
		          { value: '电子与智能化工程专业承包', text: '电子与智能化工程专业承包' },
		          { value: '信息系统集成及服务', text: '信息系统集成及服务' },
		          { value: '有线广播电视工程企业总承包', text: '有线广播电视工程企业总承包' },
		          { value: '防雷工程专业施工', text: '防雷工程专业施工' },
		          { value: '增值电信业务经营许可', text: '增值电信业务经营许可' },
		          { value: '劳务派遣经营许可', text: '劳务派遣经营许可' }
		        ],

		        certSelected: null,
		        certificate: [
		          { value: null, text: '证书' },
		          { value: '企业信用等级', text: '企业信用等级' },
		          { value: '质量管理体系认证', text: '质量管理体系认证' },
		          { value: '环境管理体系认证', text: '环境管理体系认证' },
		          { value: '职业健康安全管理体系认证', text: '职业健康安全管理体系认证' },          
		        ],


		        sortSelected: null,
		        sorts: [
		          { value: null, text: '搜索排序方式' },
		          { value: 'time', text: '按时间排序' },
		          { value: 'score', text: '按匹配度排序' },         
		        ],

		        
				
				
				qualifications:['不限'],
				
				pubBids:['#系统集成','#宽带建设','#智慧医疗'],

				operators:['不限','移动','电信','联通','铁塔','广电','政府项目'],

				// 招标信息
				results:'',

				//用户名
				name:'',

				//自搜索
				autoSearch:false,

				from:0,
				
				//请求内容
				time:'',
				industry:'',
				place:'',
				type:'',
				qualification:'',
				certification:'',
				operator:'',
				tag:[],
				sort:'',
				// certificates:'',

				//搜索标签所选择的数组
				tagtypeArr:[],
				currentPage:1,
				usermsg:[],
				token:'',
			}

		},
		created:function(){
			var self = this; 
			console.log("返回上一页的状态");
			console.log(self.backstate);
			console.log(self.role);
			console.log("收到标签");
	        console.log("keyword:");
	        console.log("query路径过来的标签");
	        console.log(self.$route.query.keyword);
	        console.log("params路径过来的标签");
	        console.log(self.$route.params.keyword);
			if (self.$route.params.keyword!='undefined') {
			console.log("params路径过来的标签");
	        console.log(self.$route.params.keyword);
	        console.log(self.form.keyword);
			self.form.keyword = self.$route.params.keyword;
			}else if(self.$route.query.keyword!='undefined'){
				self.form.keyword = self.$route.query.keyword;
			}
			console.log(self.form.keyword);
	        var keyword =self.form.keyword;

	        self.usermsg = window.localStorage.getItem('usermsg');
	        if(self.usermsg==null){
	        	self.toLogin();
	        }
	        var usermsg = self.usermsg;

	        var usermsg = eval("(" + usermsg + ")");
	        var role = usermsg.role;
	        self.role = role;
	        console.log("角色权限");
	        console.log(self.role);
	        self.usermsg = usermsg;
	        self.token = self.usermsg.token;
	        var token = self.token;
	        console.log(token);

	        var url = document.referrer;
	        console.log("上一页");
	        console.log(url);

	        // 动态加载地区
	        this.$ajax({
	        method: 'post',
	        url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/searchArea',
	        dataType: 'json',
	        headers: {
	          'Content-Type': 'application/json',
	          'Authorization' : token
	        }
	      }).then(function(data){
	        var places = data.data.hits.hits;
	        console.log("地区");
	        console.log(places);
	        var i=0;
	        var hasOthers = false;
	        var placesArr = ['不限'];
	        for (i;i<places.length;i++) {
	          if(places[i].fields.tender_area[0]!='其他'&&places[i].fields.tender_area[0].length<=5&&places[i].fields.tender_area[0]!='重庆市') {
	            placesArr.push(places[i].fields.tender_area[0]);
	          } else {
	            hasOthers = true
	          }          
	        }

	        if(hasOthers==true) {
	          placesArr.push('其他');
	        }
	        this.places = placesArr;
	      }.bind(this))
	      .catch(function(err){
	        // alert("失败");
	        console.log(err)
	      }.bind(this));

	      if(keyword==''||keyword==undefined) {
	        self.searchHot(0);
	      } else {
	        self.search(0);
	      }

	      self.usermsg = window.localStorage.getItem('usermsg');

	      var usermsg = self.usermsg;
	      var usermsg = eval("(" + usermsg + ")");
	      self.usermsg = usermsg;
	      self.role = self.usermsg.role;

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
	      	console.log(data);
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
	      //动态加载公告标签
	        this.$ajax({
            method: 'get',
            url: 'https://recruitment.cqcyit.com:8090/userservice/tags/list',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : token
            }
          }).then(function(data){
            var tags = data.data.data;
            console.log(tags);

            console.log(tags.length);
            var hasOthers = false;
            var tagsArr = [];
            for (var i = 0; i < tags.length; i++) {
                tagsArr.push(tags[i].tagName);
            }
            

            this.tagtypes = tagsArr;
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

			//回车触发搜索
			$(document).keyup(function(event){
			  if(event.keyCode ==13){
			    $(".search-btn").trigger("click");
			  }
			});

			 $(document).ready(function() { 
	         $('#nav li').hover(function() {
	          $('ul', this).slideDown(200);
	          $(this).children('a:first').addClass("hov");
	         }, function() {
	          $('ul', this).slideUp(100);
	          $(this).children('a:first').removeClass("hov");  
	         });
	        });

		    console.log("渲染生命周期");
			$('.tab-item>.tag').click(function(e){
	        if ($(this).index()<6) {
	          $(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
	          $('.tab-item>.tag').eq(5).children(".tag").removeClass("tab-choosed");
	          this.startDate = '';
	          $("#startDate").val("");
	          $("#endDate").val("");
	        }
	        
	        if($(this).index()==6) {
	          $(this).removeClass("tab-choosed");  
	        }
	      })

	      $(".tab-texts .tag").click(function(e) {
	        $(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
	      })




		    $('.tab-item .tab-sort').eq(0).trigger("click","true");

	        $('.tagtype-wrap .tab-sort').eq(0).trigger("click","true");

	        $('.tab-item  .msg-type .tab-sort').eq(0).trigger("click","true");

	        $('.operator .tab-sort').eq(0).trigger("click","true");
	        
	        $('.ct-type .tab-sort').eq(0).trigger("click","true");

	        $('.my-qualification .tab-sort').eq(0).trigger("click","true");
	        $('.place-wrap .tab-sort').eq(0).trigger("click","true");


		     var clear = false;
		     /*监听时间日期选择*/
     		 $(".time").click(function(e,clear) {    
		        self.time = e.currentTarget.innerText;
		        
		        if(self.time=='今天') {
		          var date = new Date();

		          var currentdate = self.getNowDate(date);
		          self.startDateStr = currentdate;
		          self.endDateStr = "";
		          
		        } else if (self.time=='最近3天') {
		          var date = new Date(); //获取今天日期
		          date.setDate(date.getDate() - 3);
		          var currentdate = self.getNowDate(date);
		          
		          self.startDateStr = currentdate;
		          self.endDateStr = "";
		        }else if(self.time=='最近7天') {
		          var date = new Date(); //获取今天日期
		          date.setDate(date.getDate() - 7);
		          var currentdate = self.getNowDate(date);
		          
		          self.startDateStr = currentdate;
		          self.endDateStr = "";
		        }else if(self.time=='最近30天') {
		          var date = new Date(); //获取今天日期
		          date.setDate(date.getDate() - 30);
		          var currentdate = self.getNowDate(date);

		          self.startDateStr = currentdate;
		          self.endDateStr = "";
		        } else if (self.time=='不限') {
		          self.startDateStr = "";
		          self.endDateStr = "";
		        }

		        if(clear!="true") {
		        	console.log("时间");
		          self.search(0);
		        }   
		        self.currentPage = 1;
		      })
     		 
			setInterval(function() {
        if((self.startDate != self.startDateBefore || self.endDate != self.endDateBefore) && self.startDate<self.endDate&&self.startDate!='') {
          console.log("变红");
          $('.tab-item>.tag').eq(5).children(".tag").addClass("tab-choosed");
          $('.tab-item>.tag').eq(5).children(".tag").addClass("time-one-in-click");
          $('.tab-item>.tag').eq(5).children(".tag").removeClass("time-one-in");
          $('.tab-item>.tag').eq(5).siblings().removeClass("tab-choosed");
          self.startDateStr = self.startDate; 
          self.endDateStr = self.endDate; 

          self.startDateBefore = self.startDate;
          self.endDateBefore = self.endDate;
          self.search(0);
          self.currentPage = 1; 
        }
      },2000);

			//监听行业分类
			$(".industry ").click(function(e,clear) {
				$(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
				console.log(e.currentTarget.innerText);
			 	console.log("行业选择");
		        self.industry = e.currentTarget.innerText;
		        if(self.industry=="不限") {
		          self.industry=""
		        }

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听地区
			 $(".place-wrap .tag").click(function(e,clear) {
			 	$(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
			 	console.log(e.currentTarget.innerText);
			 	console.log("地区选择");
			 	console.log("22222");
		        self.place = e.currentTarget.innerText;
		        if(self.place=='不限') {
		          self.place = "";
		        }

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      })
			//监听监听信息分类	
			 $(".type ").click(function(e,clear) {
			 	console.log("类型1");
			 	console.log(this.tpye);
 				self.type = e.currentTarget.innerText;
 				console.log("类型2");
			 	console.log(self.tpye);
 				$(this).addClass("tab-choosed");
 				$("#pub-select").removeClass("tab-choosed");
 				$("#pub-select").val("");
 				self.type=""
 				console.log("类型3");
			 	console.log(self.type);
			 	console.log("信息选择");
		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听信息类型
			$("#pub-select").change(function(e,clear) {
				self.type = $(this).val();
				console.log("信息l类型下拉框");
				console.log(self.type);
				$(this).addClass('tab-choosed');  
				$('.type').removeClass('tab-choosed'); 
				if (self.type==null) {
					self.type="";
				}
		      

		        
		       
		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听证书
			$("#cert-select").change(function(e,clear) {
				self.certification=$(this).val();
				console.log("证书下拉菜单");
				console.log(self.certification);
				$(this).addClass('tab-choosed');  
				$('.qualification').removeClass('tab-choosed'); 

		        $('#apt-select').removeClass('tab-choosed'); 
		        $("#apt-select").val("");
				self.qualification="";
				if (self.certification==null) {
					self.certification="";
				}

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      })
			//监听投标资质下拉菜单
			$("#apt-select").change(function(e,clear) {
				self.qualification=$(this).val();
				console.log("投标资质下拉菜单");
				console.log(self.qualification);
				$(this).addClass('tab-choosed');  
				$('.qualification').removeClass('tab-choosed'); 

		        $('#cert-select').removeClass('tab-choosed'); 
		        $("#cert-select").val("");
				self.certification="";
				if (self.qualification==null) {
					self.qualification="";
				}

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听投标资质
			$(".qualification ").click(function(e,clear) {
			 	console.log("资质1");
			 	console.log(this.qualification);
 				self.qualification = e.currentTarget.innerText;
 				console.log("资质2");
			 	console.log(self.qualification);
 				$(this).addClass("tab-choosed");
 				$("#apt-select").removeClass("tab-choosed");
 				$("#apt-select").val("");
 				$("#cert-select").removeClass("tab-choosed");
 				$("#cert-select").val("");
 				self.qualification=""
 				self.certification=""
 				console.log("类型3");
			 	console.log(self.qualification);

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听运营商
			$(".operator .tag").click(function(e,clear) {
				$(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
			 	console.log(e.currentTarget.innerText);
			 	console.log("运营商");
		        self.operator = e.currentTarget.innerText;
		        if(self.operator=="不限") {
		          self.operator=""
		        }

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			//监听公告标签不限
			$(".tagtype-wrap .tagtypess").click(function(e,clear){
				self.tag=[];
				 if(clear!="true") {
				 	console.log("监听公告标签不限");
				 	console.log(self.tag);
		          self.search(0);          
		        }
		        self.currentPage = 1; 
			 });
			//监听公告标签
			$(".tagtype-wrap .tagtype").click(function(e,clear) {

				$('.tagtype-wrap .tag').removeClass("tab-choosed");
				console.log("进入时的tag");
				console.log(self.tag);
				var tag=self.tag;
				if (self.tag.length<3) {
					$(this).toggleClass("tab-choosed");
				}
				

			 	console.log(e.currentTarget.innerText);
			 	console.log("公告标签");
			 	// console.log(self.tagtypeArr);
			 	var tagtype =e.currentTarget.innerText;
			 	var tag = self.tag;
			 	console.log(tagtype);

			 	var tagsame = false; 

			 	for (var i=0;i<=tag.length;i++) {
			 		if (tag[i]==tagtype) {
			 			tagsame = true;
			 			console.log("相同的tag");
			 			$(this).removeClass("tab-choosed");
			 			console.log(tagtype);
			 			console.log(tag[i]);
			 			console.log(i);
			 			tag.splice( i,1)
			 			console.log(tag);
			 		}
			 	}	


			 	console.log("s数组长度");
			 	console.log(tag.length);
			 	if (tag.length<3) {
			 		if(tagsame==false){
			 			tag.push(tagtype);
			 		}
			 	}else{
			 		alert("最多选择三个标签");
			 	}
			 	
			 	self.tag = tag;
		        console.log("选中的标签");

		        console.log(self.tag );
			 	// }

		        if(clear!="true") {
		          self.search(0);          
		        }
		        self.currentPage = 1; 
		      });
			/*hover添加pointer效果*/
	      $(".pointer").mouseover(function(event) {
	        $(this).css("cursor","pointer");
	      });

	      //搜索列表收起/放开
	      $("#more-btn").click(function() {
	        $(".search-message").show();
	        $("#more-btn").hide();
	      });
	      $("#less-btn").click(function() {
	      	console.log("收起");
	        $("#more-btn").show();
	        $(".search-message").hide();
	        document.documentElement.scrollTop = 0;
	      });

	      //获取招标公告
	      $('#pubBid').click(function(){
	      	console.log($('#pubBid'));
	      	// alert($('#pubBid').val());
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
					        alert("失败");
					        console.log(err)
					      }.bind(this));
			        	}
			        }.bind(this))
			        .catch(function(err){
			          alert("失败");
			          console.log(err)
			        }.bind(this))
			    },1800000);
		},
		methods:{

			//触发更新查找信息
			getNotifyByUser:function(){

				console.log("触发更新查找信息");
				setInterval(()=>{
					this.$ajax({
			        method: 'post',
			        url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/getNotifyByUse',
			        dataType: 'json',
			        headers: {
			            'Content-Type': 'application/json',
			            'Authorization' : this.token
			        },
			        }).then(function(data){
			        	if (data.data.state=="success") {
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
			          alert("失败");
			          console.log(err)
			        }.bind(this))
				},2000);
			},

			getKeyword:function(keyword){
				this.form.keyword = keyword;
			},
			open:function(){

			},
			console:function() {
	        console.log(this);
	        $(this).addClass("red");
	        console.log("111111111");
	        console.log(this.startDate);
	      },

	      search:function(){

	      },
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
	      toMesExcell:function(){
			console.log("==================路由跳转，个人信息界面=========================");
	      	this.$router.push({name:'mesExcell',params:{usermsg:this.usermsg}});
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
			   query:{personalMes:personalMes}
			});
			window.open(routeData.href, '_blank');
	      },

	      toAdmin:function(){
	      	console.log("==================路由跳转，管理员界面=========================");
	      	this.$router.push({name:'admin',params:{token:this.token}});
	      },

	      toPersonalUpdate:function(){
	      	console.log("==================路由跳转，修改个人信息界面=========================");
	      	this.$router.push({name:'personalUpdate',params:{token:this.token}});
	      },
	      toBackAnnounce:function(){

	      },
	      //分页
	      handleCurrentChange:function(val){
	      	console.log(`${val}`);
	      	var from = (`${val}`-1)*10;

	        if(this.autoSearch == false) {
	          this.search(from);
	        }else {
	          this.searchHotPage=true;
	          this.searchHot(from);
	        }   

	      },
	      //前往多少页
	      handleSizeChange:function(val){
	      	console.log("前往"+`${val}`);
	      	var from = (`${val}`-1)*10;

	        if(this.autoSearch == false) {
	          this.search(from);
	        }else {
	          this.searchHotPage=true;
	          this.searchHot(from);
	        } 
	      },
	      //清空搜索条件
	      clearConditions:function(){
	      	this.form.keyword = '';
	        this.time = '';
	        this.industry='';
	        this.place = '';
	        this.type = '';
	        this.qualification = '';
	        // this.professional_field = '';

	        this.tag=[],
	        this.certification = '';
	        this.operator = '';

	        var clear = true;

	         $('.type').trigger("click","true");

	        $('.tab-item .tab-sort').eq(0).trigger("click","true");

	        $('.tagtype-wrap .tab-sort').eq(0).trigger("click","true");

	        $('.operator .tab-sort').eq(0).trigger("click","true");
	        
	        $('.ct-type .tab-sort').eq(0).trigger("click","true");

	        $('.place-wrap .tab-sort').eq(0).trigger("click","true");
	        $('.qualification').trigger("click","true");


	        this.searchHot(0);
	      },

	      // 搜索
	      search:function(from){
	      	$('#loading').show();
	      	this.autoSearch = false;
	        this.$ajax({
	          method: 'post',
	          url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/search',
	          dataType: 'json',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : this.token
	          },
	          data: {   
	            key: this.form.keyword,
	            lower_issue_time: this.startDateStr,
	            upper_issue_time: this.endDateStr,
	            area: this.place,
	            type: this.type,
	            qualification:this.qualification,
	            construction_industry: this.industry,
	            certification:this.certification,
	            operators: this.operator,
	            tag:this.tag,
	            from: from,
	            size: 10
	          }
	        }).then(function(response){
	        	console.log(response);
	          var results = response.data.data.hits;
	          console.log("搜索结果：");
	          console.log(results);
	         
	          for (var i = 0;i<results.length;i++) {
	          	var str= results[i]._source.tender_content;
	          	 var reg = new RegExp("[\\u4E00-\\u9FFF]+$","g");
	          	console.log("content正则");
	          	console.log(reg.test(results[i]._source.tender_content));
	          	if(reg.test(results[i]._source.tender_content)){
	          		str=str.match(/[\u4E00-\uFA29](\S*)/)[0];
	          		results[i]._source.tender_content = str;
	          	}else{
	          		results[i]._source.tender_content = str;
	          	}
	         }

	          this.total = response.data.data.total; 
	          this.currentTotal = this.total;

	          var i=0;
	          var productNamesArr = []; 
	          var tags = [];
	          var productNamesStr = '';
	          var tagsStr = '';
	          var highlightTitle = true;
	          var highlightContent = true;
	          for (i;i<results.length;i++) {
	            productNamesStr = results[i]._source.tender_product_name;
	            tagsStr = results[i]._source.tender_tags;
	            if(productNamesStr!=''&&productNamesStr!=null) {
	              productNamesArr = productNamesStr.split(",");
	            } else {
	              productNamesArr=[]
	            }

	            if(tagsStr!=''&&tagsStr!=null) {
	              tags = results[i]._source.tender_tags.split(",");
	              tags.pop();
	            } else {
	              tags=[]
	            }
	            
	            
	            results[i].productNamesArr=productNamesArr;
	            results[i].tagsArr=tags;

	            if(!( "highlight" in results[i])) {
	              highlightTitle = false;
	              highlightContent = false;

	              var highlight = {};
	              highlight.tender_title ='';
	              highlight.tender_content ='';
	              results[i].highlight = highlight;
	            } else { 
	              if(!("tender_title" in results[i].highlight)) {
	                highlightTitle = false;

	                results[i].highlight.tender_title = "";
	              } else {
	                highlightTitle = true;

	                var tenderTitle = results[i].highlight.tender_title;
	                tenderTitle = tenderTitle.join(" "); 
	                results[i].highlight.tender_title = tenderTitle;
	              }
	              if(!("tender_content" in results[i].highlight)){
	                highlightContent = false;

	                results[i].highlight.tender_content = "";
	              } else {
	                highlightContent = true;

	                var tenderContent = results[i].highlight.tender_content; 
	                tenderContent = tenderContent.join(" ");             
	                results[i].highlight.tender_content = tenderContent;              
	              }
	            }
	            results[i].highlightTitle = highlightTitle;
	            results[i].highlightContent = highlightContent; 
	             
	          }
	          console.log(results.length);
	          console.log(results);

	          var j=0;
	          for(j;j<results.length;j++) {
	            var reg1 = /<span>/g;
	            var reg2 = /<\/span>/g
	            var title = results[j].highlight.tender_title;
	            var title = title.replace(reg1,"<span style='color:#63B8FF;font-weight:bold;'>");
	            var title = title.replace(reg2,"</span>");

	            var content = results[j].highlight.tender_content;
	            var content = content.replace(reg1,"<span style='color:#63B8FF;font-size:15px;font-weight:bold;'>");
	            var content = content.replace(reg2,"</span>");

	            results[j].highlight.tender_title = title;
	            results[j].highlight.tender_content = content;
	          }
	          this.results = results;
	          document.documentElement.scrollTop = 400;

	          $('#loading').hide(0);
	        }.bind(this))
	        .catch(function(err){
	          $('#loading').hide(0);
	          // alert("失败");
	          console.log(err)
	        }.bind(this))
	        
	        var jsonObj = {}
	        jsonObj.key = this.form.keyword;
	        jsonObj.lower_issue_time = this.startDateStr;
	        jsonObj.upper_issue_time = this.endDateStr;
	        jsonObj.area = this.place;
	        jsonObj.type = this.type;
	        jsonObj.qualifications = this.qualification;

	        jsonObj.construction_industry = this.industry;
	        jsonObj.certification = this.certification;
	        jsonObj.operators = this.operator;
	        jsonObj.tag=this.tag;

	        console.log("用户习惯数据");
	        console.log(jsonObj.key+"关键词"+jsonObj.lower_issue_time+"时间"+jsonObj.area );
	        var json = JSON.stringify(jsonObj);
	        console.log("用户习惯json");
	        console.log(json);
	        this.$ajax({
	          method: 'post',
	          url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/saveuserhabits',
	          dataType: 'json',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : this.token,
	          },
	          data: {
	            searchcontent : json
	          }
	        }).then(function(res){
	        }.bind(this))
	        .catch(function(err){
	          // alert("失败");
	          console.log(err)
	        }.bind(this))
	      },
	      //搜索hot
	      searchHot:function(from){
	      	$('#loading').show();
	      	this.autoSearch = true;

	        var token =this.token;
	        this.$ajax({
	          method: 'post',
	          url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/search',
	          dataType: 'json',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : token
	          },
	          data: {
	          	key: '',
	            lower_issue_time: this.startDateStr,
	            upper_issue_time: this.endDateStr,
	            area: this.place,
	            type: this.type,
	            qualification:this.qualification,
	            construction_industry: this.industry,
	            certification:this.certification,
	            operators: this.operator,
	            tag:this.tag,
	            from: from,
	            size: 10
	          }
	        }).then(function(response){
	        	console.log("自搜索成功");
	          console.log("response");
	          console.log(response);
	          var results = response.data.data.hits;//不同的地方
	          console.log("results");
	          console.log(results);

	          for (var i = 0;i<results.length;i++) {
	          	var str= results[i]._source.tender_content;
	          	 var reg = new RegExp("[\\u4E00-\\u9FFF]+$","g");
	          	console.log("content正则");
	          	console.log(reg.test(results[i]._source.tender_content));
	          	if(reg.test(results[i]._source.tender_content)){
	          		str=str.match(/[\u4E00-\uFA29](\S*)/)[0];
	          		results[i]._source.tender_content = str;
	          	}else{
	          		results[i]._source.tender_content = str;
	          	}
	         }
	          this.total = response.data.data.total;
	          this.currentTotal = this.total;

	          var i=0;
	          var productNamesArr = []; 
	          var tags = [];
	          var productNamesStr = '';        
	          var highlightTitle = true;
	          var highlightContent = true;
	          for (i;i<results.length;i++) {
	            productNamesStr = results[i]._source.tender_product_name;

	            if(productNamesStr!='') {
	              if(productNamesStr==null) {
	                productNamesArr=[]
	              } else {
	                productNamesArr = productNamesStr.split(",");
	              }
	            }else {
	              productNamesArr=[]
	            }

	            var tags = results[i]._source.tender_tags;
	            if(tags != null&& tags!='') {
	              tags = results[i]._source.tender_tags.split(",");
	              tags.pop();
	            } else {
	              tags=[];
	            }
	            
	            results[i].productNamesArr=productNamesArr;
	            results[i].tagsArr=tags;

	            if(!( "highlight" in results[i])) {
	              highlightTitle = false;
	              highlightContent = false;

	              var highlight = {};
	              highlight.tender_title ='';
	              highlight.tender_content ='';
	              results[i].highlight = highlight;
	            } else { 
	              var tenderContent = results[i].highlight.tender_content; 
	              tenderContent = tenderContent.join(" ");
	              results[i].highlight.tender_content = tenderContent;

	              if(!("tender_title" in results[i].highlight)) {
	                highlightTitle = false;
	              } 
	              if(!("tender_content" in results[i].highlight)){
	                highlightContent = false;
	              }
	            }

	            results[i].highlightTitle = highlightTitle;
	            results[i].highlightContent = highlightContent;            
	          }

	          this.results = results;

	          if(this.searchHotPage == false) {
	            document.documentElement.scrollTop = -100;  
	          } else {
	            document.documentElement.scrollTop = 440; 
	          }


	          $('#loading').hide(0);
	          
	        }.bind(this))
	        .catch(function(err){
	          // alert("失败");
	          console.log(err)
	        }.bind(this))
	      },
	      //关注
	      focus:function(){

	      },
	      //搜索招标公告
	      searchPubBid:function(pubBid){
	      	var pubBids=pubBid.replace("#","");
	      	console.log(pubBid);
	      	console.log(pubBids);
	      	this.form.keyword=pubBids;

	      	this.search(0);
	      },

	      toPointer : function ($event) {
	         $event.target.classList.add("over-pointer");
	      },
	        getNowDate : function (date) {
	        var date = date;
	        var seperator1 = "-";
	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        var strDate = date.getDate();
	        if (month >= 1 && month <= 9) {
	            month = "0" + month;
	        }
	        if (strDate >= 0 && strDate <= 9) {
	            strDate = "0" + strDate;
	        }
	        var currentdate = year + seperator1 + month + seperator1 + strDate;
	        return currentdate;
	      },
	     //公告跳转、浏览记录
	     browseRecord:function(id){
	     	// console.log(result._source.tender_id);
	     	console.log("发出id");
	     	console.log(id);
	     	let routeData = this.$router.resolve({
			   path: "/announce",
			   // query: params,
			   query:{token:this.token,id:id}
			});
			window.open(routeData.href, '_blank');
	     	  this.$ajax({
	          method: 'post',
	          url: 'https://recruitment.cqcyit.com:8090/userservice/browse/save',
	          dataType: 'json',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : this.token
	          },
	          data:{
	          		announcementid:id,
	          }
	        }).then(function(data){
	        }.bind(this))
	        .catch(function(err){
	          // alert("失败");
	          console.log(err)
	        }.bind(this))
	        console.log("页面跳转时的页码");
	        console.log(self.currentPage);
	        // this.search(0);
	     },

	  

		}
	}
</script>