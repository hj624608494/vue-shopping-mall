<template>
	<div>
		
		<div class="Z_xuanze" >
			<p>选择收货地址</p>
		</div>
		<div class="Z_address">
			<div class="Contentbox ui-fl" v-for="(item,index) in address" @click="chooseAddress(index)">
				<div class="Content" :class="{active: item.isChecked}">
					<p>
						<span class="name">{{item.name}}</span>
						<span class="number">{{item.phone}}</span>
						
					</p>
					<p class="ui-t-j">
						<span>{{item.province}}</span>
						<span>{{item.street}}</span>
						<span class="or-pad">{{item.city}}</span>
					</p>
					<p class="xiangxidizhi">{{item.address}}</p>

					<input type="button" value="删除" class="shanchu" @click="del(item, index, $event)">
					
				</div>
				
			</div>
			<div class="Contentbox2 ui-fl" @click="addA=!addA">
				<div id="Content">
					<p id="jiahao">+</p>
					<div id="Tdizhi">添加新收货地址</div>
				</div>
			</div>
		</div>
		<!-- 添加收货地址弹窗 -->
		<div class="Z_mask" v-if="addA">
			<div class="maskIn">
				<img src="../assets/images/LOGO Text.png" alt="">
				<input v-model="address.name" type="text" placeholder="收货人姓名" class="shouxingming">
				<input v-model="address.phone" type="text" placeholder="收货人电话" class="telephone">
				<input class="ars" v-model="address.province" type="text" placeholder="选择省份">
				<input class="ars" v-model="address.city" type="text" placeholder="选择城市">
				<input class="ars" v-model="address.area" type="text" placeholder="选择区">
				<input v-model="address.street" type="text" placeholder="街道">
				<input v-model="address.address" type="text" placeholder="详细地址" class="addressEX">
				<input type="button" value="取消" class="Z_quxiao" @click="addA=!addA">
				<input type="button" value="确认" class="Z_queren" id="Z_queren2" @click="addAddress()">
			</div>
		</div>
		<div style="clear:both"></div>
		<div class="Z_xuanze">
			<p>确认订单信息</p>
		</div>
		<div class="Z_list">
			<div class="Z_listBox">
				<span>合计</span>
				<span>数量</span>
				<span>单价</span>
			</div>
		</div>
		<div class="cold">
			<a href="#"><div class="coldM" :style="{'background-image':'url('+good.image+')'}"></div></a>
			<a href="#">
				<div class="Z_explain">
					<p v-bind:title="good.name">{{good.name}}</p>
					<p v-for="item in chooseAttr">{{item}}</p>
				</div>
			</a>
			<div class="biaozhu">
				<span>{{good.price}}</span>
				<span>{{query.good_number}}</span>
				<span>{{"￥"+query.order_total}}</span>
			</div>
		</div>
		<div class="yingfu">
			<div class="yingfuRbox">
				<span>应付:</span>
				<span>{{"￥"+query.order_total}}</span>
				<input type="button" value="提交订单" @click="submitOrder()">
			</div>
		</div>
		
		<div style="clear:both"></div>

	</div>
