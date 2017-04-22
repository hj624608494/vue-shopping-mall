<template>
  <div class="center" >
  	 <div class="top">
  	 	<div class="left">
  	 		<img src="../assets/images/detail-big.png" class="limit-left">
  	 		<div class="left-nav">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
  	 		</div>
  	 	</div>
  	 	<div class="right">
	  	 	<p>蜗创Cold-press</p>
	  	 	<p>居家必备夏季清凉首选</p>
	  	 	<p>价格<span>$239</span></p>
	  	 	<div class="color">
	  	 		<span>颜色分类</span>
	  	 		<div><img src="../assets/images/detail-big.png" alt=""></div>
	  	 		<div><img src="../assets/images/detail-big.png" alt=""></div>
	  	 	</div>
	  	 	<div class="number">
	  	 		<span>数量</span>
	  	 		<div>
	  	 			<table>
	  	 				<tr>
	  	 					<td>-</td>
	  	 					<td></td>
	  	 					<td></td>
	  	 					<td>+</td>
	  	 				</tr>
	  	 			</table>
	  	 		</div>
	  	 		<div><a href="#">立即购买</a></div>
	  	 	</div>
  	 	</div>
  	 </div>
  	 <div class="down">
  	 	
  	 </div>
  </div>
 
</template>
<script>
export default {

}
</script>

<style lang="scss">
	.center{
		line-height: 1;
		border:1px solid red;
		width: 960px;
		margin:0 auto;
		height: 2129px;
	}
	.top{
		border:1px solid red;
		width: 100%;
		height: 422px;
	}
	.left ,.right{
		vertical-align: top;
		border:1px solid red;
		display: inline-block;
	}
	.left{
		width: 350px;
		height:100%;
	}

	.right{
		margin-left: 2px;
		width: 570px;
		height: 100%;
	}
	.limit-left{
		width:345px;
		height: 345px;
	}
	.left-nav{
		display: -webkit-flex;
	    display: flex;
		border:1px solid red;
		justify-content: space-between;
	}
	.left-nav div{
		display: inline-block;
		border: 1px solid red;
		width: 55px;
		height: 55px;	
	}
	.left-nav div:nth-child(1),
	.left-nav div:nth-child(6){
		width: 30px;

	}
	.right p:nth-child(1){
		font-size: 25px;
		padding:10px 0;

	}
	.right p:nth-child(2){
		color:#999999;
		font-size: 14px;
		padding: 10px 0;
	}
	.right p:nth-child(3){
		height:80px;
		font-size: 14px;
		color:#525252;
		line-height: 80px;
		background-color:#F7F6F6;
	}
	.right p:nth-child(3) span{
		color: #FF410B;
		font-size: 23px;
	}
	.color{
		box-sizing:border-box;
		padding: 5px 0; 
		border:1px solid red;
		display: inline-block;
		height:55px;
		width: 220px;
		div{
			vertical-align: middle;
			display: inline-block;
			img{
				width:40px;
				height: 40px;
			}
		}
	}
	.number{
		width:300px;
		height: 40px;
		border:1px solid red;
		div{
			display: inline-block;
		}
	}
	.down{
		.img{
			width:960px;
			height:567px;
		}
	}
</style>