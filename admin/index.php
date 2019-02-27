<?php require_once('../admin/scripts/config.php');

if(isset($_GET['media'])){
	$type = $_GET['media']; //this will alwyas be audio, video, or tv

	if($type == "video") {
		$tbl = "tbl_movies";
	}else if($type == "audio"){
		$tbl = "tbl_audio";
	}
}

if(isset($_GET['filter'])){
	// $tbl = 'tbl_movies';
	$tbl_2 = 'tbl_genre';
	$tbl_3 = 'tbl_mov_genre';
	$col = 'movies_id';
	$col_2 = 'genre_id';
	$col_3 = 'genre_name';
	$filter = $_GET['filter'];
	$results = filterResults($tbl,$tbl_2,$tbl_3,$col,$col_2,$col_3,$filter);
	echo json_encode($results);
}else{
	$results = getAll($tbl);

	echo json_encode($results);
}
?>