</template>
<script type="text/javascript">
import ajax from "../assets/js/ajax";
import ser from "../assets/js/serverUrl";
import msg from "iview/src/components/message"
export default{
	data () {
    return {
    	config:{
  		 	value: 'http://sissi.pingxx.com/mock.php?ch_id=ch_qHS88O9CSan1ar5WL0CqX9O8&channel=wx_pub_qr',
        imagePath: '../static/logo.png',
        filter: 'color'
    	},
    	order:{},
    	address: [],
    	good:{},
    	addA:false,
    	successAddress:'',
    	chooseAttr:[]
    }
	},
	mounted(){
		let t=this;
		let uid=ser.getItem(ser.userId)
		t.getGoodmsg(t.query.good_id)
		t.getAddress(uid);
		t.getGoodAttr();
	},
	computed:{
		query(){
			return this.$router.currentRoute.query;
		}
	},
	methods:{

		del(item, index, e){
			e.stopPropagation();
			let t = this;
			ajax.$http(t,{
				url:ser.url("delAddress"),
				type:"post",
				data:{
					uid:ser.getItem(ser.userId),
					id: item.id
				}
			},function(resp){
				if(resp.code==200){
					t.address.splice(index, 1);
				}else{
					msg.warning(resp.msg)
				}
			})
		},
		chooseAddress(index){
			let t = this;
			this.address.forEach(function(item){
				item.isChecked = false;
			})
			this.address[index].isChecked = true;
			t.successAddress = JSON.stringify(t.address[index]);
		},
		
		submitOrder(){
			let t=this;
			let addressid = 0;
			let router=this.$router;
			t.address.forEach(function(item){
				item.isChecked && (addressid = item.id);
			})
			
			ajax.$http(this,{
				url:ser.url("addOrder"),
				type:"post",
				data :{
					user_id: ser.getItem(ser.userId),
					good_price: t.query.good_price,
					good_number: t.query.good_number,
					attr: JSON.parse(t.query.good_attr),
					order_total: t.query.order_total,
					address_id: addressid,
					good_id: t.query.good_id,
					getSaleById:t.query.getSaleById
				}
			},function(resp){
				if(resp.code==200){
					
					let routerQuery=t.$route.query.order_total;
					router.push({path:'Pay',query:{order_total:JSON.parse(routerQuery),sa:t.successAddress, order_id: resp.data}})
					
				}else{
					msg.warning(resp.msg)
				}
			})
		},
		getAddress(uid){
			let t=this;
			ajax.$http(this,{
				url:ser.url("getAddress"),
				type:"post",
				data:{
					uid:uid
				}
			},function(resp){
				if(resp.code==200){
					resp.data.forEach(function(item){
						item.isChecked = false;
					})
					t.address=resp.data;
					t.address[0].isChecked = true;
					t.successAddress = JSON.stringify(t.address[0]);
				}else{
					msg.warning(resp.msg)
				}
			})
		},
		addAddress(){
			var t = this;
			ajax.$http(t,{
				type:"POST",
				url:ser.url("addAddress"),
				data:{
					uid:ser.getItem(ser.userId),
					name:t.address.name.trim(),
					phone:t.address.phone.trim(),
					address:t.address.address.trim(),
					province:t.address.province.trim(),
					city:t.address.city.trim(),
					area:t.address.area.trim(),
					street:t.address.street.trim()
				}

			},function(resp){
				if (resp.code == 200) {
					t.getAddress(ser.getItem(ser.userId));
					t.addA = false;
				} else {
					msg.warning(resp.msg)
				}
			})
		},
		getGoodmsg(goodid){
			let t=this;

			t.$Progress.start();

			ajax.$http(t,{
              url: t.query.getSaleById=='getSaleById'?ser.url('getSaleById'):ser.url("getGoodsById"),
              type: "post",
              data: {
                id: goodid
              }
            },function(resp){
                resp.data.image = resp.data.images[0];
				t.good=resp.data;

				t.$Progress.finish();
            })
		},
		getGoodAttr(){
			var t = this;
			var a = JSON.parse(t.query.good_attr)
		    for(var item in a){
		       t.chooseAttr.push(item+"： "+a[item]);
		    }
		},
		testLogin(cb){
			ajax.$http(this,{
              url:ser.url("loginOrNot"),
              type:"post",
              data:{
                id:user
              }
            },function(resp){
                cb&&cb(resp);
            })
		}
	}
	
}

