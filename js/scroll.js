function InfiniteScoll(scrollId,scrollBox,option={}){
	var obj = new Object();
	
	//设置默认配制
	obj.defaultOption = {
		speed:50,   //定时器速度
		step:2,    //每次滚动距离，尽量是10的倍数
		pos:0,     //初始位置  
	}
	
	//开始滚动
	obj.startScroll = function(){
		let me = this;
		this.interTime = setInterval(function(){
			let isRestart = Math.abs((Math.abs(obj.defaultOption.pos) - obj.scrollHeight));
			if(isRestart>=0 && isRestart < obj.defaultOption.step){
				obj.defaultOption.pos = 0;
			}else{
				obj.defaultOption.pos -= obj.defaultOption.step;
			}
			scrollId.css('top',`${obj.defaultOption.pos}px`)
		},this.defaultOption.speed)
	}
	
	//暂停滚动
	obj.stopScroll = function(){
		if(this.interTime){
			clearInterval(this.interTime);
			this.interTime = null;
		}
	}
	
	//初始化
	obj.init = function(){
		//滚动页面高度
		var scrollHeight = window.getComputedStyle(scrollId[0]).height;
		this.scrollHeight = Number(scrollHeight.substring(0,scrollHeight.length-2));
		//容器高度
		if(scrollBox){
			var scrollBoxHeight = window.getComputedStyle(scrollBox).height;
		    this.scrollBoxHeight = Number(scrollBoxHeight.substring(0,scrollBoxHeight.length-2));
		}
		
		
		//自我配制与默认配制的合并
		obj.option = Object.assign({},obj.defaultOption,option);
		
		//1、当没有传入滚动可视区域dom时，则开启滚动
		//2、当有传入滚动可视区域dom，且滚动内容高度 > 可视区域高度，则开启滚动
		if(!this.scrollBoxHeight || (this.scrollBoxHeight && this.scrollHeight>this.scrollBoxHeight)){  
			$(scrollId).children().clone().appendTo(scrollId);   // 复制一整个新的子节点
			this.startScroll();
		}
	}
	
	obj.init()
	
	return obj;
	
}