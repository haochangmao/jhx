<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <div class="renovation_con">
				<div class="renovation clear">
					<div class="l">
						<div class="renovation_item shop_info">
							<p class="renovation_title">机构信息</p>
							<p class="renovation_text">机构ID：<span>{{shopId}}</span>机构名称：<span>{{shopData.shopName}}</span></p>
						</div>
						<div class="renovation_item video_pic">
							<p class="renovation_title tab">
								<span :class="num==0?'active':''" @click="tab(0)">视频管理</span>
								<span :class="num==1?'active':''" @click="tab(1)">图片管理</span>
							</p>
							<div class="video_con clear" v-show="num==0" @scroll="scrollLoadVdieo($event)">
								<ul class="clear">
									<li class="l" v-for="i in videoPicData.videoData" @click="playVideo(i.videoUrl,1)">
										<div class="video_item">
											<span class="play_btn"><span class="arrow arrow_play"></span></span>
											<img :src="i.coverImgUrl"></img>
											<p><span class="video_name">{{i.videoName}}</span><span>{{i.sortNum==1?'置顶':''}}</span></p>
											<p><span class="video_date">2019年08月22日</span><span class="video_view">{{i.playNumber}}</span></p>
										</div>
									</li>
								</ul>
							</div>
							<div class="pic_con video_con clear" v-show="num==1" @scroll="scrollLoadPic($event)">
								<ul class="clear">
									<li class="l" v-for="i in videoPicData.picData" @click="playVideo(i.imgUrl,2)">
										<div class="video_item">
											<img :src="i.imgUrl"></img>
											<p><span class="video_name">{{i.imgName}}</span><span>{{i.sortNum==1?'置顶':''}}</span></p>
											<p><span class="video_date">2019年08月22日</span><span class="video_view">{{i.playNumber}}</span></p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="l">
						<div class="renovation_item shop_yunying">
							<p class="renovation_title">机构运营</p>
							<div>
							<ul>
								<li>
									<label>宣传视频</label>
									<div class="promotional_video" @click="playVideo(yunyingData.videoData.videoUrl,1)">
										<span class="play_btn"><span class="arrow arrow_play"></span></span>
										<img :src="yunyingData.videoData.coverImgUrl" alt="">
									</div>
								</li>
								<li>
									<label>轮播图</label>
									<div class="shop_banner">
										<div v-for="i in yunyingData.picData" @click="playVideo(i.imgUrl,2)">
											<img :src="i.imgUrl" alt="" v-for="">
										</div>
									</div>
								</li>
								<li>
									<label>基本简介</label>
									<div>
										<dl>
											<dt>营业时间</dt>
											<dd>{{shopData.openHours}}</dd>
											<dt>核心理念</dt>
											<dd>{{shopData.coreIdea}}</dd>
											<dt>师资力量</dt>
											<dd class="teacher_intro clear">
												<div class="l" v-for="i in yunyingData.teacherData">
													<div>
														<img :src="i.teacherImg" alt="">
													</div>
													<p>{{i.teacherName}}</p>
													<p>{{i.teacherDesc}}</p>
												</div>
											</dd>
										</dl>
									</div>
								</li>
							</ul>
							</div>
						</div>
					</div>
				</div>	
				<div class="play_video" v-show="videoShow">
					<span class="close_video btn_s" @click="closeVideo">{{picOrVideo==1?'关闭视频':'关闭图片'}}</span>
					<video :src="videoUrl" height="480" controls="controls" autoplay="autoplay" v-show="picOrVideo==1"></video>
					<img :src="videoUrl" height="480" alt="" v-show="picOrVideo==2">
				</div>
			</div>
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
	          <div>
	            <button @click="pass(true)" v-show="false" class="btn_s">
	              {{modalConfig.btnSubmitText || "确定"}}
	            </button>
				<button @click="confirmCancel" v-show="modalConfig.btnCancelText!=''" class="btn_s">
	              {{ modalConfig.btnCancelText || "取消" }}
	            </button>
	          </div>
	        </div>
			<load :loadTxt="loadTxt" v-show="submitStatus" class="cur"></load>
			
	      </div>
	    </transition>
		</div>
	  </div>
	</transition>
