$(document).ready(function(){
	var giftCards;
	var countBoxValue = parseInt($("#counter").val());
	var price = 0;
	$(".variable").val(price);
	$(".image-box img").click(function(){
		$(".image-box img").removeClass("image-active");
		$(".image-box img").addClass("giftcard-types")
		$(this).removeClass("giftcard-types")
		$(this).addClass("image-active");
	});
	$(".giftcard-types").click(function(){
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
		// $("#product-type").html($(".list." + giftcardType + " section div:first-child").html());
		$(".list." + giftcardType + " section:first-child").css("background-color", "#f56a49")
		var price = $(":first-child", $(".list." + giftcardType)).data('price');
		$(".variable").val(price);
		setProducts(giftcardType);
		setText();
	});
	$('#counter').keydown(function() {
	//code to not allow any changes to be made to input field
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
	$("input.save-information").is("checked") {
		if (cellphoneBox.length == 11 && preCode == 09)  {
            $("input[name='data[cellphone]']").val($(".cellphone").val());
			$.cookie('cellphone', $('.cellphone').val());
		}
		if ($.trim(sEmail).length == 0 || validateEmail(sEmail)) {
			$("input[name='data[email]']").val($(".email").val());
			$.cookie('email', $('.email').val());
        }
	}
	$(".button").click(function(){
		var mobileNumber = $(".cellphone").val()
		var preCode = mobileNumber.substring(0, 2);
		var cellphoneBox = $('.cellphone').val();
		$("input[name='data[count]']").val($("#counter").val());
		if (cellphoneBox.length == 0) {
			$(document).on("input", ".cellphone", function() {
				this.value = this.value.replace(all,'');
			});
			$(".cellphone").attr("placeholder", "شماره موبایل خود را وارد کنید");
			$(".cellphone").addClass("error");
			e.preventDefault();
        } else if (cellphoneBox.length == 11 && preCode == 09)  {
            $("input[name='data[cellphone]']").val($(".cellphone").val());
			$.cookie('cellphone', $('.cellphone').val());
        } else {
			$(".cellphone").val("");
			$(".cellphone").attr("placeholder", "شماره وارد شده معتبر نیست");
			$(".cellphone").addClass("error");
			e.preventDefault();
        }		
		var sEmail = $('.email').val();
        if ($.trim(sEmail).length == 0 || validateEmail(sEmail)) {
			$("input[name='data[email]']").val($(".email").val());
			$.cookie('email', $('.email').val());
        }
        else {
			$(".email").val("")
            $(".email").attr("placeholder", 'آدرس ایمیل صحیح نیست');
			$(".email").addClass("error");
            e.preventDefault();
        }
		$(document).on("input", ".cellphone", function() {
			this.value = this.value.replace(/[^\d\.\-]/g,'');
		});
		$.ajax({
			type: 'POST',
			url: "https://chr724.ir/services/v3/EasyCharge/BuyProduct",
			data: $('form#myForm').serialize(),
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			crossDomain: true,
			success: function(data) {
				console.log(data);
				if (data.status == "Success") {
					window.location.href = data.paymentInfo.url;
				} else {
					alert(data.errorMessage);
				}
			},
			error: function(e) {
				console.log(e);
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
			console.log(giftCards);
			// $('.connecting p').text('انتقال به بانک ...');
			$.each(data.products.giftCard, function(key, value) {
				if (value != "") {
					$(".giftcard-types[data-giftcard-type=" + key + "]").show();
				}
			});
			var giftcardType = $(".giftcard-types:visible:first").data('giftcard-type');
			var imageDirection = "img/" + giftcardType + ".png";
			$(".card-image img").attr("src", imageDirection);
			$(".giftcard-types:visible:first").addClass("active");
			console.log(giftcardType);
			setProducts(giftcardType);
		},
		error: function(e) {
			console.log(e);
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
});