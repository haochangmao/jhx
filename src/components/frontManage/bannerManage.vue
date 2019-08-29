<template> 
<div>
    <div class="jhx banner_manage">
		<h3>轮播图管理</h3>
		<div class="pic_con">
			<div class="pic_item_con" v-for="(i,ind) in dataList">
				<div class="pic_item">
					<p class="title">{{i.title}}</p>
					<div class="img_con">
						<input type="file" class="unload_img" ref="file" @change="getSrc($event,ind,i.imgId)" @mouseenter="bgChange(ind)" @mouseout="bgChange">
						<img :src="i.src" alt="">
						<!-- <textarea cols="20" rows="10" v-model="i.src" style="opacity: 0;"></textarea> -->
						<div class="load_tip" :class="[i.cur,{'cur1':i.src!=''}]">点击选择上传的图片</div>
					</div>
					<div class="img_inf">
						<!-- <span class="img_src"></span> -->
						<!-- <span class="btn_s copy_src" :id="'copy'+ind" :data-clipboard-text='i.src' :class="i.src==''?'grey':''" @click="i.src!='' && copyLink(ind)">复制链接</span> -->
						<input type="text" placeholder="跳转链接" v-model="i.jumpLinks">
						<span class="btn_s" :class="(i.jumpLinks==''||i.src=='')?'grey':''" @click="(i.jumpLinks!=''&&i.src!='') && saveLinks(i.jumpLinks,i.uploadId)">保存</span>
						<span class="btn_s" :class="i.src==''?'grey':''" @click="i.src!='' && deletePic(i.imgId)">删除</span>
					</div>
				</div>
			</div>
		</div>
    </div>
	<load :loadTxt="loadTxt" v-show="!deleteFlag" class="deleteFlag"></load>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import load from '../component/plugin/load.vue';
import Clipboard from 'clipboard';

