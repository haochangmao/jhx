<template>
    <div class="app_jhx">
        <div class="menu">
            <h1></span>JHX</h1>
            <ul>
				<li v-for="(i,idx) in consoleList">
					<dl>
						<dt @click="isOpen(idx)">
							<span class="arrow arrow_r" :class="count==idx ? 'arrow_d' : ''" ></span>
						{{i.title}}
						</dt>
						<dd v-for="(j,index)  in i.list" :key="index" @click="isActive(index)"  :style="count==idx?'height:30px;':''">
							<router-link :to="j.router" class="router-link" :class="num==index? 'cur' : ''"><span class="square"></span>{{j.title}}</router-link>
						</dd>
					</dl>
				</li>
            </ul>
        </div>
        <router-view class="contant" />
    </div>
    
</template>

<script>
import util from './js/common/util';
export default {
    data () {
        return {
			consoleList:[{
				title:"用户管理",
				list:[
					{
						router : "/userManage",
						title:"用户管理"
					},
					{
						router : "/markDetail",
						title:"积分明细"
					},
					{
						router : "/markRule",
						title:"积分规则"
					},
					{
						router : "/bookManage",
						title:"预约管理"
					},
				]
			},{
				title:"机构管理",
				list:[
					{
						router : "/shopManage",
						title:"机构管理"
					},
					{
						router : "/shopUser",
						title:"机构用户管理"
					},
					{
						router : "/shopData",
						title:"机构数据"
					},
					{
						router : "/shopVerify",
						title:"机构审核"
					},
					{
						router : "/shopAsk",
						title:"机构问答"
					},
					{
						router : "/labelManage",
						title:"标签管理"
					},
					]
			},{
				title:"商圈",
				list:[
					{
						router : "/shopLocation",
						title:"机构位置信息"
					}
				]
			},{
				title:"前端管理",
				list:[
					{
						router : "/bannerManage",
						title:"轮播图管理"
					},
					{
						router : "/classManage",
						title:"类别管理"
					}
				]
			}],
			count:1,
            num : 0
        }
    },
    created() {
       
    },
    mounted(){
		this.listLocation(this.$route.path);
    },
    methods: {
		isOpen(index){
			var that = this;
			if(this.count == index){
				this.count = null;
				return;
			}
			this.$router.push({  
				path:that.consoleList[index].list[0].router
			})
			this.count = index;
		},
        isActive(index) {
            // this.num = index;
            sessionStorage.setItem("num", this.num);
        },
		listLocation(path){
			var that = this;
			if(path == "/"){
				path = "/shopManage";
			}
			for(var i=0;i<that.consoleList.length;i++){
				for(var j=0;j<that.consoleList[i].list.length;j++){
					if(that.consoleList[i].list[j].router == path){
						that.count = i;
						that.num = j;
						return;
					}
				}
			}
		}
    },
    computed:{

    },
    watch:{
		$route(to,from){
			this.listLocation(to.path);
		}
},
}

</script>

<style lang="scss" scoped>
    .app_jhx{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        h1{
            width:50px;
            height:50px;
            line-height:51px;
            border-radius:50%;
            margin: 60px auto 30px;
            background:#000;
            font-size:20px;
            color:#fff;
        }
        .menu{
            width:150px;
            background:#fafaf8;
            position:absolute;
            top:0;
            bottom:0;
            font-size:12px;
			font-weight: 400;
			text-align: center;
			color: #96a0bd;
			dl{
				text-align: left;
				position: relative;
				dt{
					height: 30px;
					line-height: 30px;
					cursor: pointer;
					position: relative;
					padding-left:50px;
					 background:#fafaf8;
					&:hover{
						background: #5aa4cc;
						color: #fff;
						.arrow{
							border-color:transparent transparent transparent #fff;
						}
						.arrow.arrow_d{
							border-color: #fff transparent transparent;
						}
					}
				}
				dd{
					height: 0px;
					line-height: 30px;
					background: #f1f2f0;
					position: relative;
					transition: all .3s;
					overflow:hidden;
					a{
						padding-left:60px;
						display: block;
						color: #adb3c4;	
						// width: 100%;
						height: 100%;
						&:hover{
							background: #CDC9A5;
							color: #fff;
							.square{
								border-color: #fff;
							}
						}
						&.cur{
							color: #9B30FF;
							.square{
								border-color: #9B30FF;
							}
						}
					}
				}
			}
			router-link{
				
			}
        }
		.contant{
			min-width: 1200px;
			height: 100%;
		}
    }
   
    
    
</style>

