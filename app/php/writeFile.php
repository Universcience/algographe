<?php

	if( !empty($_POST['data']) ) {

		$data = $_POST['data'];
		$fname = $_POST['file'].".cfdg";



		$file = fopen("../image/".$fname, 'w');
		fwrite($file, $data);
		fclose($file);

	}

?>