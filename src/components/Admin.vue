
<template> 
  <div class="web-wrap">
    <!-- <div class="page-header text-left">
      <img src="../assets/images/logo.png" @click="toHome" class="logo pointer" />
      
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

      
      <img src="../assets/images/person.png" @click="toPersonal" class="logo per-ico pointer" style="float:right;">
      <b-button class="admin-btn pointer" v-show="role==1" @click="toAdmin">后台管理</b-button>
    </div> -->
    <HeaderModal v-bind:role="role"></HeaderModal>
    <b-container class="container">
      <b-card class="user-admin" no-body>
        <b-tabs style="width:100%" pills card v-model="tabIndex">
          <b-tab style="width:100%" title="用户管理" active :title-link-class="linkClass(0)">
            <div class="user-admin-form text-left">

              <div class="text-left user-admin-two">
                <b-form @submit="searchUser">
                  <div class="search-user user-admin-three">
                    
                    <div class="search-item-wrap">
                      <b-form-input v-model="nameone"
                                    type="text"
                                    placeholder="姓名"
                                    class="keyword-in money-in time-one-in tag nameone-select"
                                    id="name">
                      </b-form-input>
                    </div>

                    <div class="search-item-wrap">
                      <b-form-input v-model="emailone"
                                    placeholder="邮箱"
                                    class="keyword-in money-in time-one-in tag emailone-select"
                                    id="email"
                                    @blur="select('emailone')">
                      </b-form-input>
                    </div>

                    <div class="search-item-wrap">
                      <b-form-select v-model="placeone" :options="placeResults" class="tab-select info-select placeone-select" style="height:24px;padding-left: 4px;" @change="select('placeone')"/>
                    </div>

                    <div class="search-item-wrap">
                      <b-form-select v-model="typeone" :options="typeResults" class="tab-select info-select type-select typeone-select" style="height:24px;padding-left: 4px;" @change="select('typeone')"/>
                    </div>

                    <div class="search-item-wrap">
                      <b-form-select v-model="stateone" :options="stateResults" class="tab-select info-select state-select state-select-one" style="height:24px;padding-left: 4px;" @change="select('state')"/>     
                    </div>   
                  </div>

                  <div class="user-admin-btn">
                    <b-button class="search-user-btn" type="submit">查询用户</b-button>
                  </div>
                </b-form>           
              </div>
            </div>

            <div class="user-admin-form text-left">
              <div class="text-left user-admin-two">
              <b-form>
              <div class="search-user user-admin-three">
                <div class="search-item-wrap">              
                  <b-form-input v-model="nametwo"
                                type="text"
                                placeholder="姓名"
                                class="keyword-in money-in time-one-in tag"
                                id="name-two"
                                >
                  </b-form-input>
                  <div class="nametwo-err">
                    <span>中文、字母2-20位</span>
                  </div> 
                </div>

                <div class="search-item-wrap">
                  <b-form-input v-model="emailtwo"
                                type="text"
                                placeholder="邮箱"
                                class="keyword-in money-in time-one-in tag" 
                                id="email-two">
                  </b-form-input>
                  <div class="emailtwo-err">
                    <span>请输入正确的邮箱</span>
                  </div>
                </div>

                <div class="search-item-wrap">
                  <b-form-input v-model="telephone"
                                type="text"
                                placeholder="手机号"
                                required
                                class="keyword-in money-in time-one-in tag "
                                id="telephone">
                  </b-form-input>
                  <div class="tel-err">
                    <span>请输入正确的手机号</span>
                  </div>
                </div>

                <div class="search-item-wrap">
                  <b-form-input v-model="pwd"
                                type="password"
                                placeholder="密码"
                                required
                                class="keyword-in money-in time-one-in tag "
                                id="pwd">
                  </b-form-input>
                  <div class="pwd-err">
                    <span>密码6-14位，必须包含大写字母、小写字母、数字</span>
                  </div>
                </div>

                <div class="search-item-wrap">
                  <b-form-input v-model="confirmPwd"
                                type="password"
                                placeholder="确认密码"
                                required
                                class="keyword-in money-in time-one-in tag confirm-pwd"
                                id="confirm-pwd">
                  </b-form-input>
                  <div class="confirm-pwd-err">
                    <span>密码6-14位，必须包含大写字母、小写字母、数字</span>
                  </div>
                  <div class="pwd-differ-err">
                    <span>前后密码不一致</span>
                  </div>
                </div>

                  <!-- <b-form-select v-model="placetwo" :options="placeTwoResults" class="tab-select info-select place-select placetwo-select" style="height:24px;padding-left: 4px;" @change="select('place')"/>

                  <b-form-select v-model="typetwo" :options="typeTwoResults" class="tab-select info-select type-select typetwo-select" style="height:24px;padding-left: 4px;" @change="select('type')"/>  -->      
                </div>

                <div class="user-admin-btn">
                  <b-button class="add-user-btn" type="button" @click="addUser">添加用户</b-button>
                </div>
              </b-form>
              </div>   
            </div>

            <b-table style="margin-top:10px;" show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             >

              <template slot="name" slot-scope="row">{{row.value}}</template>
              <template slot="telephone" slot-scope="row">{{row.value}}</template>
              <template slot="email" slot-scope="row">{{row.value}}</template>
              <template slot="area" slot-scope="row">{{row.value}}</template>
              <template slot="type" slot-scope="row">{{row.value}}</template>
              <template slot="state" slot-scope="row">{{row.value}}</template>
              <template slot="actions" slot-scope="row">


                <b-button v-show="row.value==0" size="sm" @click.stop="changeState(row.item, row.index, $event.target,url)" class="mr-1 start">
                  启用
                </b-button>
                <b-button v-show="row.value==1" size="sm" @click.stop="changeState(row.item, row.index, $event.target,url)" class="mr-1">
                  禁用
                </b-button>
                <b-button variant="primary" size="sm" @click.stop="deleteUser(row.item)">
                  删除
                </b-button>
              </template>
            </b-table>

            <b-row>
              <b-col offset-lg="4" offset-md="4" offset-sm="0" class="col-lg-4 col-md-4 col-sm-4 pagination">
                <el-pagination class="user-pag-sm" :small="true" v-if="total!=0" @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
                </el-pagination>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="反馈信息" :title-link-class="linkClass(1)"  @click="loadALLProblemInfomation">
            <div>
              <b-form-select v-model="problemTypeSelected" :options="problemTypeResults" id="result-select" class="tab-select info-select problemType-select" style="height:24px;padding-left: 4px;" @change="select('problemType')"/>

                  <b-button class="search-problemType-btn" type="button" @click="selectProblemInfomation">搜索反馈信息</b-button>
            </div>
            <b-table style="margin-top:10px;" show-empty
             stacked="md"
             :items="updateitems"
             :fields="updatefields">
              <template slot="title" slot-scope="row"><a v-bind:href="row.value.url" target="_blank" style="color:#8E8E8E">{{row.value.title}}</a></template>
              <template slot="type" slot-scope="row">{{row.value}}</template>
              <template slot="describes" slot-scope="row">{{row.value}}</template>
              <template slot="actions" slot-scope="row">
               <b-button  variant="primary" size="sm" >
                  修改
                </b-button>
              </template>
            </b-table>
            <b-row>
              <b-col offset-md="5" offset-sm="4" class="col-md-2 col-sm-1 pagination">
                <el-pagination class="user-pag-sm" :small="true" :current-page.sync="typeCurrentPage" v-if="problemTotal!=0" @current-change="problemHandleCurrentChange" background layout="prev, pager, next" :total="problemTotal">
                </el-pagination>
              </b-col>
            </b-row>
          </b-tab>


          <!-- <b-tab title="微服务治理" :title-link-class="linkClass(2)">
          </b-tab> -->
        </b-tabs>
      </b-card>

      <b-modal id="addUserInfo" :title="addUserInfo.title" ok-only>
        <pre>{{ addUserInfo.content}}</pre>
      </b-modal>
    </b-container>
  </div>
