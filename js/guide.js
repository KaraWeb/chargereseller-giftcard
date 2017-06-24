$(document).ready(function(){
	var Height = $(window).outerHeight();
	if ($(window).width() < 600) {
		$(".sidebar, #explanation").css("height", "auto");
	} else {
		$(".sidebar, #explanation").css("height", Height - 200 + "px");
	}
	$(window).resize(function() {
		if ($(window).width() < 600) {
			$(".sidebar, #explanation").css("height", "auto");
		} else {
			$(".sidebar, #explanation").css("height", Height - 200 + "px");
		}
	});
	$(".giftcard-types").click(function(){
		$(".giftcard-types").removeClass("active");
		$(this).addClass("active")
		var giftCard = $(this).data("giftcard-type");
		console.log(giftCard);
		$("#explanation > div").hide();
		$("#" + giftCard).show();
	});
});