<template>
	<div class="goods ui-over-h"> 
		<div class="w-960 ui-over-h">
			<div class="goods-header ui-clear">
				<div class="gh-left ui-fl">
					<div class="gh-left-pic ui-fl" :style="{'background-image':'url('+bigImgSrc+')'}"></div>
					<div class="hg-left-bottom">
						<span class="left" @click="switchGoodImg(isChecked,'left')"><</span>
						<div class="wrap">
							<div class="smallImg" v-for="(item,index) in banner" :style="{'background-image':'url('+item+')'}" @click="switchGoodImg(index,'')" ></div>
						</div>
						<span class="right" @click="switchGoodImg(isChecked,'right')">></span>
					</div>
				</div>
				<div class="gh-right ui-fl">
					<h2 v-bind:title="goods.name">{{goods.name}}</h2>
					<p>{{goods.introduce}}</p>
					<div class="ghr-price">
						<span>价格</span>
						<span class="ghr-color">{{"￥"+goods.price}}</span>
					</div>
					<div class="ghr-goods">
						<div class="ghr-colors ui-clear"  v-for="(item, index) in goods.attr">
							<span class="ui-fl">{{item.name}}</span>
							<ul class="colors-list ui-clear ui-fl">
								<li class="ui-fl" 
									v-for="(val, key) in item.valueList" 
									@click="chooseAttr(item, val, index, key)"
									:class="{active: val.isActive}">{{val.name}}</li>
								
							</ul>
						</div>
						<div class="ghr-shu ui-clear">
							<span class="ui-fl">数量</span>
							<btng class="btn-group">
								<btn type="ghost" icon="minus-round" @click="numberSub"></btn>
								<input class="btn-middle ui-fl" v-model="number">
								<btn type="ghost" icon="plus-round" @click="numberSup"></btn>
								
							</btng>
							<button class="buybtn" @click="toPaylist()">
								立即购买
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ul class="goods-pics">
			<li class="goods-pic"  v-html="goods.content">
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import btng from 'iview/src/components/button/button-group'
	import btn from 'iview/src/components/button/button'
	import ajax from "../assets/js/ajax";
	import ser from "../assets/js/serverUrl";
	import msg from "iview/src/components/message"
	import Car from "iview/src/components/carousel/carousel"
	import Item from "iview/src/components/carousel/carousel-item"
	export default{
		components:{
			btng:btng,
			btn:btn,
			carousel:Car,
			"carousel-item":Item
		},
		data(){
			return {
				number:1,
				goods:{
					
					price:'',

				},
				banner:[],
				attr: {},
				submitAttr:[],
				isChecked : 0,
				bigImgSrc:''
			}
		},
		computed:{
			query(){
				return this.$router.currentRoute.query;
			}
		},
		methods:{
			// 切换商品展示图
			 checked(index){
				let t = this;
				var smallImg =document.getElementsByClassName("smallImg");	
				t.isChecked = index;			
				for(var i=0;i<t.banner.length;i++){
					smallImg[i].style.border='none';
					if(i==index){
						smallImg[index].style.border='solid 1px #ACB72F';
						t.bigImgSrc=t.banner[i];
					}
				}
				
			},
			switchGoodImg(index,direction){
				let t = this;
				var wrap =document.getElementsByClassName("wrap")[0];
				if(direction=='left'){
					if(t.isChecked>0) {
						t.isChecked--
					    if(t.isChecked<4&&t.isChecked>=0&&wrap.offsetLeft<0){
					    	wrap.style.left=wrap.offsetLeft+64+"px"
					    }
					    t.checked(t.isChecked);
					}
				}
				else if(direction=='right'){
					t.isChecked++
					if(t.isChecked>=0&&t.isChecked<t.banner.length) {					    
						if(t.isChecked>3){
					    	wrap.style.left=wrap.offsetLeft-64+"px"
						}
						t.checked(t.isChecked);	
					}	
					if(t.isChecked==t.banner.length){t.isChecked=t.banner.length-1}		
				}
				else{
					t.checked(index);
				}
			},
			chooseAttr(attr, val, index, key){
				this.attr[attr.name] = val.name;

				this.goods.attr[index].valueList.forEach(function(item){
					item.isActive = false;
				})
				val.isActive = true;
				console.log(this.attr)
				// console.log(this.goods)
			},
			getParam(userId){
				// 商品信息传递
				let obj={};
				let goods=this.goods;
				let router=this.$router.currentRoute.query;
				obj.good_price =goods.price;
				obj.good_id=router.id;
				obj.user_id=userId;
				obj.good_number=this.number;
				if (this.query.getSaleById=='getSaleById') {
					obj.getSaleById='getSaleById'
				}
				obj.order_total=(Number(obj.good_price,10)*parseInt(obj.good_number,10)).toFixed(2)
				obj.good_attr = JSON.stringify(this.attr);
				return obj;
			},
			//立即购买
			toPaylist(){
				let user=ser.getItem(ser.userId);
				let t=this;
				let router=this.$router;

				let attrLen = 0;
				for (var key in t.attr) {
					attrLen++;
				}

				if (t.goods.attr.length != attrLen) {
					msg.warning("请选择商品属性");
					return;
				}

				if(user==''){
					msg.warning("请登录");
				}else{
					ajax.$http(this,{
		              url:ser.url("loginOrNot"),
		              type:"post",
		              data:{
		                id:user
		              }
		            },function(resp){
		                if(resp.code==200){
							let user=resp.data;
							let routerQuery=t.getParam(user.id);
							router.push({path:'order',query:routerQuery})
						}else{
							msg.warning("请登录");
						}
		            })
				}
			},
			// 减少商品数量
			numberSub(){
				var _this = this;
				if (_this.number>1) {
					_this.number--
				}
			},
			// 增加商品数量
			numberSup(){
				var _this = this;
				_this.number++
			},
			// 当前商品详情
			getgood(){
				let t=this;
				let id=this.query.id;

				t.$Progress.start();

				ajax.$http(t,{
	              url: this.query.getSaleById=='getSaleById'?ser.url('getSaleById'):ser.url("getGoodsById"),
	              type:"post",
	              data:{
	                id:id
	              }
	            },function(resp){
	                if(resp.code==200){
						// console.log(resp)
						resp.data.attr.forEach(function(item){
							item.valueList.forEach(function(val){
								val.isActive = false;
							})
						})
						t.goods=resp.data;	
						t.banner=resp.data.images;
						t.isChecked = false;
						t.$Progress.finish()
					}else{
						msg.warning(resp.msg);
						t.$Progress.fail()
					}
	            })
			}
			
		},
		mounted(){
			let t=this;
			t.getgood();
			setTimeout(function(){t.checked(0);},2000)
		}
	}
