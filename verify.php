<?php include('config.php'); ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $config['title']; ?></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="<?php echo $config['description']; ?>" />
		<meta name="keywords" content="<?php echo $config['keywords']; ?>" />
		<link type="image/x-icon" rel="icon" href="css/favicon.ico"/>
		<link type="text/css" rel="stylesheet" href="css/verify.css">
		<meta name="viewport" content="width=device-width, maximum-scale=1.0">
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/script.js"></script>
	</head>
	<body>
		<div class="header">
			<ul class="text-bar">
				<li><a href="<?php echo $root; ?>" >خانه</a></li>
				<li><a href="<?php echo $root . "/guide.php"; ?>" >راهنما</a></li>
				<li><a href="<?php echo $root . "/support.php"; ?>" >پشتیبانی</a></li>
			</ul>
			<div class="header-background"><div class="gift-shelf"></div><h1><?php echo $config['title']; ?></h1></div>
		</div>
		<div id="payment-content">
		<?php
			$result = base64_decode(urldecode(htmlspecialchars($_GET['data'])));
			$result = json_decode($result, true);
			
			if ($result['status'] == 'Success') {
		?>
			<div class="success">
				<img class="success-img" src="img/success.png">
				<section class="success-message">
					<h1>تراکنش موفق</h1>
					<ul>
						<li><span>تاریخ:</span><?php echo $result['date']; ?></p></li>
						<li><span>نوع کارت:</span>&nbsp <p id="product-type"><?php echo $result['products']['name']; ?></p></li>
						<li><span>تعداد:</span>&nbsp <p id="product-count">1 عدد</p></li>
						<li><span>مبلغ کل:</span>&nbsp <p id="final-price"><?php echo $result['products']['price'] . ' تومان'; ?></p></li>
						<li><span>کد پیگیری:</span>&nbsp <p><?php echo $result['refId']; ?></p</li>
					</ul>
					<p id="hint">* پین های خریداری شده به صورت پیامک ارسال می گردد.</p>	
					<div class="clear"></div>
				</section>
				<div class="clear"></div>
			</div>
		<?php
			} else {
		?>
			<div class="failed">
				<img class="failed-img" src="img/failed.png">
				<section class="failed-message">
					<h1>تراکنش ناموفق</h1>
					<h2><?php echo $result['errorMessage']; ?></h2>
					<p>چنانچه وجه از حساب شما کسر شده است، طی 72 ساعت کاری آینده از طرف بانک وجه به حساب شما باز می گردد.</p>
				</section>
				<div class="clear"></div>
			</div>

		<?php
			}
		?>
		</div>
	</body>
</html>