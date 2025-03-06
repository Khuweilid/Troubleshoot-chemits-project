<?php
$host="localhost";
$username="root";
$password="";
$dbname="Troubleshoot_chemist";

//Create db connection_aborted
$conn=new mysqli($host, $username,$password,$dbname);
if($conn-> connect_error){
	die("connection failed ".$conn->connect_error);
}

?>