<template>
  <div class="web-wrap">
    <div class="page-header text-left">
        <img src="../assets/images/logo.png" @click="toHome" class="logo pointer" />

        <b-form @submit="inputSearch" class="input-search">
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
    </div>

    <div class="container">
      <div class="tab-wrap">
        <div class="text-left tab-item">
          <span class="tab-title red">发布时间：</span>

          <b-list-group-item v-for="time in times" class="col-lg-1 col-md-2 col-sm-6 tab-sort tag pointer time"><span>{{time}}</span></b-list-group-item>
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
        </div>

        <div class="text-left tab-item">
          <span class="tab-title red">项目金额：</span>
          <b-list-group-item id="all-money" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-choosed pointer"><span>全部</span></b-list-group-item>
          <b-form-select id="money-choose" v-model="moneySelected" :options="moneyList" class="tab-select money-select pointer" style="height:23px;width:156px;padding-left: 4px;" />   
          <span id="more-btn" class="more-btn pointer">更多<img class="person-icon" src="../assets/images/down.png"/></span>
        </div>

      <div id="more-condition">
        <div class="text-left tab-item">
          <div style="display:inline-block;">
            <span class="tab-title red">项目地区：</span>
          </div>
          <div class="tab-texts place-wrap">
            <b-list-group-item v-for="place in places" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-text tag pointer"><span>{{place}}</span></b-list-group-item>
          </div>
        </div>


        <div class="text-left tab-item info-classify" style="padding-bottom:10px;">
          <div style="display:inline-block;">
            <span class="tab-title red inline-b-span">信息分类：</span>
          </div>
          <div class="tab-texts msg-type">
            <b-list-group-item v-for="type in types" class="col-lg-1 col-md-3 col-sm-6 tab-sort tag pointer"><span>{{type}}</span></b-list-group-item>
          </div>
        </div>

        <div class="text-left tab-item info-classify">
          <div style="display:inline-block;">
            <span class="tab-title red" style="width:130px;">通信建设行业分类：</span>
          </div>
          <div class="tab-texts ct-type" style="width:86%;">
            <b-list-group-item v-for="ctType in ctTypes" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-text tag pointer"><span>{{ctType}}</span></b-list-group-item>
          </div>
        </div>

        <div class="text-left tab-item">
          <div style="display:inline-block;">
            <span class="tab-title red">运营商：</span>
          </div>

          <div class="tab-texts operator">
            <b-list-group-item v-for="operator in operators" class="col-lg-1 col-md-2 col-sm-6 tab-sort tab-text tag pointer"><span>{{operator}}</span></b-list-group-item>
          </div>
        </div>

        <div class="text-left tab-item">
          <div style="display:inline-block;">
            <span class="tab-title red">其它：</span>
          </div>
          <div class="tab-texts">
            <b-form-select v-model="aptSelected" :options="aptitude" id="apt-select" class="tab-select info-select pointer" style="height:23px;width:210px;padding-left: 4px;" />
          </div>
        </div>

        <div class="text-right tab-item" style="border:none;">
          <div style="display:inline-block;">
            <b-button variant='primary' size='sm' @click="clearConditions">清空搜索条件</b-button>
          </div>

          <div style="display:inline-block;vertical-align:middle;">
            <span id="less-btn" class="less-btn pointer">收起<img class="person-icon" src="../assets/images/up.png"/></span>
          </div>
        </div>
      </div>
      </div>

      <div class="tab-wrap total">
        <div class="text-left tab-item" style="border:none;">
          <div style="display:inline-block;">
            <span class="tab-title red"><a id="total">总数：{{total}}</a></span>
          </div>
        </div>
      </div>

      <div>
      </div>
     
      <b-modal id="mymo" header-bg-variant="danger"  size="lg" title="问题反馈"  v-model="show"   hide-footer>
                
        <b-form  v-if="show" @submit="onSubmit" @reset="onReset">
          
        </b-form-group>
            <b-form-group id="exampleInputGroup3"
            label="问题类型:"
            label-for="exampleInput3">
            <b-form-select id="exampleInput3"
              :options="foods"
              required
              v-model="form.food">
            </b-form-select>
        </b-form-group>
          
          
          </b-form-group>
            <b-form-group ID="exampleInputGroup2"
                          label="问题描述:"
                          label-for="exampleInput2">
               <b-form-textarea id="textarea1"
               v-model="form.text"
               placeholder="请输入内容"
               :rows="3"
               :max-rows="6"
               required>
               </b-form-textarea>
      
            </b-form-group> 
            <b-button @click="onSubmit" variant="primary">提交</b-button>
            <b-button type="reset" variant="danger">重置</b-button>
        </b-form>        
     </b-modal>
      
      <div class="bid" v-for="result in results">
          <div style="col"></div>
          <h5 @click="browseRecord(result._source.tender_title,result._source.tender_content_url,$event.target)" v-show="result.highlightTitle==false" class="text-left" style="margin-left:6px;color:#e64035">
            <a v-bind:href="result._source.tender_content_url" target="_blank" style="color:#e64035" v-html="result._source.tender_title">{{result._source.tender_title}}</a><span style="margin-left:6px;font-size:14px;">{{result._source.tender_issue_time}}</span>
          </h5>

          <h5 @click="browseRecord(result._source.tender_title,result._source.tender_content_url,$event.target)" v-show="result.highlightTitle==true" class="text-left" style="color:#e64035">
            <a v-bind:href="result._source.tender_content_url" target="_blank" style="color:#e64035" v-html="result.highlight.tender_title"></a><span style="font-size:14px;" v-show="result.highlightTitle==true">{{result._source.tender_issue_time}}</span>
          </h5>
          
          <a @click="browseRecord(result._source.tender_title,result._source.tender_content_url,$event.target)" v-show="result.highlightContent==false" target="_blank" v-bind:href="result._source.tender_content_url"><p class="re-content text-left" v-html="result._source.tender_content">
          </p></a>

          <a @click="browseRecord(result._source.tender_title,result._source.tender_content_url,$event.target)" v-show="result.highlightContent==true" target="_blank" v-bind:href="result._source.tender_content_url"><p class="re-content text-left" v-html="result.highlight.tender_content">
          </p></a>
   
          <p @click="browseRecord(result._source.tender_title,result._source.tender_content_url,$event.target)" class=" text-left re-url" style="width:20px;"><a style="color: #BFBFBF;" target="_blank" v-bind:href="result._source.tender_content_url">{{result._source.tender_content_url}}</a></p>

          <div class="msg-tag-wrap">
            <div class="bid-tag" id="productName"><span class="pro-name-title" style="float:left;">产品名称：</span><b-list-group-item v-for="productName in result.productNamesArr" @mouseover="toPointer($event)" @click="searchTag($event,result._source.tender_title,result._source.tender_content_url)" class=" col-md-12 col-sm-12 tab-sort tab-text tag pointer pro-name-tag tag-select"><span>{{productName}}</span></b-list-group-item></div>

            <div class="bid-tag"><span class="tag-title"><span style="margin-right:28px;">标</span><span>签：</span></span><b-list-group-item @mouseover="toPointer($event)" v-for="tag in result.tagsArr" @click="searchTag($event,result._source.tender_title,result._source.tender_content_url)" class=" col-md-12 col-sm-12 tab-sort tab-text tag pointer msg-tag tag-select" style="border:1px solid #e64035;">{{tag}}</b-list-group-item></div>


           <span @mouseover="toPointer($event)" class="bid-btn bid-back-btn pointer"  variant="primary" v-b-modal.mymo  @click="feedback(result._source.tender_title,result._source.tender_content_url,result._source.id)">反馈</span><span @mouseover="toPointer($event)" class="bid-btn focus pointer" @click="focus(result._source.tender_title,result._source.tender_content_url,$event.target)">关注</span>
         </div>
        </div>
      </div>

      <a><el-pagination :small="true" v-if="pagTotal!=0" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="pagTotal" :current-page.sync="currentPage">
      </el-pagination></a>

      <b-modal id="focusInfo" :title="focusInfo.title" ok-only>
        <pre>{{ focusInfo.content}}</pre>
      </b-modal>

      <b-modal id="focusErr" :title="focusErr.title" ok-only>
        <pre>{{ focusErr.content}}</pre>
      </b-modal>
    </div>  
  </div>