</script>
<style lang="scss">
	
	.goods-header{
		width:100%;
		position:relative;
		margin-top:20px;
		margin-bottom:70px;
		.gh-left{
			width:300px;
			height:370px;
			font-size:0;
			.gh-left-pic{
				float: left;
				width:300px;
				height:300px;
				background-color:#e8e8e8;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
			}
			.hg-left-bottom{
				position: relative;
				float:left;
				width:100%;
				height:70px;
				box-sizing:border-box;
				overflow: hidden;
				padding:10px 0;
				// text-align: center;
				.left{
					display: inline-block;
					padding: 0 7px;
					background-color: #FBFBFB;
					// float: left;
					position:absolute;
					left:0;
					z-index:10;
					line-height: 50px;
				}
				.right{
					position: absolute;
					top: 10px ;
					right:0;
					display: inline-block;
					padding: 0 7px;
					background-color: #FBFBFB;
					// float: right;
					line-height: 50px;
				}
				span{
					font-size: 15px;
					cursor: pointer;
				}
				.wrap{
					position: absolute;
					width:400px;

					left:22px;
					bottom: 10px;
					div{
						display: inline-block;
						width: 50px;
						height: 50px;
						box-sizing: border-box;
						margin: 0 7px;
						background-image: url('../assets/images/index-sp_05.png');
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
					}
				}
				
				.currentImg{
					border: solid 1px #ACB72F;
				}
			}
		}
		.gh-right{
			width:67.9999999999999%;
			padding-left:36px;
			>h2{
				color:#555;
				font-size:20px;
				padding:0 0 10px 0;
			}
			>p{
				font-size:12px;
				color:#888888;
				padding-left:1px;
			}
			.ghr-price{
				width:100%;
				padding:20px;
				background-color: #F7F6F6;
				margin-top:30px;
				color:#000; 
				.ghr-color{
					color:#FF410B ;
					font-size:20px;
					font-weight: 800;
				}
			}
			.ghr-colors{
				width:100%;
				padding-top:20px;
				padding-left:20px;
				line-height: 30px;
				>span{
					color:#000;
				}
				.colors-list{
					margin-left:10px;
					overflow:hidden;

					>li{
						line-height: 20px;
						padding: 5px 10px;
						margin-left:10px;
						text-align: center;
						background-color:#e8e8e8;
						background-repeat: no-repeat;
						background-position:center;
						background-size:cover;
						cursor: pointer;

						&.active{
							background-color: #E5AD68;
							color: #fff;
						}
					}
				}
			}
			.ghr-shu{
				padding:10px 0 0 20px;
				line-height:30px;
				color:#000;
				>span{
					padding-right:20px;
				}
				.btn-group{
					// margin-left:30px;
					.btn-middle{
						width:60px;
						text-align: center;
						font-size:12px;
						border:none;
						outline: none;
						border-bottom: 1px solid #e7e7e7;
						border-top: 1px solid #e7e7e7;
					}
				}
				.buybtn{
					text-align:center;
					color:#fff;
					padding:0 34px;
					outline:none;
					background: #E5AD68;
					border: 1px solid rgba(0,0,0,0.14);
					border-radius: 2px;
					margin-left:80px;
				}
				.buybtn:active{
					border: 1px solid rgba(0,0,0,.3);
				}
			}
		}
	}
	.goods-pics{
		width:960px;
		margin:40px auto 0;
		.goods-pic{
			// width:100%;
			// height:450px;
			text-align:center;
			background-color:#f8f8f8;
			background-repeat: no-repeat;
			background-position:center;
			background-size:cover;
		}
	}
</style>