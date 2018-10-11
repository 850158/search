<!-- 选择类型页面 -->
<template>
	<div class="web-wrap">

    <div class="page-header text-left">
      <img src="../assets/images/logo.png" class="logo" />
          <b-input type="text"
               id="keyword"
               required
               v-model="form.keyword"
               placeholder="请输入搜索关键词"
               class="keyword-in keyword-in-sm"
               >
          </b-input>
          <b-button class="search-btn search-btn-sm" type="button" @click="search(0)">搜索</b-button> 

    </div>

		<div class="firstEnter bid-info text-left">
			<h5 style="padding-top: 10px;margin-left: 20px;color: #e64035;">没有关注类型</h5>
			<!-- 页面打开时加载类型模块框 -->
			<div class="type"  >
				<b-modal 
                    id="choiceType" 
                    class="choiceType"
                    ref="choiceType"
                    hide-footer
                    title="请选择感兴趣的类型"
                    
                    no-close-on-esc
                    no-enforce-focus
                    no-close-on-backdrop
                    centered
                    body-class="text-left"

                    >
         			
         			<b-list-group-item v-for="choiceType in tags" class=" tab-sort tab-text tag pointer  "style=" width: 22%;display: inline-block;"><span class="choiceType" style="padding-left:1px ">#{{choiceType}}</span>
         			</b-list-group-item>
                    <div  class="nextPlace">
                     <span  class="next pointer" @click="next" style="color:#e64035 ">下一步 ></span>    
                    </div> 
           		</b-modal>	
           		<b-modal id="choicePlace"
                     	 ref="choicePlace"
                     	 title="请选择感兴趣的地区"
                     	 hide-footer>
                     		<b-list-group-item v-for="choicePlace in places" class=" tab-sort tab-text tag pointer place" style=" width: 15%;display: inline-block;"><span class="choicePlace">{{choicePlace}}</span></b-list-group-item>
                     		<div class="compete">
                     			<span class="pointer" @click="compete">跳过</span>
                     			<span class="red pointer" @click="compete" style="color:#e64035 ">确定</span>
                     		</div>
                     		
                </b-modal>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@import '../assets/css/search.css';
	.firstEnter{
        height: 80px;
    }
    .bid-info {
    margin-top: 14px;
    width:90% ;
    margin-left:5%;
    background-color: ;
    border-bottom: 1px solid #DADADA;
    border-left: 1px solid #DADADA;
    border-right: 1px solid #DADADA;
    box-shadow:0px 0px 1px 1px #DADADA ;
    /*border-top: none; */
    /*border-style: outset;*/
  }
  .choiceType{
        display: block;
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
    font-size: 15px;
  }
   .tab-text {
    display:inline;
    margin-right:14px;
    padding:0;
  }
 .next,.compete{
    float: right;
    margin-right: 5px; 
    margin-top: 10px;
  }
  .keyword-in-sm{
    width: 30%;
  }
  .tab-choosed {
    background-color: #e64035;
    color: white;
  }

</style>
<style >
    .close{
        display: none;
    }
