<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

	<META NAME="ROBOTS" CONTENT="NOINDEX">

<title>CS</title>

<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/yui/2.7.0/build/reset/reset-min.css"> 
<link rel="stylesheet" type="text/css" href="css/styles.css" />

</head>

<body>

	<div id="header">
		<a id="logo" href="/"><img src="img/logo.png" alt="Skillicorn Logo" title="Skillicorn" /></a>

		<ul id="menu">
			<li><a href="index.php" <?=(isset($cur) && $cur == 'index')?'class="current"':''?>>Home</a></li>
			<li><a href="showcase.php" <?=(isset($cur) && $cur == 'showcase')?'class="current"':''?>>Portfolio</a></li>
			<li><a href="about.php" <?=(isset($cur) && $cur == 'about')?'class="current"':''?>>About</a></li>
		</ul>		
	
	</div>