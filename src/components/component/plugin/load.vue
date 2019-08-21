<template>
  <transition name="mask-bg-fade">
    <div class="mask_load">
      <div>{{ loadTxt || "加载中"}}</div>
    </div>
  </transition>
</template>

<script>

  export default {
    props: ['loadTxt'],
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
      }
    }
  }
</script>

<style lang="scss">
//模态窗口
.mask_load{
	width: 100%;
	height: 100%;
	position: relative;
	font-size: 30px;
	color: #a9adb8;
	z-index: 998;
	background: #fff;
	div{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);  
	}
}
</style>