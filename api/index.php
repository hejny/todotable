<?php

header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

//sleep(1);


$method = strtoupper($_SERVER['REQUEST_METHOD']);
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput,true);


define('STORAGE_ROOT','../storage/');

function createFilePath($croppedHash,$createFolders=false){

    $folder1 = substr($croppedHash,0,2);
    $folder2 = substr($croppedHash,2,2);

    if($createFolders) {
        if (!file_exists(STORAGE_ROOT."$folder1/$folder2")){

            mkdir(STORAGE_ROOT."$folder1/$folder2", 0777,true);



        }

    }

    return STORAGE_ROOT."$folder1/$folder2/$croppedHash.json";

}




if($method=='OPTIONS'){


}else
if($method=='GET'){

    if(!isset($_GET['id'])) {

        http_response_code(400);
        echo(json_encode("Id must be set in GET params."));

    }else
    if(!ctype_alnum($_GET['id'])){

        http_response_code(400);
        echo(json_encode("Id must be alphanumeric."));

    }else
    if(strlen($_GET['id'])!==7){

            http_response_code(400);
            echo(json_encode("Id must 7 chars long."));

    }else{

        $croppedHash = $_GET['id'];
        $filepath = createFilePath($croppedHash,false);


        if(file_exists($filepath)){

            readfile($filepath);

        }else{

            http_response_code(404);
            echo(json_encode("Not found."));

        }

    }





}else
if($method=='POST'){

    $input = json_encode($input,JSON_PRETTY_PRINT);
    $croppedHash = substr(hash('sha256',$rawInput),0,7);



    $filepath = createFilePath($croppedHash,true);


    file_put_contents($filepath,$input);
    chmod($filepath,0777);

    $output = array(
      'success' => true
    );

    echo(json_encode($output,JSON_PRETTY_PRINT));

}

