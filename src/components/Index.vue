<template>
	<div>
		<section class="banner w-960" :class="{'ld-400':ldpic.banner}">
			<Carousel 
					v-model="setBan.index"
					:autoplay="setBan.autoplay"
					
				>
	        <Carousel-item v-for="(item,key) in banner" :key="item.id">
	        	<router-link :to="{path:'/goods',query:{id:item.link}}">
		            <div class="ban-pic" :style="{'background-image':'url('+item.image+')'}">
		            	
		            </div>
	            </router-link>
	        </Carousel-item>
	    	</Carousel>
		</section>
		<ul class="w-960 nav ui-clear" :class="{'ld-200':ldpic.nav}">
				<li class="ui-fl" v-for="item in classify"  @click="aa(item)">
					<!-- <router-link :to="{path:'/classify',query:{cid:item.id}}"> -->
						<p>{{item.text}}</p>
						<div class="nav-bg" :data-id="item.id"
							:style="{'background-image':'url('+item.image+')'}"
						></div>
					<!-- </router-link> -->

				</li>
		</ul>
		<div class="huodong">
			<a href="javascript:;" class="w-960" :style="{'background-image':'url('+SliderCenter.image+')'}">
				活动
			</a>
		</div>
		
		<section class="tejia" >
			<div class="w-960" :class="{'ld-400':ldpic.tj}">
				<h3 class="tejia-title">
					<span class="tejia-lg">
						特价专区
					</span>
					<span class="tejia-sm">
						给你最优惠的好商品
					</span>
				</h3>
				<ul class="tj-list ui-clear">
					<li class="ui-fl" v-for="item in getSale">
						<router-link :to="{path:'/goods',query:{id:item.id,cid:item.cid,getSaleById:'getSaleById'}}">
							<div class="tj-bg" :style="{'background-image':'url('+item.images[0]+')'}"></div>
							<p class="tj-name">{{item.name}}</p>
							<p class="tj-jiage">{{item.price+"元"}}</p>
						</router-link>

					</li>
					
				</ul>
			</div>
		</section>
		<section class="tuijian w-960 ui-clear" :style="{'background-image':'url('+SliderBottom.image+')'}">
			<!-- <div class="tui-left ui-fl">
				<div class="tui-logo ui-fl">
					<div class="tl-worm"></div>
					<div class="tl-wtext"></div>
				</div>
				<div class="tui-title ui-fl">
					<h2 class="line">
						<a href="javascript:;">进口饮料</a>
					</h2>
					<p>
						独家售卖<strong class="tt-color">783</strong>元起
					</p>
				</div>
			</div>
			<div class="tui-bg ui-fr">
				<a href="javascript:;">商品</a>
			</div> -->
			<div></div>
		</section>
		<section class="shangpin w-960" :class="{'ld-400':ldpic.good}">
			<h3 class="sp-title">
				<span class="sp-lg">
					商品
				</span>
				<span class="sp-sm">
					蜗创社区最有态度的好物送给你
				</span>
			</h3>
			<ul class="sp-list ui-clear">
				<li class="sp-li ui-fl" v-for="item in getGoods">
					<router-link :to="{path:'/goods',query:{id:item.id,cid:item.cid}}">
						<div class="sp-pic" :style="{'background-image':'url('+item.images+')'}">
						</div>
						<p class="sp-name">{{item.name}}</p>
						<p class="sp-jiage">
							{{item.price+"元"}}
						</p>
					</router-link>
				</li>
			</ul>
		</section>
	</div>
</template>
<script type="text/javascript">
import ajax from "../assets/js/ajax";
import ser from "../assets/js/serverUrl";
import Car from "iview/src/components/carousel/carousel"
import Item from "iview/src/components/carousel/carousel-item"
import alt from "iview/src/components/alert"