</template>

<style scoped>
  @import '../assets/css/search.css'; 
  .inline {
    display:inline;
  }

  .text-other {
    color: red;
  }

  .user-admin-form {
    padding:8px 0 8px 12px;
    width:100%;
    border:1px dashed #DADADA;
  }

  .user-admin-two {
    width: 100%;
    display:inline-block;
  }

  .user-admin-three {
    display:inline-block;
    float:left;
    width:88%;
  }

  .money-in {
    display: inline;
    width:72%;
    height:23px;
    border:none; 
    border-radius: 5px;
  }

  .time-one-in {
    margin:0 28px 8px 0;
    padding: 0 4px;
    width: 140px;
    border:  1px solid #DADADA;
  }

  .confirm-pwd {
    margin-right: 0;
  }

  .tab-select,.search-user-btn,.add-user-btn {
    margin:0 28px 4px 0;
    position: relative;
    top: -1px;
    height: 23px;
    color: #8E8E8E;
  }

  .tab-select {
    vertical-align: top;
  }

  .state-select-one {
    margin-right: 0;
  }

  .uesr-admin-btn {
    display:inline-block;
    float:right; 
  }

  .search-user-btn,.add-user-btn,.search-problemType-btn{
    line-height: 23px;
    padding:0 6px;
    color:white;
    border:0;  
    font-size: 14px;
  }

  .search-user-btn,.search-problemType-btn{
    background-color: #e64035;    
  }

  .add-user-btn {
    background-color: #007bff;    
  }

  .start {
    background-color: #e64035;
    border: none; 
  }

  .search-item-wrap {
    display: inline-block;
    width: 166px;
  }

  .nametwo-err, .emailtwo-err, .tel-err, .pwd-err, .confirm-pwd-err,.pwd-differ-err {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px;
    color:  #e64035;
    height: 30px;
    visibility:hidden;
    display: none;
  }

  .in-block {
    display:inline-block;
  }

  .err-none {
    display: none;
  }

  .err-hide-sm {
    display: inline-block;
  }

  @media (min-width: 0) and (max-width: 880px) {
    .tab-select,.search-user-btn,.search-problemType-btn {
      margin:0 28px 8px 0;
    }
  }

  @media (min-width: 0) and (max-width: 500px) {
    .pagination {
      padding-left: 0;
    }

    .user-admin-btn {
      float: left;
    }
  }

