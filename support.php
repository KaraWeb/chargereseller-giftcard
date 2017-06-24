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
		<script src="js/script.js"></script>		
	</head>
	<body>
		<div class="header">
			<ul class="text-bar">
				<li><a href="<?php echo $root; ?>" >خانه</li>
					<li><a href="<?php echo $root . "/guide.php"; ?>" >راهنما</li>
					<li><a href="<?php echo $root . "/support.php"; ?>" >پشتیبانی</a></li>
			</ul>
			<div class="header-background"><div class="gift-shelf"></div><h1><?php echo $config['title']; ?></h1></div>
		</div>
		<div id="content">
			<div class="support">
				<img src="img/man.png">
				<p>در صورت بروز هرگونه اشکال و یا نیاز به راهنمائی می توانید با واحد پشتیبانی تماس حاصل فرمائید.</p>
				<p>تلفن پشتیبانی:<span> 88019574-021 </span></p>
				<p>پشتیبانی تلفنی شنبه تا چهارشنبه از ساعت <span> 9 </span><span>تا</span><span> 17 </span>پاسخگوی شماست.</p>
				<p>آدرس ایمیل:<span> chargereseller24@gmail.com </span></p>
			</div>
		</div>
	</body>
</html>