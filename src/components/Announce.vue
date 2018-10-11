
<template>
	<div class="web-wrap">
		<div class="page-header" v-if="showall" >
			<HeaderModal v-bind:role="role"></HeaderModal>
                <div  class="outdiv">
                	<div id="mydomalf">
					<b-modal id="mymo" header-bg-variant="danger" no-close-on-backdrop no-close-on-esc size="lg" title="问题反馈" v-model="showqf" hide-footer>
                       <div slot="modal-header" class="w-100">
			          	 <span style="color: white;font-size: 20px;">问题反馈</span>
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="delmodalmymo">
			          	 </span>
			            </div>
						<b-form v-if="showqf" @submit="onSubmit" @reset="onReset">

							
							<b-form-group id="exampleInputGroup3" label="问题类型:" label-for="exampleInput3">
								<b-form-select id="exampleInput3" :options="questiontypes" v-model="form.questiontype">
								</b-form-select>
								<div style="display: none;color: red;" class="type-error"><label class="type-lable">请选择问题类型</label></div>
							</b-form-group>

							</b-form-group>
							<b-form-group ID="exampleInputGroup2" label="问题描述:" label-for="exampleInput2">
								<b-form-textarea id="textarea1" v-model="form.text" placeholder="请输入内容" :rows="3" :max-rows="6" required>
								</b-form-textarea>
								<div style="display: none;color: red;" class="des-error"><label class="des-lable">　　　　　</label></div>
							</b-form-group>
							<b-button type="submit" variant="primary" style="border: none;">提交</b-button>
							<b-button type="reset" variant="danger" style="border: none;">重置</b-button>
						</b-form>

					</b-modal>
				</div>
				<div id="mys">
					<b-modal id="myfoucsmo" centered no-close-on-backdrop no-close-on-esc title-tag="h3" size="lg" title="添加关注" v-model="showf" hide-footer>
                        <div slot="modal-header" class="w-100">
			          	 添加关注
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="delmodalmyfomo">
			          	 </span>
			            </div>
						<b-form v-if="showf" @submit="onSubmit" @reset="onReset">
							<div v-for="foucs in foucss" 　>
								<div class="text-left titlearea" >{{foucs.title}}<div style="text-align:center" class="number">{{foucs.count}}</div>　</div>
								

								<b-button v-bind:disabled="dis" style="background-color: red;border: none;" id="foucsbtncon" class="bid-btn bid-back-btn foucsbtnarea" v-for="site in sites" @click="foucstit(foucs.title,foucs.id,site.contentUrl,site.id)">关注</b-button>

							</div>
							<div style="display: none;color: red;" class="fouinf-error"><label class="fouinf-lable">该信息已经被您关注过</label></div>
							<b-button class="cfo" variant="primary" style="background-color: red;" v-b-modal.mycfoucs>创建关注类型</b-button>

						</b-form>

					</b-modal>
				</div>
				<div id="myc">
					<b-modal title-tag="h3" no-enforce-focus no-close-on-backdrop no-close-on-esc id="mycfoucs" size="lg" title="创建关注类" v-model="showc" hide-footer>
                        <div slot="modal-header" class="w-100">
			          	 创建关注类型
			          	 <span class="float-right pointer">
			          	 	<img src="../assets/images/esc.png" class="esc-img" @click="delmodalmycfomo">
			          	 </span>
			            </div>
						<b-form v-if="showc" @submit="createf">

							</b-form-group>
							<b-form-group id="exampleInputGroup2" label-for="exampleInput2">
								<b-form-input id="exampleInput2" type="text" v-model="form.title" required >
								</b-form-input>
								<div style="display: none;color: red;" class="title-error"><label class="title-lable">　　　　　</label></div>
							</b-form-group>

							</b-form-group>
							<b-form-group ID="exampleInputGroup2" label-for="exampleInput2">
								
								<div style="display: none;color: red;" class="quedes-error"><label class="quedes-lable">　　　　　</label></div>
							</b-form-group>
							<b-button variant="danger" @click="backpre" style="background-color:gray;border: none;">返回</b-button>
							<b-button variant="danger" type="submit" style="background-color: red;border: none;">创建</b-button>

						</b-form>

					</b-modal>
				</div>
			<div class="showcontent">
				<div class="classifycontent">
					<div v-for="site in sites"  style="margin-left: -64px;text-align: left;" class="biaoqian"><span style="color: red;" ><h6><span style="color: gray;margin-right: 15px;" >{{site.type}}</span>　<span id="tst" v-for="items of site.tenderTags" style="margin-right: 10px;" @click="searchbytag(items)">#{{items}}</span></h6>
						</span>
						<h4 class="allcontent"><a target="_blank" rel="noreferrer" v-bind:href="site.contentUrl" style="color:#e64035;">{{site.title}}<span style="font-size: 10px;float: right;">{{site.issueTime}}</span></br></a></h4><span class="contentshow" style="margin-top: 30px;">{{site.content}}</span>
						<div style="display: none;font: '微软雅黑';font-size: 20px;color: red;margin-top: 100px;" class="pernoneinfo-error"><label class="pernoneinfo-lable">该用户下没有任何信息</label></div>
					</div>
					<div class="main">
						<div style="display: none;font: '微软雅黑';font-size: 24px;" class="noneinfo-error"><label class="noneinfo-lable">没有关联信息</label></div>
						<ul class="cbp_tmtimeline">
							<li v-for="time in times">
								<time class="cbp_tmtime">
	                        <span class="spantime" v-for="site in sites">{{time.tenderIssueTime}}</span></time>
								<div class="cbp_tmicon ">
								</div>
								<div class="cbp_tmlabel">
									<h6 class="bid-btn bid-back-btn">
	                          			<a  rel="noreferrer" target="_blank" v-bind:href="time.tenderContentUrl" class="typels">{{time.tenderTpye}}</br></a>
	                                </h6>

								</div>

							</li>
						</ul>
					</div>
				</div>
				<div class="myfou">
					<span style="color: red;margin-left:-16%;" v-if="showff"><img src="../assets/images/favorite.png" id="favor" class="pricture bid-btn bid-back-btn" style="width: 30px;height: 30px;" @click="addfoucsmount" variant="primary" v-b-modal.myfoucsmo/><span v-for="info in infos">　{{info.attentionCount}}</span></span>
					<span style="color: red;margin-left:-16%;" v-if="showunf"><img src="../assets/images/unfoucs.png" id="favor" class="pricture bid-btn bid-back-btn" style="width: 30px;height: 30px;" @click="addfoucsmount" variant="primary" v-b-modal.myfoucsmo/><span v-for="info in infos">　{{info.attentionCount}}</span></span>
					<span id="weibo" v-for="site in sites"  @click="shareWeibo(site.title,site.contentUrl)"><img src="../assets/images/weibo.png"  class="weibo"/></span>
					<button style="background-color: red;border: none;margin-left: 10px;border-radius: 4px;" class="toubiao" ><span  style="color: white;">投标</span></button>
					<button  style="background-color: gray;border: none;border-radius: 4px;" class="feedback" ><span v-for="site in sites"  v-b-modal.mymo  style="color: white;" @click="feedback(site.title,site.contentUrl,site.id)">反馈</span></button>
				</div>
			</div>
                </div>
				
		</div>

	</div>