export default{
	 data () {
      return {
      ldpic:{
      	banner:true,
      	nav:true,
      	tj:true,
      	good:true
      },
      //弹窗
			alert:{
				type:"success",
				text:"",
				desc:"",
				show:false
			},
      //幻灯片
      banner:[],
      // 中部幻灯片
	  SliderCenter:[],
	  // 底部幻灯片
	  SliderBottom:[],
      setBan:{
      	autoplay:true,
        autoplaySpeed: 2000,
        dots: 'inside',
        trigger: 'click',
        arrow: 'hover',
        index:0
			},
			//分类
			classify:[],
			//特价专区
			getSale :[],
			//商品
			getGoods :[]
    }
  },
  components:{
  	"Carousel":Car,
		"Carousel-item":Item,
		"Alert":alt
  },
  methods:{
  		aa(item){
  			if (item.link) {
  				window.location.href=item.link;
  			} else {
  				this.$router.push({path:'/classify',query:{cid:item.id}})
  			}
  		}

  },
	mounted (){
		let that=this;

		that.$Progress.start();
		// 幻灯片
		
		ajax.$http(that,{
			url:ser.url("getSlider")
		},function(resp){
			if(resp.code==200){
				that.ldpic.banner=false;
				that.banner=resp.data;

				that.$Progress.finish();
			}else{
			}
			
		});

		//中部幻灯片
		ajax.$http(that,{
			url:ser.url("getSliderCenter")
		},function(resp){
			if(resp.code==200){
				that.SliderCenter=resp.data;

				that.$Progress.finish();
			}else{
			}
			
		});

		//底部幻灯片
		ajax.$http(that,{
			url:ser.url("getSliderBottom")
		},function(resp){
			if(resp.code==200){
				// that.ldpic.banner=false;
				that.SliderBottom=resp.data;

				that.$Progress.finish();
			}else{
			}
			
		});

		// 分类
		ajax.$http(that,{
			url:ser.url("getClassify")
		},function(resp){
			if(resp.code==200){
				that.ldpic.nav=false;
				that.classify=resp.data;
				// console.log(that.classify);

			}else{
			}
			
		});
		//特价专区
		ajax.$http(that,{
			url:ser.url("getSale")
		},function(resp){
			if(resp.code==200){
				that.ldpic.tj=false;
				that.getSale=resp.data;
				console.log(resp)
			}else{
			}
			
		});
		//商品
		ajax.$http(that,{
			url:ser.url("getGoods")
		},function(resp){
			if(resp.code==200){
				that.ldpic.good=false;
				that.getGoods=resp.data;

			}else{
			}
			
		});
	}
}
</script>
<style lang="scss">
	
	.car{
		width:100%;
		height:100%;
	}
	/* 幻灯片 */
	.ban-pic{
		height:400px;
		background-repeat:no-repeat;
		background-position:center;
		background-size:cover;
		>a{
			display:block;
			height:100%;
			width:100%;
			text-indent:-9999px;
		}
	}
	.nav{
		width:100%;
		margin-top:10px !important;
		>li{
			width:25%;
			padding:24px 0 40px;
			text-align:center;
			p{
				width:100%;
				padding:5px 0;
				font-weight: 600;
			}
			.nav-bg{
				width:100px;
				height:100px;
				margin:0 auto;
				background:url("../assets/images/index-class_03.jpg") no-repeat center;
				background-size:auto;
			}
		}
	}
	.huodong{
		height:220px;
		>a{
			display:block;
			
			height:100%;
			text-indent:-9999px;
			background: url("../assets/images/index-hd_03.png") no-repeat center;
			background-size:cover;
		}
	}
	.shequ{
		margin-top:40px !important;
		height:143px;
		background: url("../assets/images/shequ_06.png") no-repeat center;
		background-size:cover;
	}
	.tejia{
		width:100%;
		.tejia-title{
			padding:20px 0;
			.tejia-lg{
				padding-left:10px;
				font-size:24px;

			}
			.tejia-sm{
				margin-left:40px;
				font-size:14px;
				font-weight: 400;
			}
		}
		.tj-list{
			width:100%;
			>li{
				width:33.3333333333%;
				min-height: 270px;
				padding:36px 0 20px;
				text-align:center;
				.tj-bg{
					display:block;
					width:200px;
					height:200px;
					/* // background-image:url("../assets/images/tj-li_03.png") no-repeat center; */
					background-repeat: no-repeat;
					background-position: center;
					background-size:cover;
					margin:0 auto;
				}
				.tj-name{
					padding:10px 0;
				}
				.tj-jiage{
					color:#F6732D;
				}
			}
		}
	}
	.tuijian{
		padding:34px 20px  28px 50px;
		background-color:#FFFCF6;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		height: 230px;
		.tui-left{
			margin-top:25px;
			.tl-worm,.tl-wtext{
				background-position:center;
				background-repeat:no-repeat;
				background-size:contain;
				margin:0 auto;
			}
			.tl-worm{
				width:50px;
				height:50px;
				background-image: url("../assets/images/Worm.png");
			}
			.tl-wtext{
				margin-top:5px;
				width:85px;
				height:28px;
				background-image: url("../assets/images/LOGO Text.png");
			}
			.tui-title{
				padding-left:38px;
				letter-spacing: 2px;
				>h2{
					font-size:24px;
					padding:0 0 14px;
				}
				>p{
					font-size:14px;
					margin-top:10px;
					.tt-color{
						color:#FF410B;
						font-size:24px;
						padding:0 10px;
					}
				}
			}
		}
		.tui-bg{
			width:239px;
			height:158px;
			background:url("../assets/images/index-class_11.png") no-repeat center;
			background-size:contain;
			>a{
				display:block;
				width:100%;
				height:100%;
				text-indent:-9999px;
			}
		}
		.line{position:relative;}
		.line::after{
			content:"";
			display:block;
			position: absolute;
			width:24%;
			height:1px;
			bottom:0;
			left:0;
			background-color:#222;
		}

	}
	.shangpin{
		overflow:hidden;
		.sp-title{
			padding:20px 0;
			.sp-lg{
				padding-left:10px;
				font-size:24px;

			}
			.sp-sm{
				margin-left:40px;
				font-size:14px;
				font-weight: 400;
			}
		}
		.sp-li{
			text-align:center;
			width:25%;
			
			padding-bottom: 10px;
			.sp-pic{
				width:220px;
				height:220px;
				margin:0 auto;
				padding:5px;
				/* background:#F4F4F4 url("../assets/images/index-sp_03.png") no-repeat center; */
				background-repeat: no-repeat;
				background-position: center;
				background-size:cover;

				background-clip:content-box;
			}
			p{
				overflow:hidden;
			    white-space:nowrap;
			    text-overflow:ellipsis;
			}
			.sp-name{
				padding:14px 0 12px;
			}
			.sp-jiage{
				color:#F6732D ;
			}
		}
	}
</style>