export default {
    data () {
        return {
			src:"",
			flag:false,
			url:"",
			data:{
				
			},
			upLoadData:{},
			jumpLinks:"",
			dataList:[
				{
					title:"位置一",
					src:"",
					imgId:"",
					cur:"",
					uploadId:"",
					jumpLinks:""
				},{
					title:"位置二",
					src:"",
					imgId:"",
					cur:"",
					uploadId:"",
					jumpLinks:""
				},{
					title:"位置三",
					src:"",
					imgId:"",
					cur:"",
					uploadId:"",
					jumpLinks:""
				},{
					title:"位置四",
					src:"",
					imgId:"",
					cur:"",
					uploadId:"",
					jumpLinks:""
				},{
					title:"位置五",
					src:"",
					imgId:"",
					cur:"",
					uploadId:"",
					jumpLinks:""
				},
				
			],
			loadTxt:"",
			deleteFlag:true
        }
    },
	components: {
		load:load
	},
    mounted(){
		this.getData();
    },
    methods: {
		bgChange(index){
			this.flag = !this.flag;
			if(this.flag){
				this.dataList[index].cur = "cur";
			}else{
				for(var i=0;i<this.dataList.length;i++){
					this.dataList[i].cur = "";
				}
			}
		},
		getData(){
			var that = this;
			// for(var j=0;j<5;j++){
			// 	that.dataList[i].src = that.data[i].downloadUrl;
			// 	that.dataList[i].imgId = that.data[i].imgId;
			// }
			util.ajax({
				url:API_HOST+"/manager/banner/query",
				data:{},
				success:function(data){
					that.data = data.data;
					for(var i=0;i<5;i++){
						that.dataList[i].src = that.data[i] ? that.data[i].downloadUrl : '';
						that.dataList[i].imgId = that.data[i] ? that.data[i].imgId : '';
						that.dataList[i].jumpLinks = that.data[i] ? that.data[i].jumpLinks : '';
						that.dataList[i].uploadId = that.data[i] ? that.data[i].uploadId : '';
					}
				}
			})
		},
		getSrc(e,index,id){
			var that = this;
			var file = e.target.files[0];
			console.log(index)
			console.log(id)
			console.log(that.data.length);
			if(that.data.length>=index+1){
				that.deletePic(id);
			}
			util.ajax({
				url:API_HOST+"/manager/upload/init",
				data:{
					type:0,
					fileSuffix:"jpg",
					uploadType:"PUT"
				},
				success:function(data){
					that.upLoadData = data.data;
					var xhr = new XMLHttpRequest();
					xhr.open("PUT", that.upLoadData.uploadUrl, true);
					xhr.setRequestHeader("x-amz-acl","public-read");
					xhr.send(file);
					xhr.onreadystatechange = function(){
						if(xhr.status == 200 && xhr.readyState == 4){
							that.savePic();
						}
					}
				}
			});
			
		},
		savePic(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/banner/save",
				data:{
					shopId:"0",
					uploadId:that.upLoadData.uploadId,
					jumpLinks:that.jumpLinks
				},
				success:function(data){
					if(data.code!=200){
						console.log(2)
						that.deleteFlag = false;
						that.loadTxt = "上传失败";
					}else{
						that.getData();
					}
					that.setTimeout();
				},
				error:function(){
					that.deleteFlag = false;
					that.loadTxt = "上传失败";
					that.setTimeout();
				}
			})
		},
		saveLinks(jumpLinks,uploadId){
			this.jumpLinks = jumpLinks;
			this.upLoadData.uploadId = uploadId;
			this.savePic();
		},
		deletePic(id){
			var that = this;
			console.log(id)
			util.ajax({
				url:API_HOST+"/manager/shopAlbum/delete",
				data:{
					imgId:id
				},
				success:function(data){
					if(data.code!=200){
						that.deleteFlag = false;
						that.loadTxt = "删除失败";
					}else{
						that.getData();
					}
					that.setTimeout();
				},
				error:function(){
					that.deleteFlag = false;
					that.loadTxt = "删除失败";
					that.setTimeout();
				}
			})
		},
		copyLink(index){
			var clipboard = new Clipboard('#copy'+index),that = this;
       			clipboard.on('success', e => {
	          		that.deleteFlag = false;
					that.loadTxt = "复制成功";
					that.setTimeout();
	          		clipboard.destroy()
        		});
				clipboard.on('error', e => {
          			that.deleteFlag = false;
					that.loadTxt = "复制失败";
					that.setTimeout();
          			clipboard.destroy()
        		});
		},
		setTimeout(){
			var that = this;
			setTimeout(function(){
				that.loadTxt = "";
				that.deleteFlag = true;
			},1000)
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.banner_manage{
	.pic_con{
		height: 100%;
		display: flex;
		flex-wrap:wrap;
		align-content: flex-start;
		padding: 0 30px;
		.pic_item_con{
			width: 33.33%;
			margin-top: 30px;
			.pic_item{
				width: 300px;
				height: 239px;
				margin: 0 auto;
				border: 1px solid #309caf;
				border-radius: 4px;
				.title{
					font-size: 14px;
					font-weight: 400;
					height: 26px;
					line-height: 26px;
					text-indent: 10px;
				}
				.img_con{
					height: 150px;
					border-top:1px dashed #309caf;
					border-bottom:1px dashed #309caf;
					position: relative;
					.unload_img{
						width: 100%;
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						opacity: 0;
						z-index: 1000;
						cursor: pointer;
					}
					img{
						width: 100%;
						height: 100%;
						z-index: 998;
					}
					.load_tip{
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						line-height: 150px;
						text-align: center;
						color: #96a0bd;
						font-size: 18px;
						z-index: 999;
						background: rgba(0,0,0,.1);
						&.cur1{
							display: none;
						}
						&.cur{
							display: block;
							background: rgba(0,0,0,.3);
							color: #fff;
						}
					}
				}
				.img_inf{
					margin: 6px 0;
					span{
						float: left;
						font-size: 12px;
						height: 20px;
						line-height: 20px;
						margin:5px 0 0 140px;
						&:nth-of-type(2){
							margin-left: 5px;
						}
					}
					input{
						height: 20px;
						line-height: 20px;
						text-indent: 5px;
						margin-left: 10px;
						width: 278px;
					}
				}
				span.grey{
					cursor: not-allowed;
					border: 1px solid grey;
					color: grey;
					&:hover{
						background: #fff;
					}
				}
			}
		}
	}
}
.deleteFlag{
		position: fixed;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>