</style>
<script type="text/javascript">
    export default{
        data:function(){
            return{
              form:{
                keyword:''
              },

                 tags:['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',],
                 places: ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',],
                 tagtype:'',
                 area:'',
                 tagArrs:[]
            }
        },
        created:function(){
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
            self.role = self.usermsg.role;
            console.log(token);


            // $('.choiceType').append("#");
            // console.log("类型");
            // console.log($('.choiceType'));

             // 动态类型
            this.$ajax({
            method: 'get',
            url: 'https://recruitment.cqcyit.com:8090/userservice/tags/list',
            dataType: 'json',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : token
            }
          }).then(function(data){
            // console.log(data.data);
            // console.log(data.data)
            var tags = data.data.data;
            console.log(tags);

            console.log(tags.length);
           // console.log(tags[1].tagName);
            var hasOthers = false;
            var tagsArr = [];
            var edd="#";
            // console.log(edd);
            // var id = tags.id;
            for (var i = 0; i < tags.length; i++) {
                tagsArr.push(tags[i].tagName);
            }
            console.log("diyige ");
            console.log(tagsArr[0]);
            console.log(tagsArr);
            this.tags = tagsArr;
          }.bind(this))
          .catch(function(err){
            alert("失败");
            console.log(err)
          }.bind(this));
          
        },
        mounted:function(){
            const self=this;
            var edd ='';
            self.$refs.choiceType.show();

            /*hover添加pointer效果*/
          $(".pointer").mouseover(function(event) {
            $(this).css("cursor","pointer");
          });

          $(".choiceType ").click(function(e,clear) {
          $(this).toggleClass("tab-choosed");
          console.log(e.currentTarget.innerText);
          var tagtype =e.currentTarget.innerText;
          self.tagtype = tagtype.replace("#","");
          console.log(self.tagtype);
          console.log("类型选择");

          var tag = self.tagtype;
          var tagArr = {"tag_name":tag};
          var tagArrs = self.tagArrs;
              self.tagArrs.push(tagArr);
          console.log("添加类型数组")
          console.log(tagArrs);
          // self.tag = self.tagArrs;
            });

          $('.choicePlace').click(function(e,clear){
            $(this).addClass("tab-choosed").siblings().removeClass("tab-choosed");
            console.log(e.currentTarget.innerText);
            var area =e.currentTarget.innerText;
            self.area = area;
            console.log(self.area);
            console.log("类型选择");
          });
        },
        methods:{
            next:function(){
              console.log("11111");
              console.log(this.tagArrs);
             
              if (this.tagArrs=="") {
                alert("请选择你感兴趣的类型！");
              }else{
                 // var tag = this.tagtype.replace("#","");
                 //  var tagArrs = [{"tag_name":tag}];
                  // for (var i = 0; i < tag.length; i++) {
                  //   tagArrs.push('tagName',tag[i]);
                  // }
                  // console.log(tagArrs);
                  // this.tag=tagArrs;
                  // console.log(tag);
              // console.log(this.id);
                //将选择的类型保存
                // console.log(tags);
                this.$ajax({
                  method:'post',
                  url:'https://recruitment.cqcyit.com:8090/users_management/add/addtype',
                  dataType:'json',
                  headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : this.token
                  },
                  data:{
                    // id:this.id,
                    type:this.tagArrs
                  }
                }).then(function(data){
                  console.log(data);
                  if(data.data.status=="error"){
                    alert("失败");
                  }else{
                    console.log("11111q");
                  this.$refs.choiceType.hide();

                  this.$refs.choicePlace.show();
                   // 动态加载地区
                      this.$ajax({
                      method: 'post',
                      url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/searchArea',
                      dataType: 'json',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : this.token
                      }
                    }).then(function(data){
                      var places = data.data.hits.hits;
                      console.log("地区");
                      console.log(places);
                      var i=0;
                      var hasOthers = false;
                      var placesArr = ['不限'];
                      for (i;i<places.length;i++) {
                        if(places[i].fields.tender_area[0]!='其他'&&places[i].fields.tender_area[0].length<=5) {
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
                    }.bind(this));
                  }
                }.bind(this))
                .catch(function(err){
                  alert("失败");
                  console.log(err);
                }.bind(this));
              }
              
                
            },
            compete:function(){
              // var place = $('.place');
              console.log("选中的地区");
              console.log(this.area);
              this.$ajax({
                 method: 'post',
                  url: 'https://recruitment.cqcyit.com:8090/users_management/add/addarea',
                  dataType: 'json',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : this.token
                  },
                  data:{
                    area:this.area
                  }
              }).then(function(data){
                if (data.data.state=="success") {
                   this.$router.push({path:'/homeThree',params:{token:this.token}});
                }
              }.bind(this))
              .catch(function(err){
                alert("失败");
                console.log(err);
              }.bind(this));
               
                // this.$router.push({path:'/homeThree',query:{token:this.token}});
            },
            search:function(from){},
             toMesExcell:function(){
              },
            toAdmin:function(){
            },
        }
    }
</script>