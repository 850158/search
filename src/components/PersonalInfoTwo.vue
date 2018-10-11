<!-- 用户动态页面 -->
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
     <b-container>
          <div class="content">
            <b-row class="person-model w-100">
                <div style="height:50%; background-color:#e64035" class="w-100"></div>
                <div class="person-info">
                   <b-img
                   :src=person.profile
                   rounded="circle"
                   title="头像" 
                   class="m-1 profile-img" />
                   <span class="person-name">{{person.name}}</span>
                   <div class="person-button" 
                   @click="toPersonalUpdate">编辑个人资料</div>
                </div>
            </b-row>
            <b-row class="list-select w-100 text-center">
              <b-row class="selects w-100">
                <b-col md="2">
                  <span class="my-fcous"
                        :class="{'select-list':seenFcous}" 
                        @click="selectMyFcous">
                  我的关注</span>
                </b-col>
                <b-col md="2">
                  <span class="my-see"
                  :class="{'select-list':seenSee}" 
                  @click="selectMySee">
                我浏览的</span>
                </b-col>
                <b-col md="2">
                  <span class="my-mes"
                  :class="{'select-list':seenMes}"
                   @click="selectMyMes"
                  >
                我的消息</span>
                </b-col>
              </b-row>
              <b-row class="focus-list w-100" v-show="seenFcous" >
                <b-col md="2"
                      v-for="(focusItem,index) of focusList"
                      >
                  <span 
                    class="pointer focusItem"
                    :class="{'focus-select':index==0}"
                    @click="selectFcous(focusItem.id,index)"
                    style="display: inline-block;padding-bottom: 10px;">
                   {{focusItem.title}}
                 </span>
                </b-col>
              </b-row>
            </b-row>
            <b-row  
            v-show="seenFcous"
            class="w-100" style="margin:0px auto" >
            <b-row 
                class="tender-main"
                v-show="!isNull"
                v-for="conentItem of conentList">
                <b-row class="focus-conent w-100">
                  <span  class="conent-type text-left"><span>{{conentItem.type}}</span>
                  </span>
                  <span class="conent-list" 
                    v-for="typeItem of conentItem.tagArry">
                    <span class="pointer"
                     @click="searchTypeItem(typeItem)">#{{typeItem}}</span>
                  </span>
                </b-row>
                <b-row class="conent-title w-100 text-left">
                  <a  target="_blank" @click="toLive(conentItem.id)">{{conentItem.title}}</a>
                  <span class="conent-date">{{conentItem.issueTime}}</span>
                </b-row>
                 <b-row class="conent-biref text-left">
                      <a  target="_blank">
                        <p v-html="conentItem.content" 
                        @click="toLive(conentItem.id)">
                        </p>
                      </a>
                </b-row>
                <b-row class="conent-bottom w-100">
                  <b-col>
                    <img
                      @click="changFocus(conentItem.id)"
                      v-show="true"
                      id="likeImg"
                      src="../assets/images/favorite.png" 
                      class="float-left like-img" >
                    <span class="float-left like-num">{{conentItem.attentionCount}}</span>
                  </b-col>
                  <b-col>
                    <span class="weibo float-right">
                         <img height="25px" width="25px"
                      src="../assets/images/browseCount.png">
                       <span class="float-right view-num">
                          {{conentItem.browseCount}}
                        </span>
                    </span>
                  </b-col>
                </b-row>
              </b-row>
              <div class="text-center w-100">
               <el-pagination 
                  v-show="!isNull && !isNullType"
                  :small="true" 
                  background
                  :page-size="focusPage.pageSize"
                  @current-change="handFocusPage"
                  :current-page.sync="focusPage.currentPage"
                  :current-page="focusPage.currentPage"
                  :total="focusPage.totalCount"
                  layout="prev, pager, next" 
                  >
                </el-pagination>
              </div>
              <b-row v-show="isNullType" class="no-data  w-100" >
                <div class="text-center  w-100">
                  <img src="../assets/images/no-data.png"/>
                </div>
                  <p class="no-data-text text-center w-100">你还没有关注的类型...</p>
              </b-row>
              <b-row v-show="isNull" class="no-data w-100" >
                <div class="text-center w-100">
                  <img src="../assets/images/no-data.png"/>
                </div>
                  <p class="no-data-text text-center w-100">类型中空空如也...</p>
              </b-row>
            </b-row>
             <b-row  
                v-show="seenSee"
                class="w-100" style="margin:0px auto" >
             <b-row 
                class="tender-main w-100" 
                v-for="conentItem of linkList"
                :key="conentItem.id">
                <b-row class="conent-title w-100 text-left">
                  <a 
                  @click="toLive(conentItem.id)"
                  target="_blank">{{conentItem.title}}</a>
                  <span class="conent-date">{{conentItem.time}}</span>
                </b-row>
                 
                 <b-row class="conent-biref text-left">
                        <a  target="_blank">
                           <p 
                           v-html="conentItem.content"
                           @click="toLive(conentItem.id)"></p>
                        </a>
                </b-row>
            </b-row>
            <b-row v-show="isNoLink" class="no-data  w-100" >
                    <div class="text-center w-100">
                      <img src="../assets/images/no-data.png"/>
                    </div>
                      <p class="no-data-text text-center w-100">你还没有浏览记录...</p>
            </b-row>
          </b-row>
          <b-row  
                v-show="seenMes"
                class="w-100" style="margin:0px auto" >
              <b-row class="mes-coent w-100 text-left" v-for="mes of mesList" 
              v-show="!isNoMsg">
                  <span v-show="mes.state==0" class="noTip"></span>
                  <span   class="dataText" v-text="showDate(mes.time)"></span>
                  <span  class="tender-conent">
                    {{mes.title}}</span>
                  <span  class="query" @click="querryMes(mes.id,mes.state)">查看</span>
                  
              </b-row>
              <div  class="text-center w-100"  v-show="!isNoMsg">
                <el-pagination 
                  :small="true" 
                  background
                  :page-size="mesPage.pageSize"
                  layout="prev, pager, next"
                  @current-change="handCurrentPage"
                  :current-page.sync="mesPage.currentPage"
                  :current-page="mesPage.currentPage"
                  :total="mesPage.totalCount">
                </el-pagination>
              </div>
            <b-row v-show="isNoMsg" class="no-data  w-100" >
                    <div class="text-center w-100">
                      <img src="../assets/images/no-data.png"/>
                    </div>
                      <p class="no-data-text text-center w-100">没有消息，再等等...</p>
            </b-row>
          </b-row>
          </div>
     </b-container>
     <b-modal
        id="tipModal" 
        header-bg-variant="danger"
        header-text-variant="light"
        no-close-on-esc
        no-close-on-backdrop
        body-class="text-center"
        v-model="showTipModal"
     >
      <div slot="modal-header" class="w-100">
         <span class="float-left">取消关注</span>
         <span class="float-right pointer">
          <img src="../assets/images/esc.png" class="esc-img" 
              @click="showTipModal=false">
         </span>
      </div>
      <div class="d-block text-center">
        <h4>你已经成功取消关注</h4>
      </div>
       <div slot="modal-footer" class="w-100 text-center">
         <b-btn size="md" type="submit" @click="showTipModal=false"
          variant="danger">好的
         </b-btn>
      </div>
     </b-modal>
	</div>