</template> 

<style scoped>

  @import '../assets/css/search.css'; 

  .over-pointer {
    cursor: pointer;
  }

  .person-icon {
    width: 16px;
    height: 8px;
    margin-right: 4px;
    margin-left: 4px;
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
    color: #8E8E8E;
  }

  .time-one-in-click {
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

  .total {
    margin-top:20px;
    margin-bottom: 24px;
    padding:0 20px;
  }

  .bid {
    margin-top: 14px;
  }

  .msg-tag-wrap {
    width: 100%;
    display: inline-block;
    font-size: 14px;
  }

  .bid-tag {   
    display: inline-block;
    float:left;     
    width: 81%;
  }

  .bid-btn-wrap {
    width: 18%;
    display: inline-block;
    float:right;    
  }

  .bid-btn {
    float: right;
    display: inline-block;
    margin-right:16px;
    margin-bottom: 4px;    
    text-align:center;
    color:#e64035;
    font-weight:bold;
  }

  .msg-tag, .pro-name-tag {
    float: left;
    padding: 0 4px;
    height: 20px;
    width: auto;
    line-height: 20px;
    border: 1px solid #e64035;    
    color:#e64035;
  }

  .bid-back-btn {
    color: #8E8E8E;
  }

  .pro-name-title, .tag-title {
    float: left;
    font-weight: 600;
  } 

  .pro-name-title, .pro-name-tag {
    color: #63B8FF;
  }

  .pro-name-tag {
    border: 1px solid #63B8FF;
  } 

  .tag-title {
    color: #e64035;
  }

  .re-content {
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #8E8E8E;
  }

  .re-url {
    margin-bottom: 6px;
    color: #BFBFBF;
    font-size: 14px;
  }


  @media (min-width: 0px) and (max-width: 764px) {
    .bid-btn-wrap {
      display: block;
      width: 42%;
      font-size: 12px;
    }

    .bid-btn {
      margin-right: 4px;
    }

    .bid-tag {   
      display: inline-block;
      float:left;     
      width: 81%;
    }
  }

  @media (min-width: 0px) and (max-width: 500px) {
    .bid-tag {     
      width: 76%;
    }
  }


  @media (min-width: 0px) and (max-width: 330px) {
    .money-select {
      margin: 0;
    }
  }
</style>

<script type="text/javascript">
  var utils = require("../../node_modules/js/utils.js");

  export default {
    data: function() {
      return {
        show: false,
          foods: [
         
        '标签问题', '数据问题', '分类问题', '其他'
      ],

      hideFooter: null,
    
        form : {
          keyword: '',
          food:null,
          text:''
         
        },

        feedbackTitle:'',
        feedbackUrl:'',
        feedbackId:'',

        role: null,
        usermsg: null,

        searchHotPage : false,

        productNames: ['产品名称1','产品名称2','产品名称3','产品名称4'],

        tags:['招标预告','中标','小区宽带','通信工程施工总承包'],

        total: null,
        pagTotal: null,
     
        startDate:'',
        endDate:'',

        startDateStr:'',
        endDateStr:'',

        startDateBefore:'',
        endDateBefore:'',

        times: ['最新','今天','最近3天','最近7天','最近30天'],

        /*places: ['不限','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国','全国',],*/
        places: ['不限','重庆','西藏','贵州','河南','四川','云南','广东','其它',],

        types:['不限','招标预告','招标公告','中标公示','变更公告'],

        pubSelected: null,
        publish: [
          { value: null, text: '招标公告' },
          { value: 'a', text: '招标' },
          { value: 'b', text: '邀标' },
          { value: 'c', text: '询价' },
          { value: 'd', text: '竞谈' },
          { value: 'e', text: '竞价' },
          { value: 'f', text: '变更' },
          { value: 'g', text: '其他' },
        ],

        resultSelected: null,
        bidResults: [
          { value: null, text: '招标结果' },
          { value: 'a', text: '中标' },
          { value: 'b', text: '成交' },
          { value: 'c', text: '废标' },
          { value: 'd', text: '流标' }
        ],

        majorSelected: null,
        majors: [
          { value: null, text: '专业领域' },
          { value: 'a', text: '小区宽带' },
          { value: 'b', text: '无线网络' },
          { value: 'c', text: '通信工程设备' },
          { value: 'd', text: '通信工程管道' },
          { value: 'e', text: '搬迁调整' },
          { value: 'f', text: '更新改造' },
          { value: 'g', text: '宽带接入' },
          { value: 'h', text: '网络优化' },
          { value: 'i', text: '系统集成' },
          { value: 'j', text: 'WLAN' },
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
          { value: 'a', text: '企业信用等级' },
          { value: 'b', text: '质量管理体系认证' },
          { value: 'c', text: '环境管理体系认证' },
          { value: 'd', text: '职业健康安全管理体系认证' },          
        ],

        moneySelected: null,
        moneyList: [
          { value: null, text: '请选择' },
          { value: '0-1000000', text: '0万元-100万元' },
          { value: '1000000-5000000', text: '100万元-500万元' },
          { value: '5000000-10000000', text: '500万元-1000万元' },
          { value: '10000000-15000000', text: '1000万元-1500万元' },
          { value: '15000000-20000000', text: '1500万元-2000万元' },
          { value: '20000000-25000000', text: '2000万元-2500万元' },
          { value: '25000000-30000000', text: '2500万元-3000万元' },
          { value: '3000000-35000000', text: '3000万元-3500万元' },
          { value: '35000000-', text: '3500万元以上' },
        ],
        lowerMoney:'',
        upperMoney:'',

        ctTypes: ['不限','设计','施工','监理'],

        operators:['不限','移动','电信','联通','铁塔','广电'],

        businessTypes:['不限','系统集成'],

        time:'',
        place:'',
        msgType:'',
        money:'',
        moneyRange:'',
        ctType:'',
        operator:'',
        other:'',

        results: [],

        focusInfo: {title: '提示',content:'恭喜您，关注成功！可进入个人主页查看相关信息！'},
        focusErr: {title: '提示',content:'对不起，关注失败！'},

        autoSearch: true, 

        currentPage: 1,
      }
    },
    created : function() {
      var self = this;

      self.form.keyword = self.$route.params.keyword;

      console.log("keyword:");
      console.log(self.$route.query.keyword);

      var keyword =self.form.keyword;

      self.usermsg = window.localStorage.getItem('usermsg');

      var usermsg = self.usermsg;
      var usermsg = eval("(" + usermsg + ")");
      self.usermsg = usermsg;
      self.token = self.usermsg.token;
      var token = self.token;

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
        var i=0;
        var hasOthers = false;
        var placesArr = ['不限'];
        for (i;i<places.length;i++) {
          if(places[i].fields.tender_area[0]!='其他') {
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
        alert("失败");
        console.log(err)
      }.bind(this))

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
    },

    mounted:function(){
      const self = this;

      $('.tab-item>.tag').click(function(e){
        if ($(this).index()<5) {
          $(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
          $('.tab-item>.tag').eq(4).children(".tag").removeClass("tab-choosed");
          this.startDate = '';
          $("#startDate").val("");
          $("#endDate").val("");
        }
        
        if($(this).index()==5) {
          $(this).removeClass("tab-choosed");  
        }
      })

      $(".tab-texts .tag").click(function(e) {
        $(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
      })

      $('.tab-item .tab-sort').eq(0).trigger("click","true");

      $('.info-classify .tab-sort').eq(0).trigger("click","true");

      $('.tab-texts .tab-sort').eq(0).trigger("click","true");

      $('.operator .tab-sort').eq(0).trigger("click","true");
      
      $('.ct-type .tab-sort').eq(0).trigger("click","true");


      var clear = false;
      // 监听时间选择
      $(".time").click(function(e,clear) {    
        self.time = e.currentTarget.innerText;
        
        if(self.time=='今天') {
          var date = new Date();

          var currentdate = self.getNowDate(date);
          self.startDateStr = currentdate;
          self.endDateStr = "";
          
        } else if(self.time=='最近3天') {
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
        } else if (self.time=='最新') {
          self.startDateStr = "";
          self.endDateStr = "";
        }

        if(clear!="true") {
          self.search(0);
        }   
        self.currentPage = 1;
      })

      setInterval(function() {
        console.log("定时执行");
        if((self.startDate != self.startDateBefore || self.endDate != self.endDateBefore) && self.startDate<self.endDate&&self.startDate!='') {
          console.log("变红");
          $('.tab-item>.tag').eq(4).children(".tag").addClass("tab-choosed");
          $('.tab-item>.tag').eq(4).children(".tag").addClass("time-one-in-click");
          $('.tab-item>.tag').eq(4).children(".tag").removeClass("time-one-in");
          $('.tab-item>.tag').eq(4).siblings().removeClass("tab-choosed");
          self.startDateStr = self.startDate; 
          self.endDateStr = self.endDate; 

          self.startDateBefore = self.startDate;
          self.endDateBefore = self.endDate;
          self.search(0);
          self.currentPage = 1; 
        }
      },2000);

      $("#all-money").click(function(e,clear) {      
        self.money = e.currentTarget.innerText;

        $(this).addClass("tab-choosed");
        $("#money-choose").removeClass("tab-choosed");
        $("#money-choose").val("");
        self.lowerMoney = "";
        self.upperMoney = "";

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      });


      $("#money-choose").change(function(clear) {      
        self.money = $(this).val();
        var moneyArr = $(this).val().split("-");

        $("#money-choose").addClass("tab-choosed");
        $("#money-choose>option").attr("style","background-color:white;color:black;");
        $("#all-money").removeClass("tab-choosed");

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      })

      $(".place-wrap .tag").click(function(e,clear) {
        self.place = e.currentTarget.innerText;
        if(self.place=='不限') {
          self.place = "";
        }

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      })

      $(".msg-type .tag").click(function(e,clear) {      
        self.msgType = e.currentTarget.innerText;
        if(self.msgType=="不限") {
          self.msgType=""
        }

        if(clear!="true") {
          self.search(0);          
        }   
        self.currentPage = 1;     
      })

      $(".ct-type .tag").click(function(e,clear) {
        self.ctType = e.currentTarget.innerText;
        if(self.ctType=="不限") {
          self.ctType=""
        }

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      });

      $(".operator .tag").click(function(e,clear) {

        self.operator = e.currentTarget.innerText;
        if(self.operator=="不限") {
          self.operator=""
        }

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      });

      $("#apt-select").change(function(e,clear) {
        if($(this).val()=='') {
          $(this).removeClass('tab-choosed');          
        } else {
          $(this).addClass('tab-choosed');          
        }

        self.other = $(this).val();
        if(self.other==null) {
          self.other=""
        }

        if(clear!="true") {
          self.search(0);          
        }
        self.currentPage = 1; 
      })

      $(".pointer").mouseover(function(event) {
        $(this).css("cursor","pointer");
      });

      $(".msg-tag").mouseover(function(event) {
        $(this).css("cursor","pointer");
      });

      $("#more-btn").click(function() {
        $("#more-condition").show();
        $("#more-btn").hide();
      });

      $("#less-btn").click(function() {
        $("#more-btn").show();
        $("#more-condition").hide();
        document.documentElement.scrollTop = 0;
      });
    },

    methods: {
      console:function() {
        $(this).addClass("red");
      },
      onSubmit (evt) {         
        var _this = this;
        var token = _this.token;
        evt.preventDefault();
        var formdata= JSON.stringify(this.form);
        var obj = eval( "(" + formdata+ ")" )
        var food=obj.food;
        var text=obj.text;

       this.$ajax({       
          method: 'post',  
          url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/save',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data: {
            title: this.feedbackTitle,
            url: this.feedbackUrl,
            message: this.feedbackId,
            type: food,
            describes: text,
          }
          
        }).then(function(response){
          if(response.data.state=='error'){
            alert("提交失败");
			this.show=false;
            this.form.text='';
            this.form.food=null;
          }else{
            alert("提交成功"); 
            this.show=false;
            this.form.text='';
            this.form.food=null;
          }        
        }.bind(this))
        .catch(function(err){           
          console.log(err)
        }.bind(this))
      },

      onReset (evt) {
        evt.preventDefault();
        this.form.text = '';
        this.form.food = null;
        //this.show=false;
        //this.$nextTick(() => { this.show = true });
      },

      toHome: function() {
        this.$router.push({name:'home1',params:{token:this.token}})
      },

      toAdmin: function() {
        this.$router.push({name:'admin',params:{token:this.token}})
      },

      toPersonal : function() {
        this.$router.push({name: 'personal',params: {usermsg:this.usermsg}});
      },

      clearConditions: function() {
        this.form.keyword = '';
        this.time = '';
        this.money = '';
        this.place = '';
        this.msgType = '';
        this.ctType = '';
        this.operator = '';
        this.other = '';

        var clear = true;

        $("#all-money").trigger("click","true");

        $('.tab-item .tab-sort').eq(0).trigger("click","true");

        $('.info-classify .tab-sort').eq(0).trigger("click","true");

        $('.tab-texts .tab-sort').eq(0).trigger("click","true");

        $('.operator .tab-sort').eq(0).trigger("click","true");
        
        $('.ct-type .tab-sort').eq(0).trigger("click","true");

        $("#apt-select").val("");
        $("#apt-select").trigger("change","true");

        this.searchHot(0);
        },

      handleCurrentChange: function (val) {
        var from = (`${val}`-1)*20;

        if(this.autoSearch == false) {
          this.search(from);
        }else {
          this.searchHotPage=true;
          this.searchHot(from);
        }   
      },

      feedback: function(title,url,id) {
        this.feedbackTitle = title;
        this.feedbackUrl = url;
        this.feedbackId = id;
        this.form.food = null;
        this.form.text = '';
      },

      focus: function(title,url,button) {
        this.browseRecord(title,url,button);
        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/userservice/favorite/addFavorite',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data: {
            title: title,
            url: url
          }
        }).then(function(response){
          console.log("新增关注结果：");
          console.log(response);
          if(response.data.state == 'success') {
            console.log("关注成功！");
            this.$root.$emit('bv::show::modal', 'focusInfo', button)
          }     
        }.bind(this))
        .catch(function(err){
          this.$root.$emit('bv::show::modal', 'focusErr', button)
        }.bind(this))
      },

      browseRecord: function(title,url,button) {
        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/userservice/browse/save',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : this.token
          },
          data: {
            title: title,
            url: url
          }
        }).then(function(response){
        }.bind(this))
        .catch(function(err){
          console.log(err)
        }.bind(this))
      },

      searchHot: function(from) {
        this.autoSearch = true;

        var token =this.token;
        this.$ajax({
          method: 'post',
          url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/Lately/getLately',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
          },
          data: {
            from: from,
            size: 20
          }
        }).then(function(response){
          var results = response.data.data.hits.hits;//不同的地方
          this.total = response.data.data.hits.total
          this.pagTotal = this.total/2;

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
          
        }.bind(this))
        .catch(function(err){
          alert("失败");
          console.log(err)
        }.bind(this))

      },

      inputSearch(evt) {
        evt.preventDefault();
        this.search(0);      
      },

      search(from) {
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
            type: this.msgType,
            qualification:this.other,
            construction_industry: this.ctType,
            lowerMoney: 0,
            upperMoney: 10000,
            operators: this.operator,
            from: from,
            size: 20
          }
        }).then(function(response){
          var results = response.data.data.hits;

          this.total = response.data.data.total; 
          this.pagTotal = this.total/2;

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

          var j=0;
          for(j;j<results.length;j++) {
            var reg1 = /<span>/g;
            var reg2 = /<\/span>/g
            var title = results[j].highlight.tender_title;
            var title = title.replace(reg1,"<span style='color:#63B8FF;'>");
            var title = title.replace(reg2,"</span>");

            var content = results[j].highlight.tender_content;
            var content = content.replace(reg1,"<span style='color:#63B8FF;'>");
            var content = content.replace(reg2,"</span>");

            results[j].highlight.tender_title = title;
            results[j].highlight.tender_content = content;
          }
          this.results = results;
          document.documentElement.scrollTop = 400;
        }.bind(this))
        .catch(function(err){
          alert("失败");
          console.log(err)
        }.bind(this))
        
        var jsonObj = {}
        jsonObj.key = this.form.keyword;
        jsonObj.lower_issue_time = this.startDate;
        jsonObj.upper_issue_time = this.endDate;
        jsonObj.area = this.place;
        jsonObj.type = this.msgType;
        jsonObj.qualifications = this.other;

        jsonObj.construction_industry = this.ctType;
        
        jsonObj.lowerMoney = this.lowerMoney;
        jsonObj.upperMoney = this.upperMoney;
        jsonObj.operators = this.operator;


        var json = JSON.stringify(jsonObj);

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
          alert("失败");
          console.log(err)
        }.bind(this))
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

      searchTag: function(event,title,url) {
        this.browseRecord(title,url,);

        this.form.keyword = event.target.innerHTML;
        this.search(0);
      },

      toPointer : function ($event) {
         $event.target.classList.add("over-pointer");
      }
    }
  }
</script>