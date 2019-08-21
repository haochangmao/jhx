<template>
  <transition name="mask-bg-fade">
    <div class="mask_tips" v-show="show">
      <div class="mask_bg" />
      <transition name="slide-fade">
        <div class="modelBox" v-show="show" :style="{height:modalOptions.height+'px',width:modalOptions.width+'px'}">
          <div class="title">{{ modalOptions.title || "标准编辑功能" }}<span class="close_btn r"  @click="confirmCancel">×</span></div>
          <!-- <slot /> -->
					<div class="text">
						{{modalOptions.txt}}
					</div>
          <div class="model_btnBox" v-show="modalOptions.btnSubmitText!=''">
            <div>
              <button @click="confirmSubmit" class="btn_s">
                {{modalOptions.btnSubmitText}}
              </button>
             <button @click="confirmCancel" class="btn_s">
                {{ modalOptions.btnCancelText || "取消" }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
		</div>
  </transition>
</template>

<script>

  export default {
    props: {
      modalOptions: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        show: false// 是否显示模态框
      }
    },
    methods: {
      closeModel: function () {
        this.show = false;
      },
      showModel: function () {
        this.show = true;
      },
      confirmCancel: function () {
        this.show = false;
        if (typeof (this.modalOptions.btnCancelFunction) == 'function') {
          this.modalOptions.btnCancelFunction()
        }
      },
      confirmSubmit: function () {
        this.show = false;
        if (typeof (this.modalOptions.btnSubmitFunction) == 'function') {
          this.modalOptions.btnSubmitFunction();
        }
      }
    }
  }
</script>

<style lang="scss">
//模态窗口
.mask_tips{
	position:fixed;
	left:0;
	top:0;
	right:0;
	bottom:0;
	background: rgba(0,0,0,.55);
	z-index: 1000;
	.modelBox{
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%, -50%);
		background:#fff;
		border-radius:5px;
		overflow:hidden;
		.title{
			height:40px;
			font-size:14px;
			font-weight:400;
			padding:0 20px;
			line-height:40px;
			border-bottom:1px solid #ecedf1;
			background:#f2fafe;
			text-align: center;
			.close_btn{
				cursor:pointer;
			}
		}
		.message{
			padding:30px 40px 10px;
			font-weight:400;
			font-size:16px;
		}
		.text{
			font-size: 20px;
			font-weight: 400;
			height: 60px;
			text-align: center;
			line-height: 60px;
		}
	}
	.model_btnBox{
		height:55px;
		border-top:1px solid #ecedf1;
		>div{
			width:160px;
			height:45px;
			margin: 0 auto;
			button{
				margin-top:15px;
				&:nth-of-type(2){
					margin-left:12px;
				}
			}
		}
	}
}
</style>