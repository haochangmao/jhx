<template>
	<div id="app"> 
		<div> 
			<div class="lelepage"  v-show="show"> 
				<div class="lepagelist" @click="childProp"> 
					<span class="jump" v-show="pageArr.currentPage>1" @click="pageArr.currentPage--">上一页</span> 
					<span v-show="pageArr.currentPage>5" class="jump" @click="jumpPage(1)">1</span> 
					<span class="ellipsis"  v-show="efont">...</span> 
					<span class="jump" v-for="num in indexs" :class="{bgprimary:pageArr.currentPage==num}" @click="jumpPage(num)">{{num}}</span> 
					<span class="ellipsis"  v-show="efont&&pageArr.currentPage<pageArr.totalPage-4">...</span> 
			 
					<span class="jump" @click="pageArr.currentPage++" v-show="pageArr.currentPage<pageArr.totalPage">下一页</span> 
					<span v-show="pageArr.currentPage<pageArr.totalPage-1" class="jump" @click="jumpPage(pageArr.totalPage)">{{pageArr.totalPage}}</span> 
			 
					<span class="jumppoint">跳转到：</span> 
					<span class="jumpinp"><input type="text" v-model="changePage"></span>
					<span class="jump gobtn" @click="jumpPage(changePage)">GO</span> 
				</div> 
			</div> 
		</div> 
	</div>
</template>

<script>
export default {

data () {
       return {
			// pageArr.currentPage: this.pageArr.currentPage || 1, //当前页 
			changePage:'',//跳转页 
			nowIndex:0 ,
       }
    },
props:["pageArr"],//总页数
computed:{ 
    show:function(){ 
        return this.pageArr.totalPage && this.pageArr.totalPage !=1 
    }, 
	efont: function() { 
		if (this.pageArr.totalPage <= 7) return false; 
		return this.pageArr.currentPage > 5 
	}, 
	indexs: function() { 
 
		var left = 1, 
		right = this.pageArr.totalPage, 
		ar = []; 
		if (this.pageArr.totalPage > 7) { 
			if (this.pageArr.currentPage > 5 && this.pageArr.currentPage < this.pageArr.totalPage - 4) { 
				left = Number(this.pageArr.currentPage) - 3; 
				right = Number(this.pageArr.currentPage) + 3; 
			} else { 
				if (this.pageArr.currentPage <= 5) { 
					left = 1; 
					right = 7; 
				} else { 
					right = this.pageArr.totalPage; 
					left = this.pageArr.totalPage - 6; 
				} 
			} 
		} else if(this.pageArr.totalPage == 7){
			if (this.pageArr.currentPage <= 5) { 
				left = 1; 
				right = 7; 
			} else { 
				right = this.pageArr.totalPage; 
				left = this.pageArr.totalPage - 5; 
			} 
		} else if(this.pageArr.totalPage == 6){
			if (this.pageArr.currentPage <= 5) { 
				left = 1; 
				right = 6; 
			} else { 
				right = this.pageArr.totalPage; 
				left = this.pageArr.totalPage - 4; 
			} 
		}
		while (left <= right) { 
			ar.push(left); 
			left++; 
		} 
		return ar; 
	}, 
}, 
methods: { 
	jumpPage: function(id) { 
		this.pageArr.currentPage = id; 
		this.changePage = "";
	}, 
	childProp:function(){
		var that = this;
		that.$emit("childProp",that.pageArr.currentPage)
	}
},
created() {
      this.$nextTick(() => {
        // 禁用右键
        // document.oncontextmenu = new Function("event.returnValue=false");
        // 禁用选择
        // document.onselectstart = new Function("event.returnValue=false");
      });
    }
}
</script>

<style lang="scss" scoped>
	.lelepage { 
  font-weight: 900; 
  text-align: center; 
  color: #888; 
  margin-top:5px;
  .lepagelist { 
    font-size: 0; 
    background: #fff; 
	border-radius: 4px;
  } 
   
  .lepagelist span { 
    font-size: 12px; 
  } 
   
  .lepagelist .jump { 
    border: 1px solid #ccc; 
    padding: 5px 8px; 
    -webkit-border-radius: 4px; 
    -moz-border-radius: 4px; 
    border-radius: 4px; 
    cursor: pointer; 
    margin-left: 5px; 
  } 
   
  .lepagelist .bgprimary { 
    cursor: default; 
    color: #fff; 
    background: #337ab7; 
    border-color: #337ab7; 
  } 
   
  .jumpinp input { 
    width: 55px; 
    height: 26px; 
    font-size: 13px; 
    border: 1px solid #ccc; 
    -webkit-border-radius: 4px; 
    -moz-border-radius: 4px; 
    border-radius: 4px; 
    text-align: center; 
	text-indent: 0;
  } 
   
  .ellipsis { 
    padding: 0px 8px; 
  } 
   
  .jumppoint { 
    margin-left: 30px; 
  } 
   
  .lepagelist .gobtn {} 
   
  .bgprimary { 
    cursor: default; 
    color: #fff; 
    background: #337ab7; 
    border-color: #337ab7; 
  }
} 
 

</style>
