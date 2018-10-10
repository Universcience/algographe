<?php

	session_start();

	$dir_from_php = '../image';
	$dir_from_src = 'image';
	$filename = $_SESSION['current_cfdg'];

	$file = $dir_from_php.'/'.$filename.'.png';
	$src = $dir_from_src.'/'.$filename.'.png';
	
	// check si le file existe, on le supprime si oui
	if ( file_exists($file) )
		unlink($file);

	$base_dir = dirname( getcwd() );
	$input = $base_dir.'/image/'.$filename.'.cfdg';
	$output = $base_dir.'/image/'.$filename.'.png';

	if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
	{
		$cmd_check = $base_dir.'/exe/ContextFreeCLI /C '.$input.' '.$output;
		$cmd = $base_dir.'/exe/ContextFreeCLI /vDHX /s1080 /c '.$input.' '.$output;
	}
	else
	{
		$cmd_check = $base_dir.'/cfdg -C '.$input.' '.$output;
		$cmd = $base_dir.'/cfdg -v DHX -s 1080 -c '.$input.' '.$output;
	}
	
	// on kill cfdg au cas où
	if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		shell_exec('taskkill /F /IM ContextFreeCLI.exe');
	else
		shell_exec ('killall -9 cfdg');

	// on check si il y a des erreurs de syntaxe avant
	$error = strpos(shell_exec($cmd_check.' 2>&1'), 'syntax error');
	if($error > 0)
	{
		echo "<script> $('.loader').addClass('hide') </script>";
		echo "<script> $('.current .block-error-syntax').removeClass('hide') </script>";
	}
	else
	{
		// on n'attend pas la fin du processus pour executer la suite du php
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
			pclose(popen('start /B '.$cmd, 'r'));
		else
			shell_exec($cmd.' > /dev/null 2>&1 &');

		// wait for an image to be created
		$cpt = 0;
		$timer = 5;
		do {
			if ( file_exists($file) ) {
				//echo("<script>console.log('PHP: ".$filename."');</script>");
				sleep(1);// on attend que l'image soit complètement écrite par cfdg
				echo '<img src="'.$src.'?'.time().'" alt="'.$filename.'" />'; // ?time() pour forcer le rechargement de l'image
				echo "<script> $('.loader').addClass('hide') </script>";
				break;
			}
			sleep(1);
			$cpt++;
			// usleep( 1 * 1000 );
			// $cpt += 0.1;
		} while( $cpt != $timer );

		if ($cpt == $timer) {

			// on kill cfdg
			if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
				shell_exec('taskkill /F /IM ContextFreeCLI.exe');
			else
				shell_exec ('killall -9 cfdg');

			echo "<script> $('.loader').addClass('hide') </script>";
			echo "<script> $('.current .block-error-syntax').removeClass('hide') </script>";
			//echo '<br>Le fichier n\'existe toujours pas après '.$cpt.' secondes';

		}
	}

?>