</template>

<script>
import util from '../../../js/common/util';
import load from '../plugin/load.vue';
  export default {
    props: {
		modalOptions: {
			type: String,
			required: true,
		}
	},
	components: {
		load:load
	},
    data() {
		return {
			show: false,
			shopId:"",
			shopData:{},
			videoPicData:{
				videoData:[],
				picData:[]
			},
			yunyingData:{
				videoData:{},
				picData:[],
				teacherData:[]
			},
			modalConfig:{
				title: "机构装修信息",
				width: 1160,
				height: 610,
				btnSubmitText: "编辑",
				btnCancelText:"关闭"
			},
			videoUrl:"",
			videoShow:false,
			picOrVideo:null,
			num:0,
			videoPage:1,
			videoTotal:"",
			picPage:1,
			picTotal:"",
			teacherPage:1,
			teacherTotal:"",
			submitStatus:false,
			loadTxt:""
		}
    },
	watch:{
		modalOptions(){
			this.shopId = this.modalOptions;
			this.videoPicData.videoData = [];
			this.videoPicData.picData = [];
			this.yunyingData.teacherData = [];
			this.videoPage = 1;
			this.picPage = 1;
			this.teacherPage = 1;
			this.num = 0;
			this.shopBasic();
			this.shopVideo();
			this.shopAlbum();
			this.promotionalVideo();
			this.shopBanner();
			this.teacher();
		}
	},
    methods: {
		tab(index){
			this.num = index;
		},
		closeModel: function () {
			this.closeVideo();
			this.show = false;
		},
		showModel: function () {
			this.show = true;
		},
		confirmCancel: function () {
			this.closeVideo();
			this.show = false;
		},
		pass: function (flag) {
			var that = this;
		},
		shopBasic(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shopBasic/query",
				data:{
					shopId:that.shopId
				},
				success:function(data){
					console.log('shopBasic',data)
					that.shopData = data.data;
				}
			})
		},
		shopVideo(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shopVideo/query",
				data:{
					shopId:that.shopId,
					page:that.videoPage
				},
				success:function(data){
					console.log('shopVideo',data)
					that.videoTotal = data.total;
					that.videoPicData.videoData = that.videoPicData.videoData.concat(data.data);
				}
			})
		},
		shopAlbum(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shopAlbum/query",
				data:{
					shopId:that.shopId,
					page:that.picPage
				},
				success:function(data){
					console.log('shopAlbum',data)
					that.picTotal = data.total;
					that.videoPicData.picData = that.videoPicData.picData.concat(data.data);
				}
			})
		},
		promotionalVideo(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/promotionalVideo/query",
				data:{
					shopId:that.shopId
				},
				success:function(data){
					that.yunyingData.videoData = data.data;
					console.log('promotionalVideo',data)
				}
			})
		},
		shopBanner(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shopBanner/query",
				data:{
					shopId:that.shopId
				},
				success:function(data){
					console.log('shopBanner',data)
					that.yunyingData.picData = data.data;
				}
			})
		},
		teacher(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/teacher/query",
				data:{
					shopId:that.shopId,
					page:that.teacherPage
				},
				success:function(data){
					console.log('teacher',data)
					that.teacherTotal = data.total;
					that.yunyingData.teacherData = that.yunyingData.teacherData.concat(data.data);
					if(that.yunyingData.teacherData.length < that.teacherTotal){
						that.teacherPage++;
						that.teacher();
					}
					console.log(123,that.yunyingData.teacherData)
				}
			})
		},
		scrollLoadVdieo(e){
			if(this.num == 0 && e.path[0].scrollHeight - e.path[0].offsetHeight == e.path[0].scrollTop && this.videoPicData.videoData.length<this.videoTotal){
				this.videoPage++;
				this.shopVideo();
			}
		},
		scrollLoadPic(e){
			if(this.num == 1 && e.path[0].scrollHeight - e.path[0].offsetHeight == e.path[0].scrollTop && this.videoPicData.picData.length<this.picTotal){
				this.picPage++;
				this.shopAlbum();
			}
		},
		playVideo(data,i){
			this.videoUrl = data;
			this.picOrVideo = i;
			this.videoShow = true;
		},
		closeVideo(){
			this.videoUrl = "";
			this.videoShow = false;
			this.picOrVideo = null;
		},
		setTimeout(){
			var that = this;
			setTimeout(function(){
				that.submitStatus = false;
			},1000)
		}
    }
  }