</style>

<script type="text/javascript">
  import HeaderModal from './header'
  var utils = require("../../node_modules/js/utils.js");

  const items = [];
  //反馈静态信息
  const updateitems = []
  export default {
    data: function() {
      return {
        role:this.role,
        form : {
          keyword: ''
        },

        url: 'URL',

        total: 0,
        //反馈信息分页
        typeCurrentPage: 1,
        problemTotal:null,
        tabIndex: 0,

        currentPage: 1,

        emailtwoExistErr: null,

        telephoneExistErr:null,

        nameone:'',

        emailone:'',

        placeone: '',
        placeResults: [{value:'',text:'关注地区'},{value:'北京',text:'北京'},{value:'天津',text:'天津'},{value:'上海',text:'上海'},{value:'重庆',text:'重庆'},{value:'河北',text:'河北'},{value:'山西',text:'山西'},{value:'辽宁',text:'辽宁'},{value:'吉林',text:'吉林'},{value:'黑龙江',text:'黑龙江'},{value:'江苏',text:'江苏'},{value:'浙江',text:'浙江'},{value:'安徽',text:'安徽'},{value:'福建',text:'福建'},{value:'江西',text:'江西'},{value:'山东',text:'山东'},{value:'河南',text:'河南'},{value:'湖北',text:'湖北'},{value:'湖南',text:'湖南'},{value:'广东',text:'广东'},{value:'海南',text:'海南'},{value:'四川',text:'四川'},{value:'贵州',text:'贵州'},{value:'云南',text:'云南'},{value:'陕西',text:'陕西'},{value:'甘肃',text:'甘肃'},{value:'青海',text:'青海'},{value:'台湾',text:'台湾'},{value:'内蒙古',text:'内蒙古'},{value:'广西',text:'广西'},{value:'西藏',text:'西藏'},{value:'宁夏',text:'宁夏'},{value:'新疆',text:'新疆'},{value:'香港',text:'香港'},{value:'澳门',text:'澳门'}],

        placeTwoResults: [{value:'',text:'关注地区'},{value:'北京',text:'北京'},{value:'天津',text:'天津'},{value:'上海',text:'上海'},{value:'重庆',text:'重庆'},{value:'河北',text:'河北'},{value:'山西',text:'山西'},{value:'辽宁',text:'辽宁'},{value:'吉林',text:'吉林'},{value:'黑龙江',text:'黑龙江'},{value:'江苏',text:'江苏'},{value:'浙江',text:'浙江'},{value:'安徽',text:'安徽'},{value:'福建',text:'福建'},{value:'江西',text:'江西'},{value:'山东',text:'山东'},{value:'河南',text:'河南'},{value:'湖北',text:'湖北'},{value:'湖南',text:'湖南'},{value:'广东',text:'广东'},{value:'海南',text:'海南'},{value:'四川',text:'四川'},{value:'贵州',text:'贵州'},{value:'云南',text:'云南'},{value:'陕西',text:'陕西'},{value:'甘肃',text:'甘肃'},{value:'青海',text:'青海'},{value:'台湾',text:'台湾'},{value:'内蒙古',text:'内蒙古'},{value:'广西',text:'广西'},{value:'西藏',text:'西藏'},{value:'宁夏',text:'宁夏'},{value:'新疆',text:'新疆'},{value:'香港',text:'香港'},{value:'澳门',text:'澳门'}],

        typeone:"",

        typeResults: [
          {value:'',text:'关注类型'},
          ],

        typeTwoResults: [
          {value:'',text:'关注类型'},
          {value:'设计',text:'设计'},
          {value:'施工',text:'施工'},
          {value:'监理',text:'监理'},
          {value:'ICT系统集成',text:'ICT系统集成'},
          {value:'IDC',text:'IDC'},
          {value:'管线施工',text:'管线施工'},
          {value:'宽带建设',text:'宽带建设'},
          {value:'网络覆盖',text:'网络覆盖'},
          {value:'EPC',text:'EPC'},
          {value:'基站建设',text:'基站建设'},
          {value:'迁改',text:'迁改'},
          {value:'智慧项目',text:'智慧项目'},
          {value:'雪亮工程',text:'雪亮工程'},
          {value:'云产品',text:'云产品'},
          {value:'核心网',text:'核心网'},
          {value:'租赁',text:'租赁'},
          {value:'视频监控',text:'视频监控'},
          {value:'软件开发',text:'软件开发'},
          {value:'整改代维',text:'整改代维'},
          {value:'运营支撑',text:'运营支撑'},
          {value:'终端采购',text:'终端采购'}
          ],

        stateone: null,
        stateResults: [
          { value: null, text: '状态' },
          { value: '0', text: '禁用' },
          { value: '1', text: '启用' },
        ],
        //反馈信息类型
        problemTypeSelected:'',
        problemTypeResults:[
          {value: '', text: '问题类型' },
          { value: '标签问题', text: '标签问题' },
          { value: '数据问题', text: '数据问题' },
          { value: '分类问题', text: '分类问题' },
          { value: '其它问题', text: '其它问题' }
        ], 

        nametwo:'',

        emailtwo: '',

        telephone:'',

        placetwo:'',

        typetwo:'',

        pwd:'',

        confirmPwd:'',

        items: items,
        fields: [
          { key: 'name', label: '姓名',},
          { key: 'telephone', label: '手机号','class': 'text-center' },
          { key: 'email', label: '邮箱' },
          { key: 'area', label: '关注地区' },
          { key: 'type', label: '关注类型' },
          { key: 'state', label: '状态' },
          { key: 'actions', label: '操作' },
        ],

        //反馈信息表格
        updateitems:updateitems,
        updatefields:[
          {key:'title',label:'信息标题',},
          {key:'type',label:'问题类型'},
          {key:'describes',label:'问题描述'},
          {key:'actions',label:'操作'}
        ],

        nametwoErr : null,
        emailtwoErr : null,
        telephoneErr : null, 
        pwdErr : null, 
        confirmPwdErr : null,
        differErr : null,

        placetwoErr:null,
        typetwoErr:null,

        addUserInfo: {title: '提示',content:'添加用户成功！'},
      }
    },
    components:{
          HeaderModal
         },
    created:function() {
      var self = this;

      self.usermsg = window.localStorage.getItem('usermsg');

      var usermsg = self.usermsg;
      var usermsg = eval("(" + usermsg + ")");
      self.usermsg = usermsg;

      self.token = self.usermsg.token;
      var token = self.token;

      self.role = self.usermsg.role;

      this.$ajax({
        method: 'post',
        url: 'https://recruitment.cqcyit.com:8090/users_management/user/searchUsers',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : token
        },
        data: {
          userName: "",
          email: "",
          area: "",
          type: "",
          state: null,
          pageNumber: 1,
          elements: 21
        }
      }).then(function(data){
        self.currentPage = 1;

        self.total = data.data.data.totalElements;
        var items = data.data.data.content;

        for (var i=0;i<items.length;i++) {
          items[i].actions = items[i].state;
          if(items[i].state==0) {
            items[i].state='禁用'
          } else {
            items[i].state='启用'
          } 
        }
        self.items = items;
      }.bind(this))
      .catch(function(err){
        console.log("失败");
      }.bind(this))

      self.$ajax({
        method: 'get',
        url: 'https://recruitment.cqcyit.com:8090/cqcyit.userservice/tags/list',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : token
        }
      }).then(function(data){
        var areaStr = data.data.data;
        var areaArr = [{value:'',text:'关注类型'}]
        for(var i=0;i<areaStr.length;i++) {
          var areaObj = {}
          var areaObjTwo = {};

          areaObjTwo.id = areaStr[i].id;
          areaObjTwo.tag_name = areaStr[i].tagName;

          areaObj.value = areaObjTwo;
          areaObj.text = areaStr[i].tagName;
          areaArr.push(areaObj);
        }

        

        self.typeResults = areaArr;
      }.bind(this))
      .catch(function(err){
        console.log("失败");
      }.bind(this))
    },

    mounted:function() {
      var self = this;
 
      $('#name-two').on('blur', function() {     
        var nametwo = self.nametwo;
        var reg = /^[\u4e00-\u9fa5_a-zA-Z_]{2,20}$/;
        self.nametwoErr = utils.addErrShow(reg,nametwo,'nametwo');
        if((self.nametwoErr==true||self.nametwoErr==null)&&(self.emailtwoErr==true||self.emailtwoErr==null)&&(self.telephoneErr==true||self.telephoneErr==null)&&(self.pwdErr==true||self.pwdErr==null)==true&&(self.confirmPwdErr==true||self.confirmPwdErr==null)&&(self.differErr==true||self.differErr==null)) {
          utils.addErrHide();
        }
      })

      $('#email-two').on('blur', function() {     
        var emailtwo = self.emailtwo;
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        self.emailtwoErr = self.addEmailErrShow(reg,emailtwo,'emailtwo');
        $(".emailtwo-err").html("<span>请输入正确的邮箱</span>");

        if((self.nametwoErr==true||self.nametwoErr==null)&&(self.emailtwoErr==true||self.emailtwoErr==null)&&(self.telephoneErr==true||self.telephoneErr==null)&&(self.pwdErr==true||self.pwdErr==null)==true&&(self.confirmPwdErr==true||self.confirmPwdErr==null)&&(self.differErr==true||self.differErr==null)&&(self.differErr==true||self.differErr==null)) {
            utils.addErrHide();
        }
      })

      $('#telephone').blur(function() {
        var telephone = self.telephone;
        var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        self.telephoneErr = self.addTelephoneErrShow(reg,telephone,'tel');
        $(".tel-err").html("<span>请输入正确的手机号</span>");

        if((self.nametwoErr==true||self.nametwoErr==null)&&(self.emailtwoErr==true||self.emailtwoErr==null)&&(self.telephoneErr==true||self.telephoneErr==null)&&(self.pwdErr==true||self.pwdErr==null)==true&&(self.confirmPwdErr==true||self.confirmPwdErr==null)&&(self.differErr==true||self.differErr==null)) {
          utils.addErrHide();
        }             
      });
 
      $('#pwd').on('blur', function() {     
        var pwd = self.pwd;
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/;
        self.pwdErr = utils.addErrShow(reg,pwd,'pwd');

        if (self.pwdErr == true) {
          if(self.confirmPwdErr == true&&self.confirmPwd!=self.pwd&&self.confirmPwd!='') {
            self.differErr = false;

            $(".nametwo-err,.emailtwo-err,.tel-err,.pwd-err,.confirm-pwd-err,.pwd-differ-err").removeClass('err-none');

            $(".nametwo-err,.tel-err,.emailtwo-err,.pwd-err,.pwd-differ-err").addClass("err-hide-sm");

            $('.confirm-pwd-err').addClass('err-none');
            $('.confirm-pwd-err').removeClass('err-hide-sm');
            $(".pwd-differ-err").css("visibility","visible");
          } else {
            self.differErr = true;
            $(".pwd-differ-err").addClass('err-none');
          }
        } else {
          /*$(".nametwo-err,.emailtwo-err,.tel-err,.pwd-err,.confirm-pwd-err,.pwd-differ-err").removeClass('err-none');

          $(".nametwo-err,.tel-err,.emailtwo-err,.pwd-err,.pwd-differ-err").addClass("err-hide-sm");*/

          $(".nametwo-err,.emailtwo-err,.tel-err,.pwd-err,.confirm-pwd-err").removeClass('err-none');
          $('.pwd-differ-err').addClass('err-none');

          $(".nametwo-err,.tel-err,.emailtwo-err,.pwd-err,.pwd-differ-err").addClass("err-hide-sm");
          $('.pwd-differ-err').removeClass('err-hide-sm');

            $(".pwd-err").css("visibility","visible");
          if(self.confirmPwd!=self.pwd&&self.confirmPwd!='') {
            self.differErr = false;
          } else {
            self.differErr = true;
          }
        }

        if((self.nametwoErr==true||self.nametwoErr==null)&&(self.emailtwoErr==true||self.emailtwoErr==null)&&(self.telephoneErr==true||self.telephoneErr==null)&&(self.pwdErr==true||self.pwdErr==null)==true&&(self.confirmPwdErr==true||self.confirmPwdErr==null)&&(self.differErr==true||self.differErr==null)) {
          utils.addErrHide();
        }
      })

      $('#confirm-pwd').on('blur', function() {
        var confirmPwd = self.confirmPwd;
        var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,14}$/;
        self.confirmPwdErr = utils.addErrShow(reg,confirmPwd,'confirm-pwd');

        if (self.confirmPwdErr == true) {
          if(self.pwdErr==true&&self.confirmPwd!=self.pwd&&self.pwd!='') {
            self.differErr = false;

             $(".nametwo-err,.emailtwo-err,.tel-err,.pwd-err,.confirm-pwd-err,.pwd-differ-err").removeClass('err-none');

            $(".nametwo-err,.tel-err,.emailtwo-err,.pwd-err,.pwd-differ-err").addClass("err-hide-sm");
            $(".pwd-differ-err").css("visibility","visible");

            $(".confirm-pwd-err").removeClass('err-hide-sm');
            $(".confirm-pwd-err").addClass('err-none');
          } else {
            self.differErr = true;

            $(".pwd-differ-err").addClass('err-none');
          }
        } else {
          $(".pwd-differ-err").addClass('err-none');
          if(self.confirmPwd!=self.pwd&&self.pwd!='') {
            self.differErr = false;
          } else {
            self.differErr = true;
          }
        }

        if((self.nametwoErr==true||self.nametwoErr==null)&&(self.emailtwoErr==true||self.emailtwoErr==null)&&(self.telephoneErr==true||self.telephoneErr==null)&&(self.pwdErr==true||self.pwdErr==null)==true&&(self.confirmPwdErr==true||self.confirmPwdErr==null)&&(self.differErr==true||self.differErr==null)) {
          utils.addErrHide();
        }
      });

      $(".pointer").mouseover(function(event) {
        $(this).css("cursor","pointer");
      });
    },
    methods: {
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

      toPersonal : function() {
        this.$router.push({name: 'personal'});
      },

      addErrShow: function(reg,argv,className) {
        if(reg.test(argv)){
          $("."+className+"-err").css("visibility","hidden");

          if(this.emailtwoExistErr == false) {
            utils.addExistShow('emailtwo');
            $(".emailtwo-err").html("<span>邮箱已存在</span>");
          }

          if(this.telephoneExistErr == false) {
            utils.addExistShow('tel');
            $(".tel-err").html("<span>手机号已存在</span>");
          }

          return true;
        }else {
          $(".nametwo-err").removeClass('err-none');
          $(".emailtwo-err").removeClass('err-none');
          $(".tel-err").removeClass('err-none');
          $(".pwd-err").removeClass('err-none');
          $(".confirm-pwd-err").removeClass('err-none');
          $(".exist-err").removeClass('err-none');
          $(".email-exist-err").removeClass('err-none');

          $(".nametwo-err").addClass("err-hide-sm");
          $(".tel-err").addClass("err-hide-sm"); 
          $(".emailtwo-err").addClass("err-hide-sm"); 
          $(".pwd-err").addClass("err-hide-sm"); 
          $(".confirm-pwd-err").addClass("err-hide-sm"); 
          $(".exist-err").removeClass('err-hide-sm');
          $(".email-exist-err").removeClass('err-hide-sm');       

          $("."+className+"-err").css("visibility","visible");
          $("."+className+"-err").addClass("err-show-sm");
          return false;
        }
       },

      addEmailErrShow: function(reg,argv,className) {
        if(reg.test(argv)){
          $("."+className+"-err").css("visibility","hidden");
          this.$ajax({
              method: 'post',
              url: 'https://recruitment.cqcyit.com:8090/users_management/addDel/searchUserByEmail',
              dataType: 'json',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : this.token
              },
              data: {
                email: this.emailtwo,
              }
            }).then(function(data){
              if(data.data.would == 'false') {
                utils.addExistShow('emailtwo');
                $(".emailtwo-err").html("<span>邮箱已存在</span>");

                this.emailtwoExistErr = false;
                this.emailtwoErr = false; 
              } else {

                this.emailtwoExistErr = true;
              }
            }.bind(this))
            .catch(function(err){
              console.log("失败");
            }.bind(this))

          return true;
        }else {
          $(".nametwo-err").removeClass('err-none');
          $(".emailtwo-err").removeClass('err-none');
          $(".tel-err").removeClass('err-none');
          $(".pwd-err").removeClass('err-none');
          $(".confirm-pwd-err").removeClass('err-none');
          $(".exist-err").removeClass('err-none');
          $(".email-exist-err").removeClass('err-none');

          $(".nametwo-err").addClass("err-hide-sm");
          $(".tel-err").addClass("err-hide-sm"); 
          $(".emailtwo-err").addClass("err-hide-sm"); 
          $(".pwd-err").addClass("err-hide-sm"); 
          $(".confirm-pwd-err").addClass("err-hide-sm"); 
          $(".exist-err").removeClass('err-hide-sm');
          $(".email-exist-err").removeClass('err-hide-sm');       

          $("."+className+"-err").css("visibility","visible");
          $("."+className+"-err").addClass("err-show-sm");
          return false;
        }
       },

       addTelephoneErrShow: function(reg,argv,className) {
        if(reg.test(argv)){
          $("."+className+"-err").css("visibility","hidden");

          this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/users_management/addDel/searchUserByTelephone',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : this.token
            },
            data: {
              telephone: this.telephone,
            }
          }).then(function(data){
            if(data.data.would == 'false') {
              utils.addExistShow('tel');
              $(".tel-err").html("<span>手机号已存在</span>");

              this.telephoneExistErr = false;
              this.telephoneErr = false; 
            } else {

              this.telephoneExistErr = true;
            }
          }.bind(this))
          .catch(function(err){
            console.log("失败")
          }.bind(this))

          return true;
        }else {
          $(".nametwo-err").removeClass('err-none');
          $(".emailtwo-err").removeClass('err-none');
          $(".tel-err").removeClass('err-none');
          $(".pwd-err").removeClass('err-none');
          $(".confirm-pwd-err").removeClass('err-none');
          $(".exist-err").removeClass('err-none');
          $(".email-exist-err").removeClass('err-none');

          $(".nametwo-err").addClass("err-hide-sm");
          $(".tel-err").addClass("err-hide-sm"); 
          $(".emailtwo-err").addClass("err-hide-sm"); 
          $(".pwd-err").addClass("err-hide-sm"); 
          $(".confirm-pwd-err").addClass("err-hide-sm"); 
          $(".exist-err").removeClass('err-hide-sm');
          $(".email-exist-err").removeClass('err-hide-sm');       

          $("."+className+"-err").css("visibility","visible");
          $("."+className+"-err").addClass("err-show-sm");
          return false;
        }
       },



      select: function(item) {
        this.item= $("."+item+"two-select").val();

        if(this.item!='') {
          var item = item+'twoErr'
          this.item = true;
        }
      },

      getSelectArr: function(areaStr) {
        var areaArr = [{value:'',text:'关注地区'}]
        for(var i=0;i<areaStr.length;i++) {
          var areaObj = {}
          areaObj.value = areaStr[i];
          areaObj.text = areaStr[i];
          areaArr.push(areaObj);
        }

        return areaArr;
      },

      searchUser : function(evt) {
        evt.preventDefault();

        var from = 1;
        var token = this.token;
        var variable = this;
        this.getUsers(from,token,variable);
      },

      getUsers : function(from,token,variable) {
        this.from = from;
        if(this.typeone != '') {
          var type = [];
          type.push(this.typeone);
        }else {
          type = this.typeone;
        }

        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/users_management/user/searchUsers',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          data: {
            userName: this.nameone,
            email: this.emailone,
            area: this.placeone,
            // type: this.typeone,
            // type: '',
            type: type,
            // type: [{"id":2,"type":"施工"}],
            state: this.stateone,
            pageNumber: from,
            elements: 10
          }
        }).then(function(data){
          this.from = parseInt(this.from);
          this.currentPage = this.from;
          variable.total = data.data.data.totalElements;
          var items = data.data.data.content;

          for (var i=0;i<items.length;i++) {
            items[i].actions = items[i].state;
            if(items[i].state==0) {
              items[i].state='禁用'
            } else {
              items[i].state='启用'
            } 
          }
          variable.items = items;

          variable.nameone = '';
          variable.emailone = '';
          variable.placeone = '';
          variable.typeone = '';
          variable.stateone = null;
        }.bind(this))
        .catch(function(err){
          console.log("失败");
        }.bind(this))
        
      },

      searchAllUsers: function() {
        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/users_management/user/searchUsers',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data: {
            userName: '',
            email: '',
            area: '',
            type:'',
            state: null,
            pageNumber: 1,
            elements: 10
          }
        }).then(function(data){
          this.total = data.data.data.totalElements;
          var items = data.data.data.content;

          for (var i=0;i<items.length;i++) {
            items[i].actions = items[i].state;
            if(items[i].state==0) {
              items[i].state='禁用'
            } else {
              items[i].state='启用'
            } 
          }
          this.items = items;
        }.bind(this))
        .catch(function(err){
          console.log("失败");
        }.bind(this))
        
      },

      addUser : function() {
        if(this.nametwoErr==true&&this.emailtwoErr==true&&this.telephoneErr==true&&this.pwdErr==true&&this.confirmPwdErr==true&&this.differErr==true&&this.nametwo!=''&&this.emailtwo!=''&&this.telephone!=''&&this.pwd!=''&&this.confirmPwd!='') {

          var Sha1 = require('../../node_modules/sha.js').sha1
          var extra="cn%voa$foj/pal&slfj!imz3pa?vnohao";    
          var pwd = new Sha1().update(this.pwd+extra).digest('hex');
           
          this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/users_management/addDel/addUser',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : this.token
            },
            data: {
              name: this.nametwo,
              email: this.emailtwo,
              telephone: this.telephone,
              password: pwd,
/*              area : this.placetwo,
              type: this.typetwo,*/
              area: '',
              type: '',
              role: 2
            }
          }).then(function(response){
            this.$root.$emit('bv::show::modal', 'addUserInfo')
            var variable = this;
            var from = Math.ceil(this.total/10);
            this.currentPage = from;
            if (this.total%10 != 0) {                           
              this.getUsers(from,this.token,variable);
            } else {
              from = from+1;
              this.getUsers(from,this.token,variable);
            }

            this.nametwo = ''; 
            this.emailtwo = ''; 
            this.telephone = ''; 
            this.pwd = ''; 
            this.placetwo = ''; 
            this.typetwo = ''; 
            this.confirmPwd = '';
          }.bind(this))
          .catch(function(err){
            console.log("失败");
          }.bind(this))
        }
      },


      linkClass:function (idx) {
        if (this.tabIndex === idx) {
          return ['bg-danger', 'text-light']
        } else {
          return ['bg-light', 'text-danger']
        }
      },

      changeState (item, index, button,url) {
        var actions= null;
        var url = '';
        if(item.actions==0) {
          var url = 'https://recruitment.cqcyit.com:8090/users_management/update/updateUserState1'
        } else {
          var url = 'https://recruitment.cqcyit.com:8090/users_management/update/updateUserState0'
        }

        var uid = item.id;

        this.$ajax({
          method: 'post',
          url: url,
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data : {
            id : uid
          }
        }).then(function(res){
          if(res.data.state=='success') {
            /*this.searchAllUsers();*/
            var variable = this;
            this.getUsers(this.from,this.token,variable)
          }
        }.bind(this))
        .catch(function(err){
          console.log("失败");
        }.bind(this))     
      },

      deleteUser: function(item) {
        var uid = item.id;
        
        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/users_management/addDel/delUser',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data: {
            id: uid
          }
        }).then(function(response){
          var variable = this;          
          var from = this.currentPage;

          if (this.total%10 == 1) { 
            from = from-1                          
            this.getUsers(from,this.token,variable);
          } else {
            this.getUsers(from,this.token,variable);
          }
          this.getUsers(from,this.token,variable);
        }.bind(this))
        .catch(function(err){
          console.log("失败");
        }.bind(this))
      },

      handleCurrentChange: function (val) {
        var from = (`${val}`);
        var token =this.token;
        var variable =this;
        this.getUsers(from,token,variable);
        
      },

      getProblemInfomaton:function(from,token,variable){
       this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/searchAllFeedback',
            dataType: 'json',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':this.token
            },
            data:{
              title:this.title,
              type:this.type,
              describes:this.describes,
              page:from,
              num:10
            }
          }).then(function(data){
          var updateitems = data.data.data.content;
          var problemTotal =data.data.data.totalElements;
          this.updateitems=this.getTitle(updateitems);
          this.problemTotal=problemTotal;
      }.bind(this))
        .catch(function(err){
          console.log("加载失败");
        }.bind(this));
      },

    loadALLProblemInfomation(){
       this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/searchAllFeedback',
            dataType: 'json',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':this.token
            },
            data:{
              title:this.title,
              type:this.type,
              describes:this.describes,
              page:1,
              num:10
            }
          }).then(function(data){
          var updateitems = data.data.data.content;
          var problemTotal =data.data.data.totalElements; 
          this.updateitems=this.getTitle(updateitems);
          this.problemTotal=problemTotal;


          this.typeCurrentPage = 1;
      }.bind(this))
        .catch(function(err){
          console.log("加载失败");
        }.bind(this));
    },

    getProblem(from,token,variable){
      var item= $(".problemType-select").val();
        if(item==''){
          this.loadALLProblemInfomation();
        }else{
          this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/searchFeedbackByType',
            dataType: 'json',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':this.token
            },
            data:{
              type:item,
              page: from,
              num: 10
            }
          }).then(function(data){
          var updateitems = data.data.data.content;
          var problemTotal =data.data.data.totalElements;
          this.updateitems=this.getTitle(updateitems);
          this.problemTotal=problemTotal;
      }.bind(this))
        .catch(function(err){
          console.log("搜索失败");
        }.bind(this));
        }
    },

    selectProblemInfomation(from,token,variable){
      var item= $(".problemType-select").val();
        if(item==''){
          this.loadALLProblemInfomation();
        }else{
          this.$ajax({
            method: 'post',
            url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/searchFeedbackByType',
            dataType: 'json',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':this.token
            },
            data:{
              type:item,
              page: 1,
              num: 10
            }
          }).then(function(data){
          var updateitems = data.data.data.content;
          var problemTotal =data.data.data.totalElements;
          this.typeCurrentPage = 1;
          this.updateitems=this.getTitle(updateitems);
          this.problemTotal=problemTotal;
      }.bind(this))
        .catch(function(err){
          console.log("搜索失败");
        }.bind(this));
        }
    },
    getTitle(updateitems){
      for(var i=0;i<updateitems.length;i++) {
            var titleObj = {}
            titleObj.title = updateitems[i].title;
            titleObj.url = updateitems[i].url;
            updateitems[i].title = titleObj;

          }
      return updateitems;
    },
      problemHandleCurrentChange: function (val) {
        var from = (`${val}`);
        var token =this.token;
        var variable =this;
        var item= $(".problemType-select").val();
        if(item!==''){
          this.getProblem(from,token,variable);
        }else{
          this.getProblemInfomaton(from,token,variable);
        }
      },
    }
  }
</script>