</script>
<style lang="scss">
	.or-pad{
		padding-left:20px;
	}
	.Z_xuanze{
	width:960px;
	height:80px;
	margin:0 auto;
	margin-top:20px;
	background:#F7F6F6;
	p{
		width:120px;
		height:28px;
		line-height:80px;
		font-size:20px;
		margin-left:20px;
	}
}
.Z_address{
	width:960px;
	/*height:200px;*/
	margin:0 auto;
	position:relative;
	.Contentbox{
		width:25%;
		margin-bottom:30px;
		display:inline-block;
		cursor: pointer;
		vertical-align: middle;
		position: relative;
		.active{
			border:1px solid #E5AD68!important;
		}
		.Content{
			position: relative;
			width:200px;
			height:120px;
			margin:40px auto 0;
			border:1px solid lightgray;
			/* display:inline-block; */
			p{
				width:180px;
				height:34px;
				color: #333333;
				font-size:12px;
				margin-left:10px;
				overflow: hidden;
				word-wrap: break-word;
				span{
					line-height:34px;
					display:inline-block;
				}
				span:nth-child(1){
					float:left;
				}
				span:nth-child(2){
					float:right;
				}
			}
			p:nth-child(1){
				border-bottom:1px solid lightgray;
			}
			p:nth-child(2){
				margin-top:10px;
				color: #888888;
				line-height: 17px;
			}
			
			
			input{
				position:absolute;
				right: 0;
				bottom: 0px;
				display:none;
				width:36px;
				height:21px;
				font-size:12px;
				color: #8D8D8D;
				border:none;
				outline: none;
				cursor: pointer;
				background: #E5E5E5;
			}
			&:hover input{
				display: block;
			}
		}
		
	}
}
/*.Contentbox>.xinjiaru{
	width:200px;
	height:120px;
	margin-top:40px;
	border:1px solid lightgray;
	display:inline-block;
}*/
.Contentbox2{
	width:25%;
	display:inline-block;
	cursor: pointer;
	
}
#Content{
	width:200px;
	height:120px;
	margin:40px auto 30px;
	
	vertical-align: middle;
	position:relative;
	border:1px solid lightgray;
}
#jiahao{
	width:20px;
	height:20px;
	color:white;
	position:absolute;
	left:88px;
	top:35px;
	font-size: 16px;
	line-height:20px;
	text-align: center;
	border-radius: 50%;
	background: #E5AD68;
}
#Tdizhi{
	width:84px;
	height:17px;
	line-height: 17px;
	font-size: 12px;
	color: #E5AD68;
	position:absolute;
	left:58px;
	top:60px;
}
.Z_mask{
	background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
    // display:none;
    .maskIn{
    	width:450px;
    	height:447px;
    	position:absolute;
    	top:50%;    	
    	left:50%;
    	transform:translate(-50%,-50%);
    	background:white;
    	text-align: center;
    	img{
    		height:20px;
    		margin-left:20px;
    		margin-top:43px;
    		display:block;
    	}
    	input{
    		border:1px solid #E5E5E5;
    		outline: none;
    	}
    	input:nth-child(2),input:nth-child(3){
    		width:187px;
    		height:50px;
    		margin:0 7px;
    		margin-top:27px;
    		padding-left: 10px;
    	}
    	input:nth-child(4),input:nth-child(5),input:nth-child(6){
    		width:26.5%;
    		height:50px;
    		margin:0 7px;
    		margin-top: 20px;
    		padding-left:10px;
    	}
    	input:nth-child(7),input:nth-child(8){
    		width: 392px;
    		height:50px;
    		margin:0 7px;
    		margin-top: 20px;
    		padding-left:10px;
    	}
    	input:nth-child(9),input:nth-child(10){
    		width:30%;
			height:40px;
			line-height: 40px;
			font-size: 12px;
			color:white;
			// margin-top:25px;
			text-align: center;
			border-radius: 2px;
			border:none;
			margin:25px 15px 0 15px;
			letter-spacing: 0.75px;
    	}
    	input:nth-child(9){
			// margin-left: 91px;
			background: #CECECE;
    	}
    	input:nth-child(10){
			// margin-left: 30px;
			background: #E5AD68;
    	}
    }
}
.Z_list{
	width:960px;
	height:80px;
	margin:0 auto;
	border-bottom:1px solid #E5E5E5;
	.Z_listBox{
		width:300px;
		height:20px;
		float:right;
		margin-top:30px;
		span{
			width:28px;
			height:20px;
			font-size: 14px;
			line-height: 20px;
			float:right;
			color:#444444;
			margin-right:70px;
			display:inline-block;
		}
	}
}
.cold{
	width:960px;
	height:200px;
	margin:0 auto;
	position:relative;
	.coldM{
		width:100px;
		height:100px;
		margin:40px 0 40px 40px ;
		display:inline-block;
		background-color:#BD8D6A;
		background-position:center;
		background-size:cover;
		background-repeat:no-repeat;
		cursor: pointer;
	}
	.Z_explain{
		width:140px;
		margin-left:30px;
		position:absolute;
		top:40px;
		display:inline-block;
		p:nth-child(1){
			// height:22px;
			// width:148px;
			line-height:22px;
			font-size: 16px;
			color: #333333;
			font-weight:bold;
			cursor: pointer;
			overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		}
		p:nth-child(2){
			height:17px;
			line-height:17px;
			font-size: 12px;
			margin-top:2px;
			color: #888888;
			cursor: pointer;
		}
		p:nth-child(3){
			height:17px;
			line-height:17px;
			font-size: 12px;
			margin-top:13px;
			color: #888888;
			cursor: pointer;
		}
	}
	.biaozhu{
		width:300px;
		height:17px;
		float:right;
		margin-top:72px;
		span{
			width:45px;
			height:17px;
			font-size: 12px;
			line-height: 17px;
			color:#444444;
			margin-right:30px;
			margin-left:13px;
			font-weight: bold;
			display:inline-block;
		}
		span:nth-child(3){
			font-size: 16px;
			color: #FF410B;
		}
	}
}
.yingfu{
	width:960px;
	height:80px;
	margin:0 auto;
	background:#F7F6F6;
	.yingfuRbox{
		width:270px;
		float:right;
		span:nth-child(1){
			width:36px;
			height:17px;
			line-height: 80px;
			font-size: 12px;
			color: #444444;
		}
		span:nth-child(2){
			width:56px;
			height:28px;
			line-height: 80px;
			font-weight: bold;
			font-size: 20px;
			color: #FF410B;
		}
		input{
			width:120px;
			height:40px;
			margin:20px 20px 20px 30px;
			background: #E5AD68;
			color:white;
			border: 1px solid rgba(0,0,0,0.14);
			border-radius: 2px;
			cursor: pointer;
		}
	}
}
</style>