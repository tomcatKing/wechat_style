$(function(){
	$(".select").click(function(){
		var type=$(this).attr('data-type');
		if($(this).hasClass('isTrue')){
			return;
		}else{
			$(".select").removeClass("isTrue");
			$(this).addClass("isTrue");

			if(type==="order-context"){
				$.util.get_order({
					pageNum:1,
					pageSize:10
				});
			}else{
				$.util.get_food({
					pageNum:1,
					pageSize:10
				});
			}
			$(".order-context").hide();
			$(".food-context").hide();
			$("."+type).show();
		}
	});

	//点击上一页触发事件
	$(".prev_order").click(function(){
		$.util.prev_page_order();
	});

	//点击下一页触发事件
	$(".next_order").click(function(){
		$.util.next_page_order();
	});

	//显示订单详情
	$(".order-context").on('click',".show-order",function(){
		$(".body").hide();
		$(".order-detail").show();
		$(".order-context").hide();

		var order_no=$(this).attr('data-id');
		$.util.show_order_detail(parseInt(order_no));
	});



	//返回到订单列表页面
	$(".order-detail").on('click',".order-detail-after-btn",function(){
		$.util.hide_order_detail();
	});

	//模糊搜索订单
	$(".order-sh-btn").click(function(){
		var search_title=$(this).prev().val();
		if(search_title==="" && search_title.trim() ===""){
			return;
		}else{
			$.network.search_order_url({
				keyword:search_title,
				pageNum:1,
				pageSize:10
			});
		}
	});
});