</template>

<style class="cp-pen-styles" scoped="scoped" lang="less">
	/*页面顶部样式*/
	
	.esc-img{
  	width: 10px;
  	height: 10px;
  }
	.page-header {
		margin-top: -30px;
	}
	
	.logo {
		margin-left: -100px;
		height: 50px;
	}
	
	.toppre {
		margin-left: 0px;
	}
	
	.inputsearch {
		height: 40px;
		width: 300px;
		border: solid 1px gray;
		border-radius: 5px;
	}
	
	.btn-search {
		background-color: red;
		height: 42px;
		margin-left: 10px;
		border-radius: 5px;
	}
	
	.topmid {
		margin-left: 470px;
		margin-top: -40px;
		font-size: 20px;
		color: red;
	}
	
	.rightpic {
		float: right;
		margin-top: -30px;
	}
	
	.btn-mid {
		margin-left: -40%;
		color: red;
		font-size: 26px;
		margin-top: -100px;
	}
	
	h6 {
		margin-top: 2px;
		height: 10px;
	}
	
	.fouinf-error {
		margin-left: -20px;
	}
	/*模态框标题剧中*/			
		
	#mys /deep/ #myfoucsmo::-webkit-scrollbar {
		height: 480px;
		border-radius: 20px;
		margin-top: 150PX;
		display: none;
	}		
	#mys /deep/ #myfoucsmo /deep/ .titlearea {
		margin-left: 40px;
	}
	#mys /deep/ #myfoucsmo /deep/ .number{
		margin-top: -20px;
	}
	#mys /deep/ #myfoucsmo /deep/ .foucsbtnarea {
		margin-left: 520px;
		margin-top: -50px;
	}
	
	#myc /deep/ #mycfoucs {
		margin-top: 120px;
		width: 500px;
		margin: 100px 0 0 600px;
	}
	#myc /deep/ #mycfoucs{
		overflow: hidden;
	}
	.cfo {
		margin-left: -20px;
		border: none;
	}
	
	#mys /deep/ #myfoucsmo /deep/ .modal-body {
		padding-left: 50px;
		overflow-y: scroll;
		height: 300px;
		overflow-x: hidden;
	}
	
	#mydomalf /deep/ #mymo {
		margin-top: 120px;
	}
	/*内容显示样式*/
	
	.classifyvessel {
		margin-top: 10%;
		text-align: left;
	}
	
	.lableclassify {
		color: red;
		margin-top: 10%;
		font-size: 20px;
		margin-left: 20%;
		text-align: left;
	}
	
	.classifycontent {
		margin-top: 4%;
		
	}
	
	.showcontent {
		margin-left: 17%;
		margin-top: 2%;
		width: 845px;
	}
	
	.pricture {
		margin-left: 100px;
		cursor: pointer;
	}
	#tst{
		cursor: pointer;
	}
	.allcontent {
		margin-left: 0px;
		margin-top: 30px;
	}
	
	.contentshow {
		/*white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;*/
		width: 900px;
		display: block;
		
		border-radius: 4px;
		box-shadow: whitesmoke 0 1px 10px;
		}
	.contentshow {position: relative; line-height: 20px; max-height: 200px;overflow: hidden;color: #8E8E8E;}
  .contentshow::after{
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
	.myfou {
		margin-left: -32px;
		margin-top: -15px;
		width: 900px;
		height: 40px;
	}
	
	.weibo {
		width: 30px;
		height: 32px;
		margin-left: 680px;
		cursor: pointer;
	}
	.noneinfo-error{
		color: red;
		margin-top: 40px;
		margin-left: -80px;
	}
	.feedback{
		margin-left:10px;
		color:gray;
		font-size: 16px;
		cursor: pointer;
	}
	.toubiao{
		border-radius: 10px;
		margin-left: 10px;
		color: red;
		font-size: 16px;
		cursor: pointer;
	}
	.biaoqian{
		border: solid 2px antiquewhite;
		box-shadow: gainsboro 8px 10px 10px;
		border-bottom: 1px;
		border-radius: 8px;
		padding-left: 2px;
		
	}
	.outdiv{
		width: 1144px;
	}
	/*自适应小屏幕*/
	
	@media (min-width: 0px) and (max-width:600px) {
		.biaoqian{
			width: 90%;
			margin-left: 20px;
		}
		.showcontent{
			width: 90%;
			margin-left: 135px;
		}
		.allcontent{
			width: 90%;
		}
		.contentshow{
			width: 90%;
		}
		.myfou{
			width: 90%;
			margin-left:-60px;
		}
		#mys /deep/ #myfoucsmo {
			width: 81%;
			height: 30%;
			margin-left: 20px;
		}
		#mys /deep/ #myfoucsmo /deep/ .modal-title {
			margin-left: 120px;
		}
		#mys /deep/ #myfoucsmo /deep/ .btn {
			margin-left: 10px;
			border: none;
		}
		#mys /deep/ #myfoucsmo /deep/ .modal-body {
			padding: 20px;
		}
		#mys /deep/ #myfoucsmo /deep/ .foucsbtnarea {
			margin-left: 240px;
			margin-top: -50px;
		}
		#mys /deep/ #myfoucsmo /deep/ .modal-title {
			margin-left: 100px;
		}
		#myc /deep/ #mycfoucs /deep/ .modal-title {
			margin-left: 100px;
		}
		#myc /deep/ #mycfoucs {
			width: 80%;
			margin-left: 30px;
		}
		#mydomalf /deep/ #mymo {
			width: 76%;
			margin-left: 20px;
		}
		#mydomalf /deep/ #mymo /deep/ .modal-title {
			margin-left: 125px;
		}
		.fouinf-error {
			margin-left: 18px;
		}
		
		.noneinfo-error{
		color: red;
		margin-top: 30px;
		margin-left: -20px;
		font-size: 18px;
		width: 110%;
		
	    }
	    .myfou {
			width: 100%;
			margin-left: -120px;
			margin-top: -20px;
		}
		.weibo {
			margin-left: 0px;
		}
	    .outdiv{
	    	width: 90%;
	    }
	    .biaoqian{
	    	padding-left: 30px;
	    }
		
	}
	/*自适应大屏幕
  @media (min-width: 768px) and (max-width:1024px){
  	.web-wrap{
  		text-align: center;
  	}
  	.logo{
  		width: 16%;
  		margin-left: -100px;
  	}
  	.inputsearch{
  		width: 96%;
  		margin-top: -100px;
  		margin-left: 0px;
  	}
  	.btn-mid{
  		width: 80%;
  		margin-left: 22%;
  	}
  	.rightpic{
  		margin-left: 60%;
  		margin-top: -6%;
  	}
  	.plingd{
  		margin-left: -40%;
  	}
  	.prictureperson{
  		margin-left: 100%;
  	}
  }
  /*适应小型电脑屏幕*/
	
	@media (min-width: 768px) and (max-width:1366px) {
		.foucsbtnarea {
			margin-left: 200px;
			margin-top: -40px;
		}
		.countarea {
			margin-left: 300px;
			margin-top: -30px;
		}
		.prictureperson {
			margin-top: 2%;
		}
		.titlearea {
			margin-left: 200px;
		}
		.btn-search {
			margin-left: 320px;
			margin-top: -80px;
		}
		.topmid {
			margin-left: 460px;
			margin-top: -60px;
		}
		.rightpic {
			margin-left: 80%;
			margin-top: -5%;
		}
		.toppre {
			margin-left: 0px;
		}
	}
	/*时间轴样式*/
	
	*,
	*:after,
	*:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	body,
	html {
		font-size: 5%;
		padding: 0;
		margin: 0;
	}
	
	.clearfix:before,
	.clearfix:after {
		content: " ";
		display: table;
	}
	
	.clearfix:after {
		clear: both;
	}
	
	body {
		font-family: 'Lato', Calibri, Arial, sans-serif;
		color: #47a3da;
	}
	
	a {
		color: #f0f0f0;
		text-decoration: none;
	}
	
	a:hover {
		color: #000;
	}
	
	.main,
	.container>header {
		width: 90%;
		max-width: 69em;
		margin: 0 auto;
		padding: 0 1.875em 3.125em 1.875em;
	}
	
	.container>header {
		padding: 2.875em 1.875em 1.875em;
	}
	
	.container>header h1 {
		font-size: 2.125em;
		line-height: 1.3;
		margin: 0 0 0.6em 0;
		float: left;
		font-weight: 400;
	}
	
	.container>header>span {
		display: block;
		position: relative;
		z-index: 9999;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5em;
		padding: 0 0 0.6em 0.1em;
	}
	
	.container>header>span span:after {
		width: 30px;
		height: 30px;
		left: -12px;
		font-size: 50%;
		top: -8px;
		font-size: 75%;
		position: relative;
	}
	
	.container>header>span span:hover:before {
		content: attr(data-content);
		text-transform: none;
		text-indent: 0;
		letter-spacing: 0;
		font-weight: 300;
		font-size: 110%;
		padding: 0.8em 1em;
		line-height: 1.2;
		text-align: left;
		left: auto;
		margin-left: 4px;
		position: absolute;
		color: #fff;
		background: #47a3da;
	}
	
	.container>header nav {
		float: right;
		text-align: center;
	}
	
	.container>header nav a {
		display: inline-block;
		position: relative;
		text-align: left;
		width: 2.5em;
		height: 2.5em;
		background: #fff;
		border-radius: 50%;
		margin: 0 0.1em;
		border: 4px solid #47a3da;
	}
	
	.container>header nav a>span {
		display: none;
	}
	
	.container>header nav a:hover:before {
		content: attr(data-info);
		color: #47a3da;
		position: absolute;
		width: 600%;
		top: 120%;
		text-align: right;
		right: 0;
		pointer-events: none;
	}
	
	.container>header nav a:hover {
		background: #47a3da;
	}
	
	.bp-icon:after {
		font-family: 'bpicons';
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		text-align: center;
		color: #47a3da;
		-webkit-font-smoothing: antialiased;
	}
	
	.container>header nav .bp-icon:after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		line-height: 2;
		text-indent: 0;
	}
	
	.container>header nav a:hover:after {
		color: #fff;
	}
	
	.bp-icon-next:after {
		content: "\e000";
	}
	
	.bp-icon-drop:after {
		content: "\e001";
	}
	
	.bp-icon-archive:after {
		content: "\e002";
	}
	
	.bp-icon-about:after {
		content: "\e003";
	}
	
	.bp-icon-prev:after {
		content: "\e004";
	}
	
	@media screen and (max-width: 55em) {
		.container>header h1,
		.container>header nav {
			float: none;
		}
		.container>header>span,
		.container>header h1 {
			text-align: center;
		}
		.container>header nav {
			margin: 0 auto;
		}
		.container>header>span {
			text-indent: 30px;
		}
	}
	
	.cbp_tmtimeline {
		margin: 30px 0 0 0;
		padding: 0px;
		list-style: none;
		position: relative;
	}
	
	.cbp_tmtimeline:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 10px;
		background: #afdcf8;
		left: 20%;
		margin-left: -10px;
	}
	
	.cbp_tmtimeline>li {
		position: relative;
	}
	
	.cbp_tmtimeline>li .cbp_tmtime {
		display: block;
		width: 30%;
		padding-right: 100px;
		position: absolute;
		top: 6px;
		margin-left: -60px;
	}
	
	.cbp_tmtimeline>li .cbp_tmtime span {
		display: block;
		text-align: right;
	}
	
	.cbp_tmtimeline>li .cbp_tmtime span:first-child {
		font-size: 0.9em;
		color: #3594cb;
	}
	
	.cbp_tmtimeline>li .cbp_tmtime span:last-child {
		font-size: 2.9em;
		color: #3594cb;
	}
	
	.cbp_tmtimeline>li:nth-child(odd) .cbp_tmtime span:last-child {
		color: #3594cb;
	}
	
	.cbp_tmtimeline>li .cbp_tmlabel {
		margin: 0 0 15px 25%;
		background: #3594cb;
		color: #fff;
		padding: 6px;
		font-size: 1.2em;
		font-weight: 300;
		line-height: 1.4;
		width: 220px;	
		position: relative;
		top: 2px;
		border-radius: 5px;
	}
	
	.cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel {
		background: #3594cb;
	}
	
	.cbp_tmtimeline>li .cbp_tmlabel h2 {
		margin-top: 0px;
		padding: 0 0 10px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.4);
	}
	
	.cbp_tmtimeline>li .cbp_tmlabel:after {
		right: 100%;
		content: " ";
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
		border-right-color: #3594cb;
		top: 10px;
	}
	
	.cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {
		border-right-color: red;
	}
	
	.cbp_tmtimeline>li .cbp_tmicon {
		width: 28px;
		height: 28px;
		font-family: 'ecoico';
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 40px;
		-webkit-font-smoothing: antialiased;
		position: absolute;
		color: gray;
		background: #46a4da;
		border-radius: 50%;
		box-shadow: 0 0 0 8px #afdcf8;
		text-align: center;
		left: 20.5%;
		top: 1.3px;
		margin: 6px 0 0 -22px;
	}
	
	.cbp_tmicon-phone:before {
		content: "\e000";
	}
	
	.cbp_tmicon-screen:before {
		content: "\e001";
	}
	
	.cbp_tmicon-mail:before {
		content: "\e002";
	}
	
	.cbp_tmicon-earth:before {
		content: "\e003";
	}
	
	.spantime {
		font-size: 1px;
	}
	
	@media screen and (max-width: 65.375em) {
		.cbp_tmtimeline>li .cbp_tmtime span:last-child {
			font-size: 1.5em;
		}
		.cbp_tmtimeline>li .cbp_tmicon {
			left: 21%;
		}
	}
	
	@media screen and (max-width: 47.2em) {
		.cbp_tmtimeline:before {
			left: 46.4%;
		}
		.cbp_tmtimeline>li .cbp_tmtime {
			width: 100%;
			position: relative;
			padding: 0 0 20px 0;
		}
		.cbp_tmtimeline>li .cbp_tmtime span {
			text-align: left;
		}
		.cbp_tmtimeline>li .cbp_tmlabel {
			margin: -34px 0 30px 110px;
			padding: 1em;
			font-weight: 400;
			font-size: 1%;
			width: 100px;
			height: 40px;
			left: 23%;
		}
		.cbp_tmtimeline>li .cbp_tmlabel:after {
			right: auto;
			left: 20px;
			border-left-color: transparent;
			border-bottom-color: #3594cb;
			border-width: 10px;
			top: -20px;
		}
		.cbp_tmtimeline>li:nth-child(odd) .cbp_tmlabel:after {
			border-right-color: transparent;
			border-bottom-color: #6cbfee;
		}
		.cbp_tmtimeline>li .cbp_tmicon {
			position: relative;
			float: right;
			left: -52%;
			margin: -35px 5px 0 0px;
		}
	}
	
	.cbp_tmtime {
		font-size: 6px;
		margin-top: 3px;
	}
	/*时间轴样式框*/
	.main {
		margin-left: -40px;
		width: 860px;
			}
	
	.cbp_tmlabel {
		width: 80px;
	}
	/*时间轴样式自适应小屏幕*/
	
	@media (min-width: 0px) and (max-width:600px) {
		
		.cbp_tmtimeline>li .cbp_tmtime{
			width: 100%;
			margin-left: 20px;
			top: 12px;
		}
		.cbp_tmtimeline {
			left: 20px;
		}
		
		.cbp_tmtimeline>li .cbp_tmlabel {
			width:150px;
			height:22px;			
			left: -10px;
			top: 2px;
			font-size:0px;
		}
		.cbp_tmtimeline /deep/ .typels{
			font-size: 12px;
			margin-top: 1px;
		}
		.main{
			width: 60%;
			margin-left: -65px;
			
		}
		.cbp_tmtimeline>li .cbp_tmicon {
			width: 28px;
			height: 28px;
			
			margin:-36px 0 0 -60px;
		}
		.typels{
			width: 80%;
		}
		.noneinfo-error{
			width:120%;
			font-size: 10px;
			margin-left: 30px;
		}
		
	}
	
	@media (min-width: 320px) and (max-width:568px) {
		.cbp_tmtimeline>li .cbp_tmtime {
			left: -49%;
		}
		.cbp_tmtimeline>li .cbp_tmicon {
			left: -43%;
		}
	}
	
	@media (min-width: 768px) and (max-width:1024px) {
		.cbp_tmtimeline>li .cbp_tmtime {
			left: -50%;
			width: 80%;
		}
	}
