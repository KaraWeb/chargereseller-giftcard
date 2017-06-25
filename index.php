<?php include 'config.php'; ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $config['title']; ?></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="<?php echo $config['description']; ?>" />
		<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
		<link type="image/x-icon" rel="icon" href="css/favicon.ico"/>
		<link type="text/css" rel="stylesheet" href="css/main.css">	
		<meta name="viewport" content="width=device-width, maximum-scale=1.0">
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script src="js/script.js"></script>
	</head>
	<body>
		<div class="header">
			<ul class="text-bar">
				<li><a href="<?php echo $root; ?>">خانه</a></li>
				<li><a href="<?php echo $root . "/guide.php"; ?>">راهنما</a></li>
				<li><a href="<?php echo $root . "/support.php"; ?>" >پشتیبانی</a></li>
			</ul>
			<div class="header-background"><div class="gift-shelf"></div><h1><?php echo $config['title']; ?></h1></div>
		</div>
		<div class="load">
			<section>
				<img src="img/load.gif">
				<p>در حال بارگذاری</p>
			</section>
			<section class="hide">
				<p></p>
			</section>
		</div>
		<div id="content">
			<div class="sidebar">
				<section class="image-container">
					<img class="giftcard-types" data-giftcard-type="Amazon" src="img/Amazon.png">
					<img class="giftcard-types" data-giftcard-type="iTunes" src="img/iTunes.png">
					<img class="giftcard-types" data-giftcard-type="GooglePlay" src="img/GooglePlay.png">
					<img class="giftcard-types" data-giftcard-type="XBox" src="img/XBox.png">
					<img class="giftcard-types" data-giftcard-type="PlayStation" src="img/PlayStation.png">
					<img class="giftcard-types" data-giftcard-type="Spotify" src="img/Spotify.png">
					<img class="giftcard-types" data-giftcard-type="Steam" src="img/Steam.png">
					<img class="giftcard-types" data-giftcard-type="Skype" src="img/Skype.png">
					<img class="giftcard-types" data-giftcard-type="PlayStationPlus" src="img/PlayStationPlus.png">
					<img class="giftcard-types" data-giftcard-type="Microsoft" src="img/Microsoft.png">
					<div class="clear"></div>
				</section>	
			</div>
			<div class="bargain">
				<section class="order-side">
					<div class="order">
						<div class="giftcards">
							<section class="empty"></section>
							<div class="list"></div>
							<section class="empty"></section>
						</div>
						<div class="fields">
							<div class="count">
								<input id="counter" value="1"/>
								<button id="increase"></button>
								<button id="decrease"></button>
							</div>
							<p>تعداد</p>
							<div class="clear"></div>
						</div>
						<div class="fields">
							<div class="price"></div>
							<p>قیمت</p>
						</div>
						<div class="fields">
							<p>*شماره موبایل</p>
							<input class="cellphone" maxlength="11" />
						</div>
						<section class="hint-cell hide">
							<span></span>
						</section>
						<div class="fields">
							<p>ایمیل</p>
							<input class="email" />
						</div>
						<section class="hint-mail hide">
							<span></span>
						</section>
						<div class="fields">
							<label class="save-information">
								<input type="checkbox" name="checkbox" />
								<span>ذخیره اطلاعات</span>
							</label>
						</div>
						<div class="clear"></div>	
					</div>
				</section>
				<section class="payment">
					<div class="card-image">
						<img src="">
					</div>
					<div class="proforma">
						<h4>پیش فاکتور</h4>
						<ul>
							<li><span>پیش فاکتور</span></li>
							<li><span>نوع کارت:</span>&nbsp <p id="product-type"></p></li>
							<li><span>مبلغ کارت:</span>&nbsp <p id="product-price"></p></li>
							<li><span>تعداد:</span>&nbsp <p id="product-count">1 عدد</p></li>
							<li><span>جمع کل:</span>&nbsp <p id="final-price"></p></li>
						</ul>
						<div class="clear"></div>
					</div>
					<div class="button">
						<button id="button">پرداخت</button>
					</div>
				</section>
				<div class="clear"></div>
			</div>
		</div>
		<form id="myForm" method="post">
			<input type="text" name="data[productId]" value="">
			<input type="text" name="data[cellphone]" value="">
			<input type="text" name="data[email]" value="">
			<input type="text" name="data[count]" value="1">
			<input type="text" name="data[webserviceId]" value="<?php echo $config['webserviceID']; ?>">
			<input type="text" name="data[redirectUrl]" value="<?php echo $root . '/verify.php'; ?>">
			<input type="text" name="data[issuer]" value="">
			<input type="text" name="data[redirectToPage]" value="true">
			<input type="text" name="data[scriptVersion]" value="Script">
			<input type="text" name="data[firstOutputType]" value="json">
			<input type="text" name="data[secondOutputType]" value="get">
		</form>
		<input type="hidden" class="variable" />
	</body>
</html>