</script>

<style lang="scss" scoped>
	.renovation_con{
		position: absolute;
		top:41px;;
		bottom:56px;
		 left: 0;
		 right: 0;
		overflow: auto;
		.play_video{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0,0,0,.3);
			.close_video{
				position: absolute;
				top: 10px;
				right: 10px;
			}
			video,img{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);  
			}
		}
		.renovation{
			height: 100%;
			font-size: 14px;
			font-weight: 300;
			>div{
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				.renovation_item{
					margin: 10px 5px 0 10px;
					border: 1px solid lightgray;
					border-radius: 3px;
					.renovation_title{
						height: 26px;
						line-height: 26px;
						background: aqua;
						text-indent: 15px;
						&.tab{
							span{
								margin-right:15px;
								cursor: pointer;
								&.active{
									color: blue;
								}
							}
						}
					}
					.renovation_text{
						height: 40px;
						line-height: 40px;
						margin-left: 15px;
						span{
							margin-right: 20px;
						}
					}
					&.video_pic{
						flex:1;
						.video_con{
							width: 100%;
							height: 389px;
							overflow: auto;
							li{
								width: 170px;
								border: 1px solid lightgray;
								border-radius: 3px;
								margin:10px 0 10px 12px;
								font-size: 12px;
								.video_item{
									position: relative;
									cursor: pointer;
									.play_btn{
										position: absolute;
										top: 25px;
										left: 69px;
										width: 30px;
										height: 30px;
										border: 1px solid #fff;
										border-radius: 50%;
									}
									img{
										width: 100%;
										height: 85px;
									}
									p{
										padding: 3px 5px 0 5px;
										span:nth-of-type(2){
											float: right;
										}
									}
								}
							}
						}
					}
					&.shop_yunying{
						flex:1;
						position: relative;
						>div{
							position: absolute;
							top: 26px;
							left: 0;
							right: 0;
							bottom: 0;
							overflow: auto;
						}
						ul{
							li{
								margin:10px 0 0 11px;
								&:after{
									content: "";
									display: block;
									clear: both;
								}
								>label{
									float: left;
									width: 60px;
									text-align: right;
								}
								>div{
									float: left;
									margin-left: 10px;
									&.shop_banner{
										width: 450px;
										>div{
											width: 130px;
											height: 70px;
											float: left;
											margin: 0 10px 10px 0;
										}
									}
									dt{
										font-weight: 400;
									}
									dd{
										margin:10px 0;
										width: 460px;
										line-height: 20px;
										font-size: 12px;
										&.teacher_intro{
											text-align: center;
											>div{
												margin:0 15px 10px 0 ;
												>div{
													width: 100px;
													height: 110px;
												}
											}
										}
									}
									&.promotional_video{
										position: relative;
										width: 170px;
										height: 85px;
										cursor: pointer;
										.play_btn{
											position: absolute;
											top: 25px;
											left: 69px;
											width: 30px;
											height: 30px;
											border: 1px solid #fff;
											border-radius: 50%;
										}
									}	
									img{
										width: 100%;
										height: 100%; 
									}
								}
							}
						}
					}
				}
				&:nth-child(2){
					.renovation_item{
						margin: 10px 10px 0 5px;
					}
				}
			}
		}
	}
	
	
</style>
