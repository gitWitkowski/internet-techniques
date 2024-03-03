<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php' ;
include 'rest/mongo.php';

class Register_new extends Register {
  
   private $db;
     
   function __construct () {
      parent::__construct() ;  
      session_set_cookie_params([
            'lifetime' => 1440 ,
            'path' => '/~1witkowski/',                 // konto na ktorym dziala serwis 
            'domain' => $_SERVER['HTTP_HOST'],
            'secure' => false,                   // serwer Pascal - tylko http
            'httponly' => false,
            'samesite' => 'LAX'
        ]);       
      session_start() ;
      $this->db = new db();
   }
  
   function _save () {
    $text = "";
    $added = false;
    if(empty($this->data['fname']) || empty($this->data['lname']) || empty($this->data['email']) || empty($this->data['pass'])){
        $text = "Uzupełnij wszystkie pola formularza!";
    }else if(!$this->db->user_exists($this->data['email'])){
        $password = $this->data['pass'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $arr = array(
            "email" => $this->data['email'],
            "pass" => $hashed_password,
            "fname" =>$this->data['fname'],
            "lname" => $this->data['lname']
        );
        $flag = $this->db->insert($arr);
        if ($flag) $added = true;
        $text =  $flag?"Użytkownik został dodany pomyślnie! Zaloguj się, aby skorzystać z serwisu.":"Nie dodano użytkownika - błąd!";
    }else{
        $text = 'W bazie danych istnieje już konto powiązane z podanym loginem!' ;
    }
    
    $array = array(
        "registerSuccessful" => $added,
        "info" => $text,
    );
      return json_encode($array);
   }

   function _save_rec () {
          $data = $_POST['data'] ;
       $obj  = json_decode($data) ;
       print_r($obj);
       echo 'uzytkownik '.$_SESSION['user']."<br>";
       $obj->user = $_SESSION['user'];
          $response = $this->db->insert($obj) ;
       return ( $response ? "Dodano rekord" : "Blad " ) ;
   }

function _login() {
    $email = $_POST['email'] ;
    $pass = $_POST['pass'] ;
    $access = false ;

    if ($this->db->user_exists($email)) {
        if($this->db->auth_pass($email, $pass)){
            $_SESSION['auth'] = 'OK' ;
            $_SESSION['user'] = $email ;
            $access = true ;

        }
    }
    $text = ( $access ? true : false ) ;
    return json_encode($text);
}
function _is_logged() {
    if ( isset ( $_SESSION['auth'] ) ) {
    $ret = $_SESSION['auth'] == 'OK' ? true : false ;
    } else { $ret = false ; }
    return $ret ;
    }

function _logout() {
    unset($_SESSION);
    session_destroy();
    $text = 'Uzytkownik wylogowany ' ;
    return $text ;
    }


function _get_settings(){
    $email = $_SESSION['user'] ;
    
    $table = $this->db->select_user_settings($email);
    return json_encode($table);
}

}
?>