</template>
<style scoped>
  @import '../assets/css/search.css';
.content{
   margin-left: 0px;
   margin-right: 0px;
}
.person-model{
  height: 160px;
  margin: 20px 0px 20px 0px;
  border:1px solid #DADADA;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #DADADA;
  position: relative;
}
.person-info{
  height: 50%;
  width: 100%;
  text-align: left;
}
.profile-img{
  width: 100px;
  height: 100px;
  left:20px;
  top:30px;
  position: absolute;
}
.person-name{
  left:140px;
  margin-top:20px;
  font-size: 1.1em;
  font-weight: bold;
  position: absolute;
}
.person-button{
  margin-top:20px;
  right: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  width:150px;
  font-size: 15px;
  background-color: #DEDEDE;
  position: absolute;
  border:1px solid #CDC5BF;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.list-select{
  border:1px solid #DADADA;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #DADADA;
}
.selects{
  height: 40%;
  font-weight: bold;
  font-size: 1.1em;
  margin: 10px auto;
  border-bottom:1px solid #DADADA; 
}
.my-fcous,.my-see,.my-mes{
   cursor: pointer;
   display: block;
   height: 36px;
   line-height: 36px;
}
.select-list{
  border-bottom: 3px solid #e64035;
}
.focus-list{
  padding-bottom:5px;
  font-weight: bold;
  font-size: 1.1em;
  margin: 5px auto;
}
.focus-select{
  color:#e64035;
}
.tender-main{
  border:1px solid #DADADA;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #DADADA;
}
.focus-conent{
  margin-top: 5px;
}
.no-data{
  width: 890px;
  border:1px solid #DADADA;
  margin: 10px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #DADADA;
  text-align: center!important;
}
.no-data-text{
 display: block;
 font-size: 1.5em;
 color:#e64035;
 font-weight: bold;
}
.pointer{
  cursor:pointer; 
}
.conent-type{
  margin: 0px 25px;
}
.conent-list{
   color:#e64035;
   padding-left: 15px;
}
.conent-title{
  margin: 10px 0px 10px 25px;
  font-size: 1.3em;
  /*width:1050px;*/
  font-weight: bold;
}
.weibo,.weixin{
  margin-right: 20px;
}
.conent-title a{
  color:#e64035;
}
.conent-date{
  padding-top: 5px;
  padding-left: 30px;
  color:#e64035;
  font-size: 14px;
}
.conent-biref{
  margin: 0px 5px 10px 25px;
}
.conent-biref p{
   font-size: 1em;
   width:1050px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
}
.conent-biref a{
  color: #616161;
  
}
.conent-bottom{
  margin: 15px;
}
.like-img{
  height: 25px;
  width: 25px;
  margin-right: 10px;
  cursor: pointer;
}
.like-num{
  color:#e64035;
}
.view-num{
  margin-left: 10px;
  font-weight: bold;
  color: #e64035;
  height: 25px;
  line-height: 25px;
}
.feedback{
  cursor: pointer;
}
.mes-coent{
  margin:10px auto 0px;
  line-height: 40px;
  height: 40px;
  border-bottom:2px solid #DADADA;
  position: relative;
}
.noTip{
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 5px;
  top:-5px;
  border-radius: 50%;
  background-color:#e64035;
}
.dataText{
  margin:0px 20px;
  width: 15%;
  color:#e64035;
  text-align: left;
}
.tender-conent{
  width: 65%;
  margin-right: 20px;
  color: #9B9B9B;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.query{
  width: 5%;
  cursor: pointer;
  color: #4A90E2;
  margin-right: 20px;
  text-align: right;
}
@media (min-width: 0px) and (max-width: 330px) {
  .content{
   margin-left: 0px;
   margin-right: 0px;
}
.profile-img{
  width: 60px;
  height: 60px;
  left: 1px;
  top: 45px;
}
.person-button{
  margin-top: 5px;
  width: 100px;
  font-size: 12px;
  right: 5px;
}
.person-name{
  left: 80px;
  margin-top: 10px;
}
.tender-main{
   width: 100%;
}
.dataText{
  margin: 0px 5px;
  width: 85px;
}
.query{
  width: 30px;
  margin-right: 5px;
}
.tender-conent{
   width: 130px;
   margin-right: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.conent-biref p{
  width: 240px;
}
.focusItem{
  font-size: 0.8em;
}


}
@media (min-width: 330px) and (max-width: 500px) {
.content{
   margin-left: 0px;
   margin-right: 0px;
}
.profile-img{
  width: 60px;
  height: 60px;
  left: 1px;
  top: 45px;
}
.person-button{
  margin-top: 5px;
  width: 100px;
  font-size: 12px;
  right: 5px;
}
.person-name{
  left: 80px;
  margin-top: 10px;
}
.tender-main{
   width: 100%;
}
.dataText{
  margin: 0px 5px;
  width: 85px;
}
.query{
  width: 30px;
  margin-right: 5px;
}
.tender-conent{
   width: 150px;
   margin-right: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.conent-biref p{
  width: 280px;
}
.focusItem{
  font-size: 0.8em;
}
}
@media (min-width: 500px) and (max-width: 1200px) {
  .content{
   margin-left: 0px;
   margin-right: 0px;
}
.conent-biref p{
  width: 530px;
}
.focusItem{
  font-size: 0.8em;
}
}
</style>
<style>
  .el-pagination .el-pager .active {
    background-color: #e64035!important;
  }

  .el-pagination .el-pager :hover {
    color: #e64035!important;
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
		     role: null,
		     isSelect:false,
         msgNum:"",
         msgTip:{
           title: '我的最近消息',
           content: 'Popover Content'
         },
         person:{
            id:"",
            profile:"",
            name:null
         },
         focusList:[],
         conentList:[],
         linkList:[],
          mesList:[],
         seenFcous:true,
         seenSee:false,
         seenMes:false,
         isNull:false,
         isNullType:false,
         isNoLink:false,
         isNoMsg:false,
         showTipModal:false,
         fcousTotal:23,
         groupId:"",
         mesPage:{
            pageSize:10,
            totalCount:null,
            currentPage:1
         },
         focusPage:{
            pageSize:10,
            totalCount:null,
            currentPage:1
         },
         mgs:""
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
      var token = self.token;
      self.role = self.usermsg.role;
       /*获取用户信息*/
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
          var person = data.data.data
          self.person.id = person.id;
          self.person.name = person.name;
          self.person.profile = "https://recruitment.cqcyit.com:8090/users_management/getProfilePhoto/"+person.id;
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
      /*获取用户关注类型*/
      self.$ajax({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"POST",
        url:"https://recruitment.cqcyit.com:8090/userservice/group/queryGroups",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("获取类型失败！");
            console.log("失败原因："+data.data.reason);
          } else {
            var focusArray = data.data.data;
            self.focusList = focusArray;
            /*判断数据是否为空*/
            self.focusList.length==0?this.isNullType=true:this.isNullType=false;
            self.groupId = self.focusList[0].id;
               /*根据关注类型显示关注内容*/
             self.queryContent(1,self.groupId,token);
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
      /*获取用户的浏览记录*/
       self.$ajax({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"GET",
        url:"https://recruitment.cqcyit.com:8090/userservice/browse/recent",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("获取浏览失败！");
            console.log("失败原因："+data.data.reason);
          } else {
              var linkList = data.data.data;
              /*判断浏览记录是否为空*/
              linkList.length==0?this.isNoLink=true:this.isNoLink=false;
              for(var i=0;i<linkList.length;i++){
                linkList[i].time = linkList[i].time.split(" ")[0]; 
              }
              self.linkList = linkList;
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
      /*获取用户的消息记录*/
      this.getMsg(1,token);
      /*查看未读消息数据*/
      this.queryNoRead();
    },
		methods:{
			 toSearchSubmit: function(evt) {
        	evt.preventDefault();
        	this.toSearch(this.form.keyword)
     	 },

     	 toSearch: function() {
        	this.$router.push({name:'home1',params:{token:this.token,keyword: this.form.keyword}})
      	},

	      toHome: function() {
	        this.$router.push({name:'home1',params:{token:this.token}})
	      },

      toAdmin: function() {
        this.$router.push({name:'admin',params:{token:this.token}})
      },
      toPersonalUpdate:function(){
        this.$router.push({ name:'personalUpdate',params:{token:this.token}})
      },
      /*跳转到生命周期页面并且存储浏览记录*/
      toLive:function(id){
        let routeData = this.$router.resolve({
           path: "/announce",
           // query: params,
           query:{token:this.token,id:id}
        });
        window.open(routeData.href, '_blank');
        var token =this.token;
        this.$ajax({
         headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"POST",
        data:{
          announcementid:id,
        },
        url:"https://recruitment.cqcyit.com:8090/userservice/browse/save",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("取消收藏失败！");
            console.log("失败原因："+data.data.reason);
          } else {
            console.log(data);
            }
        }.bind(this))
          .catch(function(err){
          console.log("err:"+err)
        }.bind(this));
      },
      changecolorf: function() {
        document.getElementById("ccf").style.color = "red";
        document.getElementById("cch").style.color = "gray";
        document.getElementById("imgccf").style.display = "";
        document.getElementById("imgcch").style.display = "";

        $("#imgccf1").hide();
        $("#imgcch1").hide();
      },
      changecolorh: function() {
        document.getElementById("cch").style.color = "red";
        document.getElementById("ccf").style.color = "gray";
        document.getElementById("imgcch1").style.display = "";
        document.getElementById("imgccf1").style.display = "";
        $("#imgcch").hide();
        $("#imgccf").hide();

        var _this = this;
        var token = _this.token;
        this.$ajax({
            method: 'get',
            url: 'https://recruitment.cqcyit.com:8090/userservice/browse/recent',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            },
        }).then(function(response) {
            var siteArry = response.data.data;
            this.$data.sites = siteArry;
          }.bind(this))
          .catch(function(err) {
            console.log("没有你浏览的信息");
          }.bind(this))
      },
      /*选择消息页码*/
      handCurrentPage:function(val){
        //将字符串解析的数字
        var currentPage = parseInt(`${val}`);
        this.mesPage.currentPage=currentPage;
       
        this.getMsg(currentPage,this.token);
      },
      handSelect:function(){
        this.isSelect = !this.isSelect;
      },
      /*选择关注的页码*/
      handFocusPage:function(val){
        //将字符串解析的数字
        var currentPage = parseInt(`${val}`);
        this.queryContent(currentPage,this.groupId,this.token);
      },
      /*切换关注与取消关注*/
      changFocus:function(key){
        var token = this.token
        var groupId = this.groupId;
       this.$ajax({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"POST",
        data:{
          groupId:groupId,
          announcementId:key
        },
        url:"https://recruitment.cqcyit.com:8090/userservice/favorite/cancelFavorite",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("取消收藏失败！");
            console.log("失败原因："+data.data.reason);
          } else {
             this.showTipModal =true;
            this.queryContent(1,groupId,token);
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
      },
      /*切换到我的关注*/
      selectMyFcous:function(){
        this.seenFcous=true;
        this.seenSee=false;
        this.seenMes=false;
      },
       /*切换到我的收藏*/
      selectMySee:function(){
         this.seenFcous=false;
          this.seenSee=true;
          this.seenMes=false;
      },
      /*切换到我的消息*/
      selectMyMes:function(){
          this.seenFcous=false;
          this.seenSee=false;
          this.seenMes=true;
      },
      /*搜索内容*/
      searchTypeItem:function(typeItem){
        this.form.keyword = typeItem;
        this.$router.push({name:'home1',params:{token:this.token,keyword: this.form.keyword}})
      },
      /*根据关注类型显示关注内容*/
      selectFcous:function(conent,index){
        /*实现单击效果*/
        var focusItem = document.getElementsByClassName("focusItem");
        for(var i=0;i<focusItem.length;i++){
          if(i==index){
             /*1.选中的添加 效果*/
             focusItem[i].classList.add("focus-select");
          }else{
             /*2.其他的清除效果*/
             focusItem[i].classList.remove("focus-select");
          }
        }
        this.groupId = conent;
        this.queryContent(1,this.groupId,this.token);
        this.focusPage.currentPage=1;
      },
      querryMes:function(id,state){
        var token = this.token;
        if(state==0){
          this.$ajax({
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
              },
            method:"POST",
            data:{
              id:id
            },
            url:"https://recruitment.cqcyit.com:8090/userservice/feedback/updateNotify",
            dataType: 'json'
            }).then(function(data){
              if(data.data.state == "error") {
                console.log("修改消息失败！");
                console.log("失败原因："+data.data.error);
              } else {
                  this.queryNoRead();
                }
          }.bind(this))
            .catch(function(err){
            console.log("err:"+err)
          }.bind(this));
        }
      },
      /*发送我的消息请求*/
      getMsg:function(currentPage,token){
        this.$ajax({
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
        method:"POST",
        data:{
          page:currentPage,
          num:this.mesPage.pageSize
        },
        url:"https://recruitment.cqcyit.com:8090/userservice/feedback/seacrhNotify",
        dataType: 'json'
        }).then(function(data){
          if(data.data.state == "error") {
            console.log("获取类型失败！");
            console.log("失败原因："+data.data.error);
          } else {
              var msgData = data.data.data;
              this.mesList = msgData.content;
              /*判断消息是否为空*/
              msgData.content.length==0?this.isNoMsg=true:this.isNoMsg=false; 
              this.mesPage.totalCount = msgData.totalElements;
            }
      }.bind(this))
        .catch(function(err){
        console.log("err:"+err)
      }.bind(this));
      },
        /*获取关注信息*/
      queryContent:function(currentPage,groupId,token){
        this.$ajax({
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : token
            },
          method:"POST",
          url:"https://recruitment.cqcyit.com:8090/userservice/favorite/searchFavorite",
          data:{
            elements:this.focusPage.pageSize,
            pageNumber:currentPage,
            groupId:groupId
          },
          dataType: 'json'
          }).then(function(data){
            if(data.data.state == "erroruserservice") {
              console.log("获取类型失败！");
              console.log("失败原因："+data.data.reason);
              this.isNull=true;
            } else {
              var data = data.data.data;
              /*设置总条数，TODO*/
              this.focusPage.totalCount = data.totalElements;
               this.conentList = data.content.data;
               var contentList = this.conentList;
               for(var i=0;i<contentList.length;i++){
                  var tenderTags = contentList[i].tenderTags;
                  var tagArry = [];
                  //判断标签是否为空
                  if(tenderTags==null || tenderTags.length==0){
                    tagArry=null;
                  }else{
                    tagArry = tenderTags.substr(0,tenderTags.length-1).split(",");
                  }
                  contentList[i].tagArry= tagArry;
               }
                this.isNull=false;
              }
        }.bind(this))
          .catch(function(err){
          console.log("err:"+err)
        }.bind(this));
        },
      /*查看未读消息的数量*/
      queryNoRead:function(){
        var token = this.token;
        var  noReadNum;
         this.$ajax({
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
              },
            method:"POST",
            url:"https://recruitment.cqcyit.com:8090/userservice/feedback/getNotifyNum",
            dataType: 'json'
            }).then(function(data){
              if(data.data.state == "error") {
                console.log("修改消息失败！");
                console.log("失败原因："+data.data.error);
              } else {
                  noReadNum = data.data.notifyNum;
                  this.msgNum=noReadNum;
                }
          }.bind(this))
            .catch(function(err){
            console.log("err:"+err)
          }.bind(this));
      }

		},
    /*时间展示*/
   computed:{
      showDate(date){
        return function(date){
          var dataConent;
          var currentDate = new Date();
          var getDate = new Date(date);
          //计算时差
          var diff = currentDate.valueOf()-getDate.valueOf();
          //转换成天数
          var diff_day = parseInt(diff/(1000*60*60*24));
          //根据时间长短显示内容
          if(diff_day==0){
            dataConent="今天";
          }else if(diff_day==1){
            dataConent="昨天";
          }else if(diff_day==2){
             dataConent="前天";
          }else if(diff_day>2 && diff_day<7){
            dataConent="三天前";
          }else if(diff_day>6 && diff_day<13){
            dataConent="一周前";
          }else{
            dataConent=date;
          }
          
          return dataConent;
        }
      }
   },
	 mounted:function(){
	    this.$nextTick(function () {
         $(".pointer").mouseover(function(event) {
        $(this).css("cursor","pointer");
      });
	})
	}
}
</script>