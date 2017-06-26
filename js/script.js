$(document).ready(function(){
	var height = $(window).outerHeight();
	var headerHeight = $(".header-background").outerHeight();
	var giftCards;
	var countBoxValue = parseInt($("#counter").val());
	var price = 0;
	if ($(window).outerWidth() < 641) {
		$(".sidebar").css("height", "auto");
	} else {
		$(".sidebar, .load").css("height", height - headerHeight + "px");
	}
	$(window).resize(function() {
		if ($(window).outerWidth() < 641) {
			$(".sidebar").css("height", "auto");
		} else {
			$(".sidebar, .load").css("height", height - headerHeight + "px");
		}
	});
	$(".variable").val(price);
	$(".cellphone").val($.cookie("cellphone"));
	$(".email").val($.cookie("email"));
	$(".giftcard-types").click(function(){
		$(".giftcards").scrollTop(0);
		var giftcardType = $(this).data('giftcard-type');
		var imageDirection = "img/" + giftcardType + ".png";
		$("input[name='data[productId]']").val($(".list." + giftcardType + " section:first-child").data("package-id"));
		$(".card-image img").attr("src", imageDirection);
		$("#counter").val(1);
		$(".list").hide();
		$(".list." + giftcardType + " section").css("background-color", "transparent")
		$(".giftcard-types").removeClass("active");
		$(this).addClass("active")
		$("#product-type").html($(":first-child", $(".list." + giftcardType + " section")).html());
		$(".list." + giftcardType + " section:first-child").css("background-color", "#f56a49")
		var price = $(":first-child", $(".list." + giftcardType)).data('price');
		$(".variable").val(price);
		setProducts(giftcardType);
		setText();
	});
	$('#counter').keydown(function() {
		return false;
	});
	$(document).on('click', '.list section', function(){ 
		$(".list section").css("background-color", "transparent");
		$(this).css("background-color", "#f56a49");
		$("#counter").val(1);
		$("#product-type").html($(":first-child", this).html());
		var price = $(this).data('price');
		$(".variable").val(price);
		$("input[name='data[productId]']").val($(this).data("package-id"));
		setAmounts();
	});
	$("#counter").change(function(){
		countBoxValue = parseInt($("#counter").val());
		setAmounts();
	});
	$("#increase").click(function(){
		countBoxValue = parseInt($("#counter").val());
		if (countBoxValue >= 1 && countBoxValue < 5) {
			$("#counter").val(countBoxValue + 1);
			setAmounts();
		}
	});
	$("#decrease").click(function(){
		countBoxValue = parseInt($("#counter").val());
		if (countBoxValue > 1) {
			$("#counter").val(countBoxValue - 1);
			setAmounts();
		}
	});
	function setAmounts() {
		var count = $("#counter").val();
		var price = $(".variable").val();
		$("input[name='data[count]']").val(count);
		$("#product-price").html(price + "&nbsp" + "تومان");
		$("#product-count").html(count + "&nbsp" + "عدد");
		$("#final-price , .price").html((price * count) + "&nbsp" + "تومان");
		$("get-final-price").val(price)
	}
	$(document).on("input", ".cellphone", function() {
		this.value = this.value.replace(/[^\d\.\-]/g,'');
	});
	function validateEmail(sEmail) {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (filter.test(sEmail)) {
			return true;
		} else {
			return false;
		}
	}
	$(".button").click(function() {
		var checkCellphone = true;
		var checkEmail = true;
		$(".hint-mail, .hint-cell").addClass("hide");
		$(".email, .cellphone").removeClass("error");
		var mobileNumber = $(".cellphone").val()
		var preCode = mobileNumber.substring(0, 3);
		var cellphoneBox = $('.cellphone').val();
		$("input[name='data[count]']").val($("#counter").val());
		if (cellphoneBox.length == 0) {
			$(".hint-cell span").html(".شماره موبایل خود را وارد کنید")
			$(".cellphone").addClass("error");
			$(".hint-cell").removeClass("hide");
			checkCellphone = false;
        } else if (cellphoneBox.length != 11 || (jQuery.inArray(preCode, ['090', '091', '092', '093', '099']) == -1))   {
			$(".hint-cell span").html(".شماره وارد شده معتبر نیست");
			$(".cellphone").addClass("error");
			$(".hint-cell").removeClass("hide");
			checkCellphone = false;
        }
		var sEmail = $('.email').val();
		if ($.trim(sEmail).length != 0 && !validateEmail(sEmail)) {
            $(".hint-mail span").html('.آدرس ایمیل صحیح نیست');
			$(".email").addClass("error");
			$(".hint-mail").removeClass("hide")
            checkEmail = false;
        }
		if (checkCellphone == false || checkEmail == false) {
			return;
		}
		$("input[name='data[cellphone]']").val($(".cellphone").val());
		$("input[name='data[email]']").val($(".email").val());
		
		
		if ($(".save-information input").prop('checked')) {
			$.cookie('cellphone', $(".cellphone").val());
			$.cookie('email', $(".email").val());
		}
		
		$(".load section:last-child").hide();
		$(".load > section:first-child p").text("انتقال به بانک")
		$(".load > section:first-child").show();
		$(".load").fadeIn();
		
		$.ajax({
			type: 'POST',
			url: "https://chr724.ir/services/v3/EasyCharge/BuyProduct",
			data: $('form#myForm').serialize(),
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				if (data.status == "Success") {
					window.location.href = data.paymentInfo.url;
				} else {
					$(".load section:first-child").hide();
					$(".load section:last-child").show();
					$(".load section:last-child p").html("خطا: " + data.errorMessage);
					$(".load").one("click", function() {
						$(this).fadeOut();
					});
				}
			},
			error: function(e) {
				$(".load section:first-child").hide();
				$(".load section:last-child").show();
				$(".load section:last-child p").html("خطا: " + "در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.");
				$(".load").one("click", function() {
					$(this).fadeOut();
				});
			}
		});
	});
	$(".cellphone, .email").click(function(){
		$(this).attr("placeholder", '');
		$(this).removeClass("error");
	});
	$.ajax({
		type: 'POST',
		url: "https://chr724.ir/services/v3/EasyCharge/initializeData",
		data: $('form#myForm').serialize(),
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		crossDomain: true,
		success: function(data) {
			giftCards = data.products.giftCard;
			$.each(data.products.giftCard, function(key, value) {
				if (value != "") {
					$(".giftcard-types[data-giftcard-type=" + key + "]").show();
				}
			});
			var giftcardType = $(".giftcard-types:visible:first").data('giftcard-type');
			var imageDirection = "img/" + giftcardType + ".png";
			$(".card-image img").attr("src", imageDirection);
			$(".giftcard-types:visible:first").addClass("active");
			setProducts(giftcardType);
			$(".load").fadeOut()
		},
		error: function(e) {
			$(".load section:first-child").hide();
			$(".load section:last-child").show();
			$(".load section:last-child p").html("در حال حاضر امکان برقراری ارتباط با سرور وجود ندارد. (خطا: " + e.status + ")<br>لطفاً بعداً مراجعه نمایید.", "خطا");
			$(".load").one("click", function() {
				$(this).fadeOut();
			});
		}
	});
	function setProducts(giftcardType) {
		var options = "";
		$.each(giftCards[giftcardType], function(key, value) {
			options += "<section data-package-id=\"" + value.id + "\" data-price=\"" + value.price + "\"><div  class=\"credit-info\">" + value.name + "</div><div class=\"price-info\">" + value.price + " تومان</div></section>";
		});
		$(".list").html(options).show();
		setText();
		$(".list > section:first-child").css("background-color", "#f56a49");
		$(".variable").val($(".list > section:first-child").data("price"));
		$("#product-type").html($(".list > section div:first-child").html());
		$("input[name='data[productId]']").val($(".list > section:first-child").data("package-id"));
		setAmounts();
	}
	function setText() {
		$('.list section div:first-child').css("direction", "rtl");
		$('.list section div:first-child:contains("گیفت کارت")').each(function(){
			$(this).html($(this).html().split("گیفت کارت").join(""));
		});
		$('.list section div:first-child:contains("XBox")').each(function(){
			$(this).html($(this).html().split("XBox").join("ایکس باکس "));
		});
		$('.list section div:first-child:contains("PlayStationNetwork")').each(function(){
			$(this).html($(this).html().split("PlayStationNetwork").join(""));
			$(this).prepend("پلی استیشن ");
			
		});
	}
	function dialogue(content, title) {
		$('<div />').qtip({
		  content: {
			text: content,
			title: {
			  text: title,
			  button: true
			}
		  },
		  position: {
			my: 'center', at: 'center',
			target: $(window)
		  },
		  show: {
			ready: true,
			modal: {
			  on: true,
			  blur: true
			}
		  },
		  hide: true,
		  style: 'qtip-bootstrap qtip-shadow ui-tooltip-rounded helpModalClass',
		  events: {
			render: function(event, api) {
			  $('button', api.elements.content).click(function(e) {
				api.hide(e);
			  });
			},
			hide: function(event, api) { api.destroy(); }
		  }
		});
	}
	
});