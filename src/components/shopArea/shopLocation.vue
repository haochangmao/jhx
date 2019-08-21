<template>
	<div class="jhx location_map">
		<div id="container" class="map" tabindex="0"></div>
		<div class="input-card" v-show="false">
			<h4>聚合点效果切换</h4>
			<div class="input-item">
				<input type="button" class="btn" value="默认样式" id="add0" onclick='addCluster(0)'/>
				<input type="button" class="btn" value="自定义图标" id="add1" onclick='addCluster(1)'/>
				<input type="button" class="btn" value="完全自定义" id="add2" onclick='addCluster(2)'/>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return{
				points:[],
				cluster:null,
				markers:[],
				map:null,
				count:""
			}
		},
		methods:{
			_renderClusterMarker(context){
				var that = this;
				var factor = Math.pow(context.count / that.count, 1 / 18);
				var div = document.createElement('div');
				var Hue = 180 - factor * 180;
				var bgColor = 'hsla(' + Hue + ',100%,50%,1)';
				var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
				var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
				var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
				div.style.backgroundColor = bgColor;
				var size = Math.round(30 + Math.pow(context.count / that.count, 1 / 5) * 20);
				div.style.width = div.style.height = size + 'px';
				div.style.border = 'solid 1px ' + borderColor;
				div.style.borderRadius = size / 2 + 'px';
				div.style.boxShadow = '0 0 1px ' + shadowColor;
				div.innerHTML = context.count;
				div.style.lineHeight = size + 'px';
				div.style.color = fontColor;
				div.style.fontSize = '14px';
				div.style.textAlign = 'center';
				context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
				context.marker.setContent(div);
			},
			addCluster(tag){
				var that = this;
				if (that.cluster) {
					that.cluster.setMap(null);
				}
				if (tag == 2) {//完全自定义
					that.cluster = new AMap.MarkerClusterer(that.map, that.markers, {
						gridSize: 80,
						renderClusterMarker: that._renderClusterMarker
					});
				} else if (tag == 1) {//自定义图标
					var sts = [{
						url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
						size: new AMap.Size(32, 32),
						offset: new AMap.Pixel(-16, -16)
					}, {
						url: "https://a.amap.com/jsapi_demos/static/images/green.png",
						size: new AMap.Size(32, 32),
						offset: new AMap.Pixel(-16, -16)
					}, {
						url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
						size: new AMap.Size(36, 36),
						offset: new AMap.Pixel(-18, -18)
					}, {
						url: "https://a.amap.com/jsapi_demos/static/images/red.png",
						size: new AMap.Size(48, 48),
						offset: new AMap.Pixel(-24, -24)
					}, {
						url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
						size: new AMap.Size(48, 48),
						offset: new AMap.Pixel(-24, -24)
					}];
					that.cluster = new AMap.MarkerClusterer(that.map, that.markers, {
						styles: sts,
						gridSize: 80
					});
				} else {//默认样式
					that.cluster = new AMap.MarkerClusterer(that.map, that.markers, {gridSize: 80});
				}
			},
			setMap(){
				var that = this;
				that.map = new AMap.Map("container", {
					resizeEnable: true,
					center: [116.3972282409668, 39.90960456049752],
					zoom: 9
				});
				for (var i = 0; i < this.points.length; i += 1) {
					that.markers.push(new AMap.Marker({
						position: this.points[i]['lnglat'],
						content: '<div style="background-color: '+ this.points[i]['color'] +'; height: 24px; width: 24px; border: 1px solid red; border-radius: 12px; ">123</div>',
						offset: new AMap.Pixel(-15, -15)
					}))
				}
				that.count = that.markers.length;
				that.addCluster(2);
			},
			getShopLocation(){
				var that = this;
				that.points = [{"lnglat":["116.47679","39.98947"],"color":"yellow"},{"lnglat":["116.28918","39.96134"],"color":"blue"},{"lnglat":["116.537926","40.087437"],"color":"green"}];
				that.setMap();
			}
		},
		mounted() {
			var that = this;
			that.getShopLocation();
		}
	}
	
</script>

<style lang="scss" scoped>
	#container {
            height: 100%;
            width: 100%;
        }
	.location_map{
			
        .input-card {
            width: 280px;
			h4{
				font-size: 14px;
			}
        }
        .input-card .btn {
            // width: 7rem;
			font-size: 12px;
            margin-right: 10px;
			text-indent: 0;
        }

        .input-card .btn:last-child {
            margin-right: 0;
        }
	}
</style>
