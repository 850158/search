<template>
  <div class="web-wrap">
    <Headermodal v-bind:role="role"></Headermodal>

    <div class="container">
  
      <!-- <b-row class="list-select w-100 text-center">

      <b-row class="selects w-100">
        <b-col md="2">
          <span class="my-Area"
          :class="{'select-list':seenArea}" 
          @click="selectMyArea"
          @mouseover="toPointer($event)" >
        地区</span>
        </b-col>
        <b-col md="2">
          <span class="my-Customer"
            :class="{'select-list':seenCustomer}" 
            @click="selectMyCustomer"
            @mouseover="toPointer($event)" >
          客户</span>
        </b-col>
      </b-row>
    </b-row> -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">我的推荐</el-breadcrumb-item>
      <el-breadcrumb-item >地区</el-breadcrumb-item>
      
    </el-breadcrumb>

    <el-tabs :tab-position="top" style="height: px;">
      <el-tab-pane label="地区"><p class="recommend-tab">地区</p></el-tab-pane>
      <el-tab-pane label="客户"><p >客户</p></el-tab-pane>
    </el-tabs>

      <div class="areaRecommend text-left" v-for="areaRecommend in areaRecommends" v-if="seenArea==true">
        <div class="areaRecommendFrom  ">
          <div class="thismargin" style="padding-top: 10px;">来自
            <span>{{areaRecommend._source.tender_area}}</span>
          </div>
        </div>

        <div class="areaRecommendTitle thismargin">
           <h5   @mouseover="toPointer($event)"  class="text-left pointer" style="margin-left:6px;color:#e64035;margin-bottom: 20px ">
                  <a class="showtwo" target="_blank" style="color:#e64035;width: auto;" >{{areaRecommend._source.tender_title}}</a><span class="issue-time" style="margin-right:20px;margin-top: 8px; margin-left: 10px; font-size:14px;float: right;">{{areaRecommend._source.tender_issue_time}}</span>
            </h5>
        </div>

      </div>

      <div v-if="seenCustomer==true">
        <div class="myCustomerRecommend text-left">
          <div style="display:inline-block;">
            <span class="tab-title red inline-b-span ">请选择客户：</span>
            <b-form-select v-model="myCustomerSelected" :options="myCustomer" id="pub-select" class="tab-select  info-select pointer " style="height:23px;padding-left: 4px;" />
          </div>
        </div>

        <div class="customerRecommend text-left" v-for="customerRecommend in customerRecommends" >
          <div class="customerRecommendFrom thismargin">
             <div style="padding-top: 10px; ">来自
              <span >{{customerRecommend._source.tender_customer}}</span>
            </div>
          </div>

          <div class="customerRecommendTitle thismargin">
            <h5   @mouseover="toPointer($event)"  class="text-left pointer" style="margin-left:6px;color:#e64035;margin-bottom: 20px ">
                    <a class="showtwo" target="_blank" style="color:#e64035;width: auto;" >{{customerRecommend._source.tender_title}}</a><span class="issue-time" style="margin-right:20px;margin-top: 8px; margin-left: 10px; font-size:14px;float: right;">{{customerRecommend._source.tender_issue_time}}</span>
              </h5>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<style scope>
@import '../assets/css/search.css';
.list-select{
  border:1px solid #DADADA;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #DADADA;
}
.selects{
  height: 40%;
  font-weight: bold;
  font-size: 1.6em;
  margin: 10px auto;
  border-bottom:1px solid #DADADA; 
}
.my-Cuxtomer,.my-Area,{
   cursor: pointer;
   display: block;
   height: 36px;
   line-height: 36px;
}
.select-list{
  border-bottom: 3px solid #e64035;
}
.areaRecommend,.customerRecommend{
  margin-top: 14px;
    width:90% ;
    margin-left:5%;
    background-color: ;
    border-bottom: 1px solid #DADADA;
    border-left: 1px solid #DADADA;
    border-right: 1px solid #DADADA;
    box-shadow:0px 0px 1px 1px #DADADA ;

}
.container{
  margin-bottom: 20px;
}
.thismargin{
  margin-left: 10%;
  margin-top: 2%;
}
</style>
<script>
  import Headermodal from './headerTwo'
	export default{
		data:function(){
			return{
				seenCustomer:false,
				seenArea:true,
        areaRecommends:[{id:1,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:2,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:3,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:4,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:5,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:6,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:7,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},
        {id:8,_source:{tender_area:'重庆',tender_title:'剑川县沙溪镇人民政府办公设备采购项目',tender_issue_time:'2018-09-21'}},],
        customerRecommends:[{id:1,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:2,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:3,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:4,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:5,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:6,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:7,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:8,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},
        {id:9,_source:{tender_customer:'中国移动有限公司',tender_title:'2018年浙江康复中心室内分布系统施工项目',tender_issue_time:'2018-09-18'}},],
        myCustomerSelected: null,
        myCustomer: [
              { value: null, text: '客户类型' },
              { value: '中国移动', text: '中国移动' },
              { value: '中国电信', text: '中国电信' },
              { value: '中国联通', text: '中国联通' },
              { value: '中国铁塔', text: '中国铁塔' },
            ],
			}
		},
		created:function(){
      var self = this;
      self.usermsg = window.localStorage.getItem('usermsg');
      var usermsg = self.usermsg;
      var usermsg = eval("(" + usermsg + ")");
      self.usermsg = usermsg;
      self.token = self.usermsg.token;
      var token = self.token;
      self.role = self.usermsg.role;
      console.log(self.seenArea);
      console.log(self.seenCustomer);
    },
		mounted:function(){},
    components:{
        Headermodal
      },
		methods:{
			/*切换到客户*/
      		selectMyCustomer:function(){
        	this.seenCustomer=true;
        	this.seenArea=false;
        	// var groupId = this.focusList[0].id;
        	// this.selectCustomer(groupId,0);
      		},
       		/*切换到地区*/
      		selectMyArea:function(){
         	this.seenCustomer=false;
          this.seenArea=true;
      		},		
          toPointer : function ($event) {
           $event.target.classList.add("over-pointer");
        },	
		},
	}
 
</script>