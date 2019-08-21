<template> 
<div>
    <div class="jhx banner_manage">
		<h3>轮播图管理</h3>
		<div class="pic_con">
			<div class="pic_item_con" v-for="(i,ind) in dataList">
				<div class="pic_item">
					<p class="title">{{i.title}}</p>
					<div class="img_con">
						<input type="file" class="unload_img" ref="file" @change="getSrc($event,ind)" @mouseenter="bgChange(ind)" @mouseout="bgChange">
						<img :src="i.src" alt="">
						<div class="load_tip" :class="[i.cur,{'cur1':i.src!=''}]">点击选择上传的图片</div>
					</div>
					<div class="img_inf">
						<span class="img_src"></span>
						<span class="btn_s copy_src">复制链接</span>
						<span class="btn_s" @click="upLoad">上传</span>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
</template> 

<script>
	
import util from '../../js/common/util';

export default {
    data () {
        return {
			src:"",
			flag:false,
			fileData:null,
			url:"",
			data:{
				
			},
			dataList:[
				{
					title:"位置一",
					src:"",
					cur:""
				},{
					title:"位置二",
					src:"",
					cur:""
				},{
					title:"位置三",
					src:"",
					cur:""
				},{
					title:"位置四",
					src:"",
					cur:""
				},{
					title:"位置五",
					src:"",
					cur:""
				},
				
			]
        }
    },

    mounted(){
		var that = this;
		this.getData();
		
		util.ajax({
			url:API_HOST+"/manager/upload/init",
			data:{
				type:0,
				fileSuffix:"jpg"
			},
			success:function(data){
				console.log(111,data)
				that.url = data.data;
			}
		})
    },
    methods: {
		getSrc(e,index){
			var that = this;
			var file = e.target.files[0];
			console.log(file)
			this.fileData =e.target.files[0]; 
			var reader = new FileReader();
			reader.readAsDataURL(file)
			reader.onload = function(e) {
				that.dataList[index].src = this.result;
			}
		},
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
			util.ajax({
				url:API_HOST+"/manager/banner/query",
				data:{},
				success:function(data){
					that.data = data.data;
					console.log(data)
					that.dataList.src = that.data
					for(var i=0;i<that.data.length;i++){
						that.dataList[i].src = that.data[i].downloadUrl;
					}
				}
			})
		},
		uploadForImage (url,data,callback,token) {//data是文件对象
			let xhr = new XMLHttpRequest();
			let form = new FormData();
			form.append('file', data);
			form.append('acl', this.url.formData.acl);
			form.append('awsAccessKeyId', this.url.formData.awsAccessKeyId);
			form.append('bucket', this.url.formData.bucket);
			form.append('contentType', this.url.formData.contentType);
			form.append('key', this.url.formData.key);
			form.append('policy', this.url.formData.policy);
			form.append('signature', this.url.formData.signature);
			form.append('successActionStatus', this.url.formData.successActionStatus);
			console.log(form)
			function uploadProgress(e) {
				if (e.lengthComputable) {
					let progress = Math.round((e.loaded / e.total) * 100);
					callback(progress);
				}
			}
			/*
			* 监听请求的进度并在回调中传入进度参数*/
			xhr.upload.addEventListener('progress',uploadProgress, false);  // 第三个参数为useCapture?，是否使用事件捕获/冒泡
			/*
			* 监听readyState的变化，完成时回调后端返回的response
			* */
			xhr.addEventListener('readystatechange',function(e){
				console.log(e);
				let response=e.currentTarget.response?JSON.parse(e.currentTarget.response):null;
				if (e.currentTarget.readyState===4&&response) {
					callback(100,response);
					xhr.upload.removeEventListener('progress', uploadProgress, false)
				}
			},false);

			xhr.open('POST', url, true);  // 第三个参数为async?，异步/同步
			xhr.setRequestHeader("x-amz-acl",'public-read');
			xhr.send(form);
		},
		upLoad(){
			let url = this.url.uploadUrl,
			data = this.fileData;
			console.log(1111,data)
			this.uploadForImage(url,data,
				function(){
					if (response&&response.code === 200) {
						 message.success("上传成功！");
					}else if (response && response.code !== 200) {
						message.error(response.msg)
					}
				}
			)
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
				height: 212px;
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
						&.copy_src{
							margin: 0 10px 0 130px;
						}
					}
				}
			}
		}
	}
}
</style>



