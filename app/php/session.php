<?php

	session_start();

	if ( isset($_POST['current_cfdg']) ) {
		$_SESSION['current_cfdg'] = $_POST['current_cfdg'];
	}

?>