<?php
$config = array(
	'title' => 'فروشگاه گیفت کارت',
	'description' => 'خرید گیفت کارت آیتونز، ایکس باکس، گوگل پلی، پلی استیشن، آمازون، میکروسافت',
	'keywords' => 'خرید گیفت کارت، خرید آنلاین، گیفت کارت، آیتونز، itunes، گوگلی پلی، googleplay، ایکس باکس، xbox، آمازون، پلی استیشن، playstation، آمریکا',
	'webserviceID' => 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
);

$slashPos = strrpos($_SERVER['SCRIPT_NAME'], '/');
$root = 'http://' . $_SERVER['SERVER_NAME'] . substr($_SERVER['SCRIPT_NAME'], 0, $slashPos);