</style>

<script>
	import HeaderModal from './header'
	export default {
		data: function() {
			return {
				role:this.role,
				//反馈模态框默认为关闭
				showqf: false,
				//关注模态框默认为关闭
				showf: false,
				//创建关注类模态框默认为关闭
				showc: false,
				showall:false,
				//反馈问题类型
				questiontypes: [{
						text: '请选择问题类型',
						value: null
					},
					'标签问题', '数据问题', '分类问题', '其他'
				],
				
				form: {
					keyword: '',
					text: '',
					title: '',
					descontent: ''

				},
				dis: false,				
				infos: [],
				//时间轴信息				
				
				results: [{
					lable: '#施工'
				}, {
					lable: '#设计'
				}, {
					lable: '#系统集成'
				}, {
					lable: '#施工'
				}, {
					lable: '#施工'
				}, {
					lable: '#网络覆盖'
				}, {
					lable: '#监听'
				}],
				typess: ['信息图表'],
				//关注信息
				foucss: [],
				//项目所有信息
				sites: [],
				times:[],				
			}
		},
		 components:{
          HeaderModal
         },

          mounted: function() {
				window.history.back();
		     
			},
		created: function() {

			//页面加载获取用户信息
			var self = this;
			self.usermsg = window.localStorage.getItem('usermsg');
			var usermsg = self.usermsg;
			var usermsg = eval("(" + usermsg + ")");
			self.usermsg = usermsg;
			self.token = self.usermsg.token;
			var token = self.token;
			self.role=self.usermsg.role;
			//获取home页面传来的id
			var url = window.location.href;
			this.url = url;	
			var str = url.substr(url.indexOf("&id")+4); 						
			var strs = str.replace(/%2F/g,"/");			
			this.str = strs;
			console.log(this.str);
			var formData = new FormData();
			formData.append("announcementId", this.str);
			var Formdatas = new FormData();
			Formdatas.append("ids", this.str);
			//判断项目是否被关注
			this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/userservice/favorite/isExitedlFavorite',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': this.token
						},
						data: {
							announcementId: str
						}
					}).then(function(response) {
						if(response.data.state == 'success') {
							 this.showff=false;
                             this.showunf=true;
						} else if(response.data.state == 'existed') {

							console.log(response);
                            this.showff=true;
                            this.showunf=false;
						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))

			//查询所有项目信息
			this.$ajax({
					method: 'post',

					url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/select/searchContentsByIDs',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': this.token
					},
					data: Formdatas
				}).then(function(response) {
					if(response.data.state == 'success') {
						console.log("公告信息");
						console.log(response);
						this.showall=true;
						var sites = response.data.data;
						//var sites=response.data.data[str];
						this.sites = sites;
						var content = response.data.data[this.str].content;
						//console.log(content);
						var newcontent = content.replace(/&nbsp/g, "");
						var newc = newcontent.replace(/&nbsp/g, "");
                        var content=content.match(/[\u4E00-\uFA29](\S*)/)[0];
                        
						this.sites[this.str].content = newc;
						this.sites[this.str].content=content;
						//console.log(this.sites[str].content);
						var tag = response.data.data[this.str].tenderTags;
						var tagarry = [];
						//var newtag=tag.split(",");
						if(tag == null || tag.length == 0) {
							tagarry = null;
						} else {
							tagarry = tag.substr(0, tag.length - 1).split(",");
							this.sites[this.str].tenderTags = tagarry;
						}

						
						
						if(response.data.data[str].type=='招标公告') {
							this.$ajax({
									method: 'post',
									url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/getcyclebyID',
									headers: {
										'Content-Type': 'application/json',
										'Authorization': this.token
									},
									data: {
										announcement_id:this.str
									}

								}).then(function(response) {
									if(response.data.state == 'success') {
										var timeArry = response.data.Date;
										this.$data.times = timeArry;
                                         console.log(response);
										if(response.data.Date.length == 0) {
										$(".noneinfo-error").show();
										}
									}
								}.bind(this))
								.catch(function(err) {
									console.log(err);
								}.bind(this))
						} else {
							//按不是招标公告的其他公告查询
							
							this.$ajax({
									method: 'post',
									url: 'https://recruitment.cqcyit.com:8090/cqcyit.select/getcyclebyother_ID',
									headers: {
										'Content-Type': 'application/json',
										'Authorization': this.token
									},
									data: {
										other_announcement_id:this.str
									}

								}).then(function(response) {
									if(response.data.state == 'success') {

										var timeArry = response.data.Date;
										this.$data.times = timeArry;
										console.log(response);
										if(response.data.Date.length == 0) {
										$(".noneinfo-error").show();
										}
									} else {

									}
								}.bind(this))
								.catch(function(err) {
									console.log(err)
								}.bind(this))
						}
					} else {
						if(response.data.length == 0) {

						} else {

						}
						alert("查询信息失败");
						$(".prenoneinfo-error").show();
					}
				}.bind(this))
				.catch(function(err) {
					console.log(err)
				}.bind(this))
			//查询项目被关注人数
			this.$ajax({
					method: 'post',
					url: 'https://recruitment.cqcyit.com:8090/userservice/attention/attentionCount',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': this.token
					},
					data: formData

				}).then(function(response) {
					if(response.data.state == 'success') {
						var infoArry = response.data;
						this.infos = infoArry;

					} else {

					}
				}.bind(this))
				.catch(function(err) {
					console.log(err)
				}.bind(this))

		},

		methods: {
			/*
			 * 按招标类型查询
			 */
			searchann: function() {
				
			},

			/*
			 * 
			 * 按标签查询
			 * 
			 */
			delmodalmymo:function(){
				this.showqf=false;
			},
			delmodalmyfomo:function(){
				this.showf=false;
			},
			delmodalmycfomo:function(){
				this.showc=false;
			},
			searchbytag: function(items) {
				this.form.keyword=items;
				
				this.$router.push({name: 'homeThree',params: {token:this.token,keyword:this.form.keyword}});
				

			},
			/**
			 * 查询所有关注类型和该项目下收藏的数量
			 */
			addfoucsmount: function() {
				var _this = this;
				var token = _this.token;
				var str = _this.str;
				this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/userservice/favorite/isExitedlFavorite',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': this.token
						},
						data: {
							announcementId: str
						}
					}).then(function(response) {
						if(response.data.state == 'success') {
							this.$ajax({
								method: 'post',
								url: 'https://recruitment.cqcyit.com:8090/userservice/group/queryGroupsAndCount',
								headers: {
									'Content-Type': 'application/json',
									'Authorization': this.token
								},
							}).then(function(response) {
								if(response.data.state == 'success') {

									var foucss= response.data.data;
									this.foucss = foucss;
									this.showc = false;
								} else {

								}
							}.bind(this))

						} else if(response.data.state == 'existed') {

							console.log(response);
							//alert("信息已被关注");
							this.dis = true;
							
							$('.fouinf-error').show();

							//			            var foucs= response.data.data;
							//			          	foucs.foreach(
							//							function(e){
							//								alert(e);
							//								$("#foucsbtncon").attr("disabled","true");
							//							}
							//						)
							//$("#foucsbtncon").attr("disabled","true");

							this.$ajax({
								method: 'post',
								url: 'https://recruitment.cqcyit.com:8090/userservice/group/queryGroupsAndCount',
								headers: {
									'Content-Type': 'application/json',
									'Authorization': this.token
								},
								announcementId: str

							}).then(function(response) {
								if(response.data.state == 'success') {
									var foucsArry = response.data.data;
									this.$data.foucss = foucsArry;
									var foucs = response.data.data;

								} else {

								}
							}.bind(this))

						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))

			},
			
			/**
			 * 获取反馈需要的参数
			 * @param {Object} title 被反馈信息标题
			 * @param {Object} contentUrl 被反馈信息路径
			 * @param {Object} id 被反馈信息id
			 */
			feedback: function(title, contentUrl, id) {
				this.feedbackTitle = title;
				this.feedbackUrl = contentUrl;
				this.feedbackId = id;
				this.form.questiontype = null;
				this.form.text = '';
			},
			/**
			 * 提交反馈信息
			 */
			onSubmit(evt) {
				var _this = this;
				var token = _this.token;
				evt.preventDefault();
				JSON.stringify(this.form);
				var formdata = JSON.stringify(this.form);

				var obj = eval("(" + formdata + ")");
				var questiontype = obj.questiontype;
				var text = obj.text;
				var regdes = {
					regdescribtion: /[^u4E00-u9FA5]/
				};
				var describtion = regdes.regdescribtion.test(text);
				if(describtion == false) {
					$('.des-lable').text('');
					$('.des-lable').append("请输入中文");
					$('.des-error').show();
				} else {
					$('.des-lable').text('');
					$('.des-error').hide();
				}
				if(questiontype == null) {
					$('.type-error').show();
				} else {
					$('.type-error').hide();
				}
				if(describtion !== false && questiontype !== null) {
					this.$ajax({
							method: 'post',
							url: 'https://recruitment.cqcyit.com:8090/userservice/feedback/save',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': this.token
							},
							data: {
								title: this.feedbackTitle,
								url: this.feedbackUrl,
								message: this.feedbackId,
								type: questiontype,
								describes: text,
							}

						}).then(function(response) {
							if(response.data.state == 'success') {
								
								this.form.questiontype = null;
								this.form.text = '';
								alert("我们已收到您的反馈信息，会尽快解决问题");
								this.showqf = false;
							} else {
								alert("输入有误");
								this.form.questiontype = null;
								this.form.text = ''

							}
						}.bind(this))
						.catch(function(err) {
							console.log(err)
						}.bind(this))
				} else {

				}

			},
			/*
			 * 重置反馈模态框
			 */
			onReset(evt) {
				evt.preventDefault();
				this.form.questiontype = null;
				this.form.text = ''

			},
			/**
			 * 返回添加关注模态框
			 */
			backpre: function() {
				this.showf = true;

			},
			/**
			 * 关注某个类型
			 */
			foucstit: function(title, id, contentUrl, ids) {

				var _this = this;
				var token = _this.token;
				var foucs = this.$data.foucss;
				var site = this.$data.sites;
				var infos=this.$data.infos;
				this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/userservice/favorite/addFavorite',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': this.token
						},
						data: {
							title: title,
							groupId: id,
							url: contentUrl,
							announcementId: ids
						}

					}).then(function(response) {
						if(response.data.state == 'success') {
							//console.log(++infos.data.attentionCount);
							infos.data.attentionCount++;
							this.showff=true;
                            this.showunf=false;
							//location.reload();												  
							this.showf = false;

						} else {}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))
			},
			/**
			 * 分享微博
			 */
			shareWeibo: function(title, url)

			{

				window.open("http://service.weibo.com/share/share.php?title=" + title + "&url=" + url + "&language=zh_cn")
				//	window.open('http://v.t.sina.com.cn/share/share.php?title='+encodeURIComponent(document.title)+'&url='+encodeURIComponent(location.href)+'&source=bookmark','_blank','width=450,height=400′);
				// var sharesinastring='g='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url;  
				//window.open(sha(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
			},
			/**
			 * 分享微信
			 */
			shareWeixin: function() {
				//        
				//        wx.config({
				//        debug: false,
				//        appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
				//        timestamp:timestamp, // 必填，生成签名的时间戳
				//        nonceStr: nonceStr, // 必填，生成签名的随机串
				//        signature: signature,// 必填，签名，见附录1
				//        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
				//        jsApiList: [
				//          'onMenuShareAppMessage','onMenuShareTimeline',
				//          'onMenuShareQQ','onMenuShareQZone'
				//        ]
				//      });
				//       //处理验证失败的信息
				//      wx.error(function (res) {
				//        logUtil.printLog('验证失败返回的信息:',res);
				//      });
				//      //处理验证成功的信息
				//      wx.ready(function () {
				//      //              alert(window.location.href.split('#')[0]);
				//        //分享到朋友圈
				//        wx.onMenuShareTimeline({
				//          title: _this.newDetailObj.title, // 分享标题
				//          link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				//          imgUrl: _this.newDetailObj.thu_image, // 分享图标
				//          success: function (res) {
				//            // 用户确认分享后执行的回调函数
				//            logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
				//            _this.showMsg("分享成功!")
				//          },
				//          cancel: function (res) {
				//            // 用户取消分享后执行的回调函数
				//            logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
				//          }
				//        });
				//        //分享给朋友
				//        wx.onMenuShareAppMessage({
				//          title: _this.newDetailObj.title, // 分享标题
				//          desc: _this.desc, // 分享描述
				//          link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				//          imgUrl: _this.newDetailObj.thu_image, // 分享图标
				//          type: '', // 分享类型,music、video或link，不填默认为link
				//          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				//          success: function (res) {
				//            // 用户确认分享后执行的回调函数
				//            logUtil.printLog("分享给朋友成功返回的信息为:",res);
				//          },
				//          cancel: function (res) {
				//            // 用户取消分享后执行的回调函数
				//            logUtil.printLog("取消分享给朋友返回的信息为:",res);
				//          }
				//        });
				//        //分享到QQ
				//        wx.onMenuShareQQ({
				//          title: _this.newDetailObj.title, // 分享标题
				//          desc: _this.desc, // 分享描述
				//          link: window.location.href.split('#')[0], // 分享链接
				//          imgUrl: _this.newDetailObj.thu_image, // 分享图标
				//          success: function (res) {
				//            // 用户确认分享后执行的回调函数
				//            logUtil.printLog("分享到QQ好友成功返回的信息为:",res);
				//          },
				//          cancel: function (res) {
				//            // 用户取消分享后执行的回调函数
				//            logUtil.printLog("取消分享给QQ好友返回的信息为:",res);
				//          }
				//        });
				//
				//        //分享到QQ空间
				//        wx.onMenuShareQZone({
				//          title: _this.newDetailObj.title, // 分享标题
				//          desc: _this.desc, // 分享描述
				//          link: window.location.href.split('#')[0], // 分享链接
				//          imgUrl: _this.newDetailObj.thu_image, // 分享图标
				//          success: function (res) {
				//            // 用户确认分享后执行的回调函数
				//            logUtil.printLog("分享到QQ空间成功返回的信息为:",res);
				//          },
				//          cancel: function (res) {
				//            // 用户取消分享后执行的回调函数
				//            logUtil.printLog("取消分享到QQ空间返回的信息为:",res);
				//          }
				//        });
				//      });
			},
			/*
			 * 创建关注类
			 */
			createf(evt) {
				var _this = this;
				var token = _this.token;
				var foucss=this.foucss;
				console.log(foucss);
				evt.preventDefault();
				JSON.stringify(this.form);
				var formdata = JSON.stringify(this.form);
				var obj = eval("(" + formdata + ")")
				var title = obj.title;
				var descontent = obj.descontent;
				var regtitle = {
					regtitles: /[^u4E00-u9FA5]/
				};
				var regtitle1 = regtitle.regtitles.test(title);
				if(regtitle1 == false) {
					$('.title-lable').text('');
					$('.title-lable').append("请输入中文");
					$('.title-error').show();
				} else {
					$('.title-lable').text('');
					$('.title-error').hide();
				}
				var regdescontent = {
					regdescontents: /[^u4E00-u9FA5]/
				};
				var regdescontent1 = regdescontent.regdescontents.test(descontent);

				console.log("regdescontent1:");
				console.log(regdescontent1);
				if(regdescontent1 == false) {
//					console.log("regdescontent2:");
//					console.log(regdescontent1);
//					$('.quedes-lable').text('');
//					$('.quedes-lable').append("请输入中文");
//					$('.quedes-error').show();
				} else {
//					$('.quedes-lable').text('');
//					$('.quedes-error').hide();
				}
				
				var len=foucss.length;
                for (var i=0;i<foucss.length;i++) {
                	if (title==foucss[i].title) {
                		alert("您已经创建过该类型");
                		len =len-1;
                		
                	}else{
           						     
			}

		}
               if(len==foucss.length){
               	this.$ajax({
						method: 'post',
						url: 'https://recruitment.cqcyit.com:8090/userservice/group/addGroup',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': this.token
						},
						data: {
							title: title,
							descriptions: descontent
						}

					}).then(function(response) {
						if(response.data.state == 'success') {
							this.showc = false;
							this.form.title = '';
							this.form.descontent = '';

						} else {
							this.show = false;
							this.form.questiontype = null;
							this.form.text = ''

						}
					}.bind(this))
					.catch(function(err) {
						console.log(err)
					}.bind(this))
                	}
                }
               }
		
                

	}
</script>


