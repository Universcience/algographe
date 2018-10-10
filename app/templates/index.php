<?php
	
	session_start();
	$_SESSION['current_cfdg'] = "";

?>

<!doctype html>

<html lang="fr">
<head>
	<meta charset="utf-8">

	<title>ALGOGRAPH</title>
	<meta name="description" content="generative visuals">
	<meta name="author" content="Ben & Lou">

	<link rel="stylesheet" href="css-concat/main.css">


	
</head>

<body>
	<div class="container">
		<div class="result">
			<div class="pattern"></div>
			<div id="visualizer"></div>
			<div class="video_container">
				<video id="videoId" src="./video/accroche.mp4" loop autoplay></video>
			</div>
			<div class="loader hide">
				<div class="sk-folding-cube">
				  <div class="sk-cube1 sk-cube"></div>
				  <div class="sk-cube2 sk-cube"></div>
				  <div class="sk-cube4 sk-cube"></div>
				  <div class="sk-cube3 sk-cube"></div>
				</div>
			</div>
		</div>
		<div class="interact">
			<!-- build:include ./home.html -->
			<!-- /build --> 

			<!-- build:include ./intro.html -->
			<!-- /build --> 
			<!-- build:include ./tuto-compiled.html -->
			<!-- /build --> 
			<!-- build:include ./easy-compiled.html -->
			<!-- /build --> 
			<!-- build:include ./hard-compiled.html -->
			<!-- /build --> 
			<!-- build:include ./expert-compiled.html -->
			<!-- /build --> 
			<div class="footer hide">
				<ul>
					<li class="fr" data-lang="fr">
						début
					</li>
					<li class="en" data-lang="en">
						start
					</li>
					<li class="it" data-lang="it">
						inicio
					</li>
				</ul>
				<div class="credits-btn">
					©
				</div>
			</div>
			<!-- build:include ./credits.html -->
			<!-- /build --> 
			<div class="wait">
				<img src="" alt="">
			</div>
		</div>

	</div>

	<!-- JS -->
	<script src="js-concat/main.js"></script>

</body>
</html>