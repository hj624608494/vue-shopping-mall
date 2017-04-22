<template>
	<div >
		<div ref="qart" class="bob"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:["config"],
		name:'ErQart',
		data(){
			return {
				msg:'',
				qart:{}
			}
		},
		mounted(){
		 	
    this.qart= new QArt({
        value: this.config.value,
        imagePath: this.config.imagePath,
        filter: this.config.filter
      }).make(this.$refs.qart);
    }
	}
</script>
<style type="text/css">
	.bob{
		width:200px;
		height:200px;